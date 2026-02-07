import { Language } from '../types';
import { AUDIO_MAP } from '../audioMapping';

export const playLocalAudio = async (partId: string, language: Language, type: 'name' | 'description' = 'name'): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const partAudio = AUDIO_MAP[partId.toLowerCase()];
      if (!partAudio) {
        console.warn(`No audio map found for part: ${partId}`);
        resolve(); // Resolve anyway to avoid blocking UI
        return;
      }

      const languageAudio = partAudio[language];
      if (!languageAudio) {
        console.warn(`No audio found for part: ${partId} in language: ${language}`);
        resolve();
        return;
      }

      const audioSrc = type === 'name' ? languageAudio.name : languageAudio.description;
      const audio = new Audio(audioSrc);

      audio.onended = () => {
        resolve();
      };

      audio.onerror = (e) => {
        console.error("Audio playback error:", e);
        resolve(); // Resolve to avoid hanging
      };

      audio.play().catch(e => {
        console.error("Play interruped or failed:", e);
        resolve();
      });

    } catch (error) {
      console.error('Error playing local audio:', error);
      resolve();
    }
  });
};