import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <>
      {/* Left Sidebar */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex items-center space-x-2 cursor-pointer hover:opacity-70 transition-opacity">
          <img 
            src="/Image/buttin-icon-shrunk.png" 
            alt="button icon" 
            className="w-7 h-7 object-contain" 
          />
          <span className="text-[10px] text-black tracking-wider font-roobert">DISCOVER ALL</span>
          <FiArrowLeft className="w-4 h-4" />
        </div>
      </div>
      
      {/* Right Sidebar */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70 transition-opacity">
          <span className="text-[10px] text-black tracking-wider font-roobert">TIME TEST</span>
          <FiArrowRight className="w-4 h-4" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;




