
export enum DeviceType {
  Light = 'LIGHT',
  Thermostat = 'THERMOSTAT',
  Camera = 'CAMERA'
}

export interface Device {
  id: string;
  name: string;
  room: string;
  type: DeviceType;
}

export interface Light extends Device {
  type: DeviceType.Light;
  isOn: boolean;
}

export interface Thermostat extends Device {
  type: DeviceType.Thermostat;
  temperature: number;
  mode: 'cool' | 'heat' | 'off';
}

export interface SecurityCamera extends Device {
  type: DeviceType.Camera;
  isOnline: boolean;
}

export type SmartDevice = Light | Thermostat | SecurityCamera;

export interface AssistantMessage {
    id: string;
    role: 'user' | 'assistant';
    text: string;
}
