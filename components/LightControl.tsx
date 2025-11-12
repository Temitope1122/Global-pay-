
import React from 'react';
import { Light } from '../types';
import DeviceCard from './DeviceCard';
import { LightbulbIcon } from './icons';

interface LightControlProps {
  light: Light;
  onToggle: (isOn: boolean) => void;
}

const LightControl: React.FC<LightControlProps> = ({ light, onToggle }) => {
  const { name, room, isOn } = light;
  const bgColor = isOn ? 'bg-yellow-400' : 'bg-gray-600';
  const indicatorPosition = isOn ? 'translate-x-full' : 'translate-x-0';

  return (
    <DeviceCard
      title={name}
      subtitle={room}
      icon={<LightbulbIcon className={`w-6 h-6 ${isOn ? 'text-yellow-300' : 'text-gray-400'}`} />}
      statusIndicator={
        <div className={`text-xs font-semibold px-2 py-1 rounded-full ${isOn ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
          {isOn ? 'ON' : 'OFF'}
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-gray-300">
          The light is currently <span className="font-bold">{isOn ? 'On' : 'Off'}</span>.
        </p>
        <button
          onClick={() => onToggle(!isOn)}
          className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 ${bgColor}`}
        >
          <span
            className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 m-1 ${indicatorPosition}`}
          />
        </button>
      </div>
    </DeviceCard>
  );
};

export default LightControl;
