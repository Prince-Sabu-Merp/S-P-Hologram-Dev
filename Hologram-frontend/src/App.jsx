import React from "react";
import "./fonts.css";
import "./App.css";
import Avatar from "./components/Avatar";
import CradLayout from "./components/CardLayout";
import ScreenSaver from "./components/ScreenSaver";
import InfoMessages from "./components/InfoMessages";
import FaceDistanceOnly from "./Presence_Detection/FaceDistanceOnly";

function App() {
  return (
    <div className="relative w-dvw h-dvh overflow-hidden">
    
      <FaceDistanceOnly
        showDistance={true}
        holdTime={3000}
        minRange={60}
        maxRange={90}
        realEyeDistanceCm={10}
        focalLength={606}
        isVisible={false}
      />

     
      <ScreenSaver />

    
      {/* <InfoMessages
        className=""
        messageHead="Welcome to Hologram"
        messageBody="This is a sample message body."
      /> */}

      {/* If needed later */}
      {/* <CradLayout /> */}
    </div>
  );
}

export default App;
