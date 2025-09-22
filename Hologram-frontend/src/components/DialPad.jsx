import React, { useState } from "react";

const DialPad = () => {
  const [phone, setPhone] = useState("+968"); // Pre-filled Oman code

  // Allow only 8 digits after +968
  const handleDigitClick = (digit) => {
    const digitsOnly = phone.replace("+968", "");
    if (digitsOnly.length < 8) {
      setPhone(phone + digit);
    }
  };

  const handleDelete = () => {
    if (phone.length > 4) {
      setPhone(phone.slice(0, -1));
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/saveNumber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile: phone, skipped: false }),
      });
      const data = await response.json();
      console.log("Response from backend:", data);
      alert("Number submitted successfully!");
    } catch (error) {
      console.error("Error submitting number:", error);
    }
  };

  const handleSkip = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/saveNumber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile: null, skipped: true }),
      });
      const data = await response.json();
      console.log("Response from backend (skipped):", data);
      alert("Skipped entering mobile number!");
    } catch (error) {
      console.error("Error sending skip response:", error);
    }
  };

  return (
    <div className="m-[38px] p-6 flex justify-center items-center w-full min-h-[539px]">
      <div
        style={{
          boxShadow: "-15px 50px 32px rgba(0,0,0,0.25)",
        }}
        className="flex flex-col items-center justify-between p-4 rounded-lg shadow-lg bg-gray-100 h-[520px] w-[416px]"
      >
        {/* Phone display */}
        <input
          type="text"
          value={phone}
          readOnly
          className="text-center outline-0 cursor-default rounded shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)] p-3 w-full font-bold mb-5 text-[30px] bg-white"
        />

        {/* Dial pad */}
        <div className="grid grid-cols-3 gap-3 w-full flex-1 items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              style={{ backgroundColor: "#2D13EA" }}
              key={num}
              onClick={() => handleDigitClick(num)}
              className="text-white text-[30px] cursor-pointer font-bold rounded-lg h-[70px] w-full"
            >
              {num}
            </button>
          ))}

          {/* Confirm button (bottom-left) */}
          <button
          style={{ backgroundColor: "#50D88D" }}
            onClick={handleConfirm}
            className=" text-black text-[25px] cursor-pointer font-bold rounded-lg h-[70px] w-full"
          >
            Confirm
          </button>

          {/* Zero button (bottom-center) */}
          <button
            style={{ backgroundColor: "#2D13EA" }}
            onClick={() => handleDigitClick(0)}
            className="text-white text-[30px] cursor-pointer font-bold rounded-lg h-[70px] w-full"
          >
            0
          </button>

          {/* Delete button (bottom-right) */}
          <button
            style={{ backgroundColor: "#FF7800" }}
            onClick={handleDelete}
            className=" text-white text-[30px] cursor-pointer font-extrabold rounded-lg h-[70px] w-full"
          >
            ⌫ 
          </button>
        </div>

        {/* Skip button at bottom */}
        <button
          style={{ backgroundColor: "#B9B9B9" }}
          onClick={handleSkip}
          className="w-full mt-3 text-black cursor-pointer py-3 rounded-lg text-[25px] font-semibold"
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default DialPad;
