import { GoogleGenAI, Type } from "@google/genai";
import { Department } from "../types";

// Initialize Gemini Client
// We assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getHealthTip = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Give me a single, short, actionable, and interesting health tip for the day. Max 20 words.",
    });
    return response.text || "Drink more water today!";
  } catch (error) {
    console.error("Failed to fetch health tip", error);
    return "Stay active and eat your vegetables!";
  }
};

export const analyzeSymptoms = async (symptoms: string): Promise<{ department: Department; reasoning: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `The user has the following symptoms: "${symptoms}". 
      Based on this, which medical department should they visit?
      Choose strictly from this list: ${Object.values(Department).join(', ')}.
      
      Return a JSON object with "department" and "reasoning".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                department: { type: Type.STRING },
                reasoning: { type: Type.STRING }
            }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Analysis failed", error);
    return {
      department: Department.GENERAL_MEDICINE,
      reasoning: "We couldn't determine the exact specialist, so General Medicine is the safest starting point."
    };
  }
};

export const chatWithAssistant = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history,
            config: {
                systemInstruction: "You are a helpful, empathetic, and professional medical receptionist assistant for 'G.S Neuroscience' hospital. Your goal is to help users navigate the hospital app, suggest departments based on symptoms, or explain hospital facilities. Keep answers concise (under 50 words). Do not give medical advice or diagnosis. Always recommend seeing a doctor."
            }
        });

        const result = await chat.sendMessage({ message });
        return result.text;
    } catch (error) {
        console.error("Chat error", error);
        return "I'm having trouble connecting to the network right now. Please try again later.";
    }
}