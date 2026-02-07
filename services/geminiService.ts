import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getFunFact = async (partName: string, language: string = 'fr'): Promise<string> => {
  if (!ai) {
    if (language === 'en') return "Ask an adult to add the magic API Key for explanations!";
    if (language === 'ar') return "اطلب من أحد الكبار إضافة مفتاح API للحصول على الشرح!";
    return "Demande à un adulte d'ajouter la clé magique (API Key) pour avoir des explications !";
  }

  let systemInstruction = "";
  let prompt = "";

  switch (language) {
    case 'en':
      systemInstruction = "You are a kind teacher in a primary school. Explain simply to a 6 year old child.";
      prompt = `Explain what this computer part is for: "${partName}".
      Rules:
      1. Keep it very simple and educational.
      2. One short sentence (max 15 words).
      3. Use an encouraging tone.
      4. No sensitive topics.`;
      break;
    case 'ar':
      systemInstruction = "أنت معلم لطيف في مدرسة ابتدائية. اشرح ببساطة لطفل عمره 6 سنوات.";
      prompt = `اشرح فائدة جزء الحاسوب هذا: "${partName}".
      القواعد:
      1. ابق بسيطاً جداً وتعليمياً.
      2. جملة واحدة قصيرة (حد أقصى 15 كلمة).
      3. استخدم نبرة تشجيعية.
      4. لا مواضيع حساسة.`;
      break;
    default: // fr
      systemInstruction = "Tu es un enseignant bienveillant dans une école primaire au Maroc.";
      prompt = `Explique simplement à un enfant de 6 ans (CP) à quoi sert ce composant d'ordinateur : "${partName}".
      Règles :
      1. Reste très simple et pédagogique.
      2. Une seule phrase courte (maximum 15 mots).
      3. Utilise un ton encourageant.
      4. Pas de blagues, donne la vraie utilité.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });
    return response.text || (language === 'ar' ? "أبحث عن المعلومة..." : (language === 'en' ? "Looking for info..." : "Je cherche l'information..."));
  } catch (error) {
    console.error("Error fetching educational fact:", error);
    return (language === 'ar' ? "أنا متعب قليلاً، حاول مرة أخرى!" : (language === 'en' ? "I'm a bit tired, try again later!" : "Je suis un peu fatigué, réessaie plus tard !"));
  }
};