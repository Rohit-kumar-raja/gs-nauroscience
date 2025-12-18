
import { GoogleGenAI, Type } from "@google/genai";
import { Department } from "../types";

// Always initialize with named parameter and use process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getHealthTip = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      // Use gemini-3-flash-preview for basic text tasks.
      model: 'gemini-3-flash-preview',
      contents: "Give me a single, short, actionable, and interesting health tip for the day. Max 20 words.",
    });
    // Use .text property directly (not a method).
    return response.text || "Drink more water today!";
  } catch (error) {
    console.error("Failed to fetch health tip", error);
    return "Stay active and eat your vegetables!";
  }
};

export const analyzeSymptoms = async (symptoms: string): Promise<{ department: Department; reasoning: string }> => {
  try {
    const response = await ai.models.generateContent({
      // Use gemini-3-flash-preview for reasoning tasks.
      model: 'gemini-3-flash-preview',
      contents: `The user has the following symptoms: "${symptoms}". 
      Based on this, which medical department should they visit?
      Choose strictly from this list: ${Object.values(Department).join(', ')}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                department: { 
                  type: Type.STRING,
                  description: "The department name from the provided list."
                },
                reasoning: { 
                  type: Type.STRING,
                  description: "Concise reasoning for choosing this department."
                }
            },
            required: ["department", "reasoning"]
        }
      }
    });

    // Use .text property directly.
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
            // Use gemini-3-flash-preview for general assistant tasks.
            model: 'gemini-3-flash-preview',
            history: history,
            config: {
                systemInstruction: "You are a helpful, empathetic, and professional medical receptionist assistant for 'G.S Neuroscience' hospital. Your goal is to help users navigate the hospital app, suggest departments based on symptoms, or explain hospital facilities. Keep answers concise (under 50 words). Do not give medical advice or diagnosis. Always recommend seeing a doctor."
            }
        });

        const result = await chat.sendMessage({ message });
        // Use .text property directly.
        return result.text || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
        console.error("Chat error", error);
        return "I'm having trouble connecting to the network right now. Please try again later.";
    }
}
