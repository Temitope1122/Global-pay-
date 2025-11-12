
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { SmartDevice } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const updateDeviceStateFunctionDeclaration: FunctionDeclaration = {
  name: 'updateDeviceState',
  description: 'Updates the state of a smart home device, such as turning a light on/off or setting the thermostat temperature or mode.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      deviceId: {
        type: Type.STRING,
        description: "The unique ID of the device to control. e.g., 'light-1', 'thermostat-1'."
      },
      isOn: {
        type: Type.BOOLEAN,
        description: "For lights, set to true for on, false for off. Do not use for other device types."
      },
      temperature: {
        type: Type.NUMBER,
        description: "For thermostats, the target temperature in Fahrenheit. Do not use for other device types."
      },
      mode: {
        type: Type.STRING,
        description: "For thermostats, can be 'cool', 'heat', or 'off'. Do not use for other device types."
      },
    },
    required: ['deviceId'],
  },
};

const createSystemInstruction = (devices: SmartDevice[]): string => {
  const deviceList = devices.map(d => `- ${d.room} ${d.name} (id: ${d.id}, type: ${d.type})`).join('\n');
  return `You are a helpful smart home assistant. Your goal is to control smart home devices based on user requests by calling the available tools.

Here is a list of the available devices:
${deviceList}

Analyze the user's request and call the 'updateDeviceState' function with the correct 'deviceId' and the appropriate state properties to change. Only use the properties relevant to the device type. For example, use 'isOn' for lights and 'temperature' or 'mode' for thermostats. Do not guess device IDs. If the user's request is ambiguous or doesn't match a device, ask for clarification. If the request is not about controlling a device, have a friendly conversation.`;
};

export async function updateDeviceStateInGemini(prompt: string, devices: SmartDevice[]) {
  try {
    const systemInstruction = createSystemInstruction(devices);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        tools: [{ functionDeclarations: [updateDeviceStateFunctionDeclaration] }],
      },
    });

    const functionCalls = response.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
      return { functionCall: functionCalls[0], text: null };
    } else {
      return { functionCall: null, text: response.text };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { functionCall: null, text: "Sorry, I'm having trouble connecting to my brain right now." };
  }
}
