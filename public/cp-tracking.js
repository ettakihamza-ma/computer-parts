/* Anonymous, document-scoped visits. No cookie, name, IP or persistent visitor ID. */
(() => {
  'use strict';
  const activity = document.currentScript?.dataset.activity;
  if (!['glisser-deposer', 'computer-parts'].includes(activity) || new URLSearchParams(location.search).get('suivi') === 'non') return;
  const endpoint = 'https://glisser-deposer.vercel.app/api/collect';
  const idleAfter = 60000;
  let token, starting = false, seq = 0, activeMs = 0, lastSent = -1;
  let began = performance.now(), previous = began, lastInput = began;
  let foreground = document.visibilityState === 'visible' && document.hasFocus();
  let pendingKind = 'heartbeat';
  function tick() {
    const now = performance.now();
    if (foreground) activeMs += Math.max(0, Math.min(now, lastInput + idleAfter) - previous);
    previous = now;
  }
  function send(kind, closing = false) {
    tick();
    pendingKind = kind;
    if (!token || (kind === 'heartbeat' && Math.round(activeMs) === lastSent)) return;
    lastSent = Math.round(activeMs);
    const body = JSON.stringify({ token, seq: ++seq, activeMs: lastSent, elapsedMs: Math.round(performance.now() - began), kind });
    if (closing && navigator.sendBeacon?.(endpoint, new Blob([body], { type: 'text/plain' }))) return;
    // A network failure must never interrupt the child's game.
    fetch(endpoint, { method: 'POST', body, headers: { 'Content-Type': 'text/plain' }, keepalive: true, credentials: 'omit' })
      .then(response => { if (!response.ok) lastSent = -1; }).catch(() => { lastSent = -1; });
  }
  async function start() {
    if (token || starting || document.visibilityState !== 'visible') return;
    starting = true;
    // Durations start with the server's session creation, excluding initial network latency.
    began = previous = lastInput = performance.now();
    activeMs = 0;
    try {
      const response = await fetch(endpoint, { method: 'POST', body: JSON.stringify({ action: 'start', activity, test: new URLSearchParams(location.search).get('suivi') === 'test' }), headers: { 'Content-Type': 'text/plain' }, credentials: 'omit' });
      if (response.ok) {
        token = (await response.json()).token;
        send(pendingKind);
      }
    } catch { /* Retry on the next heartbeat while the game remains usable. */ }
    finally { starting = false; }
  }
  function interact() { tick(); lastInput = performance.now(); }
  for (const event of ['pointerdown', 'pointermove', 'keydown', 'touchstart', 'wheel']) addEventListener(event, interact, { passive: true });
  function visibility() {
    tick();
    foreground = document.visibilityState === 'visible' && document.hasFocus();
    if (foreground) { lastInput = performance.now(); start(); }
    send(foreground ? 'active' : 'pause', !foreground);
  }
  document.addEventListener('visibilitychange', visibility);
  addEventListener('focus', visibility);
  addEventListener('blur', visibility);
  addEventListener('pagehide', () => { send('end', true); foreground = false; });
  addEventListener('pageshow', visibility);
  setInterval(tick, 1000);
  setInterval(() => { if (token) send('heartbeat'); else start(); }, 30000);
  start();
})();
