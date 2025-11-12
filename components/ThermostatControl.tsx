
import React from 'react';
import { Thermostat } from '../types';
import DeviceCard from './DeviceCard';
import { ThermometerIcon, MinusIcon, PlusIcon } from './icons';

interface ThermostatControlProps {
  thermostat: Thermostat;
  onSetTemperature: (temperature: number) => void;
  onSetMode: (mode: 'cool' | 'heat' | 'off') => void;
}

const ThermostatControl: React.FC<ThermostatControlProps> = ({ thermostat, onSetTemperature, onSetMode }) => {
  const { name, room, temperature, mode } = thermostat;

  const modeColors = {
    cool: 'bg-blue-500/20 text-blue-300 border-blue-400',
    heat: 'bg-orange-500/20 text-orange-300 border-orange-400',
    off: 'bg-gray-500/20 text-gray-300 border-gray-400',
  };
  
  const tempTextColor = mode === 'cool' ? 'text-blue-400' : mode === 'heat' ? 'text-orange-400' : 'text-gray-400';

  return (
    <DeviceCard
      title={name}
      subtitle={room}
      icon={<ThermometerIcon className="w-6 h-6 text-gray-400" />}
      statusIndicator={<div className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${modeColors[mode]}`}>{mode}</div>}
    >
      <div className="text-center space-y-4">
        <div className={`text-7xl font-light ${tempTextColor} transition-colors duration-300`}>
          {temperature}°
        </div>
        <div className="flex justify-center items-center space-x-4">
          <button onClick={() => onSetTemperature(temperature - 1)} className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
            <MinusIcon className="w-6 h-6" />
          </button>
          <div className="text-lg w-16 text-center">Set</div>
          <button onClick={() => onSetTemperature(temperature + 1)} className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex justify-center space-x-2 pt-2">
          {(['cool', 'heat', 'off'] as const).map((m) => (
            <button
              key={m}
              onClick={() => onSetMode(m)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 border-2 ${mode === m ? modeColors[m] + ' scale-105' : 'border-transparent text-gray-400 hover:bg-gray-700'}`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </DeviceCard>
  );
};

export default ThermostatControl;
