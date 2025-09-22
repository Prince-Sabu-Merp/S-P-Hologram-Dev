// PromotionCard.jsx
import React from "react";


const PromotionCard = ({
  bgColor , // default color
  textColor = "text-white",
  planName ,
  planType ,
  description ,
  price,
}) => {
  return (
    <div
      className={`min-w-[428px] min-h-[539px] cursor-pointer rounded-2xl overflow-hidden m-[38px] p-6 flex flex-col justify-between  ${textColor}`}
      style={{ boxShadow: "-15px 50px 32px rgba(0,0,0,0.25)", backgroundColor: bgColor || '#2D13EA' }} // default to deepSeaBlue if no bgColor provided
    >
      {/* Plan Details */}
      <div>
        <p className="text-[30px] font-medium ">Plan Name : {planName}</p>
        <p className="text-[30px] font-medium">Plan Type : {planType}</p>
      </div>

      <hr className="border-0 h-[2px] bg-white my-4" />

      {/* Description */}
      <div className="mt-6">
        <h3 className="text-[36px] font-semibold mb-2">Plan Description</h3>
        <ul className="space-y-1 list-disc list-inside text-[30px]">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <hr className="border-0 h-[2px] bg-white my-4" />

      {/* Price */}
      <div className="mt-6">
        <p className="text-[46px] font-bold">{price}</p>
      </div>
    </div>
  );
};

export default PromotionCard;
