import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <>
      {/* Left Sidebar */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70 transition-opacity">
          <img 
            src="/Image/buttin-icon-shrunk.png" 
            alt="button icon" 
            className="w-10 h-10 object-contain" 
          />
          <span className="text-[14px] text-black tracking-wider font-roobert font-extralight">DISCOVER ALL</span>
        </div>
      </div>
      
      {/* Right Sidebar */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70 transition-opacity">
          <span className="text-[14px] text-black tracking-wider font-roobert font-extralight">TIME TEST</span>
          <img
            src="/Image/button-icon-shrunk-right.svg"
            alt="button icon right"
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;







