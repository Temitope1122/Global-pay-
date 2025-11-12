
import React, { useState, useCallback } from 'react';
import { DeviceType, Light, SmartDevice, Thermostat, SecurityCamera } from './types';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Assistant from './components/Assistant';
import { updateDeviceStateInGemini } from './services/geminiService';

const INITIAL_DEVICES: SmartDevice[] = [
  { id: 'light-1', name: 'Overhead Light', room: 'Living Room', type: DeviceType.Light, isOn: false },
  { id: 'thermostat-1', name: 'Main Thermostat', room: 'Living Room', type: DeviceType.Thermostat, temperature: 68, mode: 'cool' },
  { id: 'light-2', name: 'Bedside Lamp', room: 'Bedroom', type: DeviceType.Light, isOn: true },
  { id: 'camera-1', name: 'Front Door Cam', room: 'Security', type: DeviceType.Camera, isOnline: true },
];


const App: React.FC = () => {
  const [devices, setDevices] = useState<SmartDevice[]>(INITIAL_DEVICES);

  const handleUpdateDevice = useCallback((deviceId: string, updates: Partial<SmartDevice>) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === deviceId ? { ...device, ...updates } : device
      )
    );
  }, []);

  const processAssistantCommand = async (prompt: string): Promise<string> => {
    const action = await updateDeviceStateInGemini(prompt, devices);
    
    if (action.functionCall && action.functionCall.name === 'updateDeviceState') {
      const { deviceId, ...updates } = action.functionCall.args;
      
      const deviceToUpdate = devices.find(d => d.id === deviceId);
      if (!deviceToUpdate) {
        return `I couldn't find a device with the ID "${deviceId}".`;
      }

      handleUpdateDevice(deviceId, updates);

      let confirmation = `Okay, I've updated the ${deviceToUpdate.name}.`;
      if (updates.isOn !== undefined) {
          confirmation = `Okay, I've turned the ${deviceToUpdate.name} ${updates.isOn ? 'on' : 'off'}.`;
      } else if (updates.temperature !== undefined) {
          confirmation = `Okay, I've set the ${deviceToUpdate.name} temperature to ${updates.temperature}°F.`;
      } else if (updates.mode !== undefined) {
          confirmation = `Okay, I've set the ${deviceToUpdate.name} to ${updates.mode} mode.`;
      }
      
      return confirmation;
    }

    return action.text || "I'm not sure how to help with that. Please try again.";
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow p-4 md:p-8">
        <Dashboard devices={devices} onUpdateDevice={handleUpdateDevice} />
      </main>
      <Assistant onSendCommand={processAssistantCommand} />
    </div>
  );
};

export default App;
