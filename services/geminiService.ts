import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStudyPlan = async (goal: string, level: string, weaknesses: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Crie um plano de estudo curto e motivador para um estudante pré-universitário.
      Objetivo: ${goal}
      Nível Atual: ${level}
      Dificuldades: ${weaknesses}
      
      Retorne uma lista de 3 focos principais em texto simples.`,
    });
    return response.text || "Foque em Matemática Básica, Interpretação de Texto e Lógica.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Não foi possível gerar o plano personalizado no momento.";
  }
};

export const explainConcept = async (concept: string, context: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Explique o conceito de "${concept}" no contexto de ${context} para um estudante pré-universitário. 
      Seja conciso, use uma analogia se possível. Máximo de 100 palavras.`,
    });
    return response.text || "Conceito indisponível no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao carregar explicação inteligente.";
  }
};

export const generateQuizQuestion = async (topic: string): Promise<string> => {
  try {
     // In a real app, we would request JSON schema. For simplicity here, requesting structured text.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Gere uma questão de múltipla escolha difícil sobre ${topic}.
      Formato de saída:
      Pergunta: [Texto]
      A) [Opção]
      B) [Opção]
      C) [Opção]
      D) [Opção]
      Resposta: [Letra]`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "";
  }
}
