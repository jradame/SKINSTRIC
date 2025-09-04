import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <>
      {/* Left Sidebar */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70 transition-opacity">
          <FiArrowLeft className="w-4 h-4" />
          <span className="text-sm tracking-wider">DISCOVER ALL</span>
        </div>
      </div>
      
      {/* Right Sidebar */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70 transition-opacity">
          <span className="text-sm tracking-wider">TIME TEST</span>
          <FiArrowRight className="w-4 h-4" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
