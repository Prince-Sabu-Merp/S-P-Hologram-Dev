import React from "react";

const ScreenSaver = ({ url = "/ScreenSaverFallback.png" }) => {
  return (
    <div>
      <img
        src={url}
        alt="Screen Saver"
        className="w-dvw h-dvh object-cover z-0"
      />
    </div>
  );
};

export default ScreenSaver;
