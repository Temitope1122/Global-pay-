
import React from 'react';
import { HomeIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 p-4 border-b border-gray-700">
      <div className="container mx-auto flex items-center">
        <HomeIcon className="w-8 h-8 text-cyan-400 mr-3" />
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Gemini Smart Home
        </h1>
      </div>
    </header>
  );
};

export default Header;
