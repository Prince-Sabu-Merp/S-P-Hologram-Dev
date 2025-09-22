import React, { useState } from "react";

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState("Arabic");
  const [showOptions, setShowOptions] = useState(false);

  const handleLanguageChange = async (lang) => {
    setSelectedLang(lang);
    setShowOptions(false);

    try {
      const response = await fetch("http://localhost:5000/api/setLanguage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: lang }),
      });
      const data = await response.json();
      console.log("Response from backend:", data);
    } catch (error) {
      console.error("Error sending language:", error);
    }
  };

  return (
    <div
      style={{
        boxShadow: "-15px 50px 32px rgba(0,0,0,0.25)",
      }}
      className="flex flex-col items-start  "
    >
      {/* Selected language (always visible) */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        style={{
          backgroundColor: selectedLang === "Arabic" ? "#2D13EA" : "#FF7A00",
        }}
        className="text-white cursor-pointer px-4 py-2 rounded-lg font-semibold text-[30px] w-[231px] h-[68px] text-center"
      >
        {selectedLang === "Arabic" ? "عربي" : "English"}
      </button>

      {/* Alternate language (only visible when toggled) */}
      {showOptions && (
        <button
          onClick={() =>
            handleLanguageChange(
              selectedLang === "Arabic" ? "English" : "Arabic"
            )
          }
          style={{
            backgroundColor: selectedLang === "Arabic" ? "#FF7A00" : "#2D13EA",
          }}
          className="text-white px-4 py-2 cursor-pointer rounded-lg shadow-md font-semibold text-[30px] w-[231px] h-[68px] text-center"
        >
          {selectedLang === "Arabic" ? "English" :"عربي"}
        </button>
      )}
    </div>
  );
};

export default LanguageSelector;
