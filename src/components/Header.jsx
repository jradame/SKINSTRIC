import React from 'react';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-6 text-black">
      <div className="flex items-center space-x-8">
        <div className="font-semibold tracking-wider font-roobert text-sm">SKINETIC</div>
        <div className="text-xs tracking-wider font-roobert uppercase">INTRO</div>
      </div>
      <button className="bg-black text-white px-6 py-2 text-xs tracking-wider hover:bg-gray-800 transition-colors font-roobert uppercase">
        Enter Code
      </button>
    </header>
  );
};

export default Header;




