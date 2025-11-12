
import React from 'react';
import { SecurityCamera } from '../types';
import DeviceCard from './DeviceCard';
import { CameraIcon } from './icons';

interface SecurityCameraFeedProps {
  camera: SecurityCamera;
}

const SecurityCameraFeed: React.FC<SecurityCameraFeedProps> = ({ camera }) => {
  const { name, room, isOnline } = camera;

  return (
    <DeviceCard
      title={name}
      subtitle={room}
      icon={<CameraIcon className="w-6 h-6 text-gray-400" />}
      statusIndicator={
         <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className={`text-xs font-semibold ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
                {isOnline ? 'Online' : 'Offline'}
            </span>
        </div>
      }
    >
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative flex items-center justify-center">
        {isOnline ? (
          <img src={`https://picsum.photos/seed/${camera.id}/400/225`} alt="Security camera feed" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-gray-500">
            <CameraIcon className="w-12 h-12 mx-auto mb-2" />
            <p>Feed Unavailable</p>
          </div>
        )}
      </div>
    </DeviceCard>
  );
};

export default SecurityCameraFeed;
