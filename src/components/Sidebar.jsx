import React from 'react';

const Sidebar = () => (
  <>
    {/* LEFT SIDEBAR BUTTON */}
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70 transition-opacity">
        <img
          src="/Image/button-icon-shrunk.png"
          alt="button icon"
          className="w-8 h-8 object-contain"
        />
        <span className="text-[10px] text-black tracking-wider font-roobert font-extralight">
          DISCOVER ALL
        </span>
      </div>
    </div>

    {/* RIGHT SIDEBAR BUTTON */}
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70 transition-opacity">
        <span className="text-[10px] text-black tracking-wider font-roobert font-extralight">
          TAKE TEST
        </span>
        <img
          src="/Image/button-icon-shrunk-right.svg"
          alt="button icon right"
          className="w-8 h-8 object-contain"
        />
      </div>
    </div>
  </>
);

export default Sidebar;


