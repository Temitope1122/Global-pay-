
import React from 'react';

interface DeviceCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  statusIndicator?: React.ReactNode;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ title, subtitle, icon, children, statusIndicator }) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col h-full transition-transform hover:scale-105 duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-gray-700 p-3 rounded-full mr-4">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">{title}</h3>
            <p className="text-sm text-gray-400">{subtitle}</p>
          </div>
        </div>
        {statusIndicator}
      </div>
      <div className="flex-grow flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};

export default DeviceCard;
