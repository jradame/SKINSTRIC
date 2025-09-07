import React from "react";

const HalfDiamond = () => {
  return (
    <div
      className="absolute top-[179px] left-[-301px] w-[602px] h-[602px] rotate-45 border-2 border-black border-dashed"
      style={{ borderSpacing: "2px" }}
    >
      {/* Inner content, rotated back */}
      <div className="absolute inset-0 -rotate-45 flex flex-col items-center justify-center gap-2">
        {/* Small inner diamond */}
        <div className="w-5 h-5 border border-black rotate-45 flex items-center justify-center">
          <div className="-rotate-45 w-2 h-0.5 bg-black" />
        </div>
        <span className="text-xs tracking-widest uppercase">
          DISCOVER A.I.
        </span>
      </div>
    </div>
  );
};

export default HalfDiamond;
