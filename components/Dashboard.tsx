
import React from 'react';
import { SmartDevice, DeviceType } from '../types';
import LightControl from './LightControl';
import ThermostatControl from './ThermostatControl';
import SecurityCameraFeed from './SecurityCameraFeed';

interface DashboardProps {
  devices: SmartDevice[];
  onUpdateDevice: (deviceId: string, updates: Partial<SmartDevice>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ devices, onUpdateDevice }) => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {devices.map(device => {
          switch (device.type) {
            case DeviceType.Light:
              return (
                <LightControl
                  key={device.id}
                  light={device}
                  onToggle={isOn => onUpdateDevice(device.id, { isOn })}
                />
              );
            case DeviceType.Thermostat:
              return (
                <ThermostatControl
                  key={device.id}
                  thermostat={device}
                  onSetTemperature={temperature => onUpdateDevice(device.id, { temperature })}
                  onSetMode={mode => onUpdateDevice(device.id, { mode })}
                />
              );
            case DeviceType.Camera:
              return <SecurityCameraFeed key={device.id} camera={device} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default Dashboard;
