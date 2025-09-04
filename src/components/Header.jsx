import React from 'react';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-6 text-black">
      <div className="flex items-center space-x-8">
        <div className="font-semibold tracking-wider">SKINETIC</div>
        <div className="text-sm tracking-wider">INTRO</div>
      </div>
      <button className="bg-black text-white px-6 py-2 text-sm tracking-wider hover:bg-gray-800 transition-colors">
        FULL BLOG
      </button>
    </header>
  );
};

export default Header;
