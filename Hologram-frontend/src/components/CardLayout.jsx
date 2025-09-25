import React from "react";
import PromotionCard from "./PromotionCard";
import RatingCard from "./RatingCard";
import DialPad from "./DialPad";
import LanguageSelector from "./languageSelection";

function CardLayout() {
  return (
    <div>
      <div className="  justify-center">
      <div className="flex m-0 items-center justify-start overflow-x-scroll p-15 no-scrollbar">
        <DialPad />
         <RatingCard />
  {/* Blue Card */}
  <PromotionCard
    bgColor="#2D13EA"
    textColor="text-white"
    planName="Vivek"
    planType="Postpaid"
    description={["1TB Data for 1 Month", "Unlimited Talk Time"]}
    price="OMR 25"
  />

  {/* Orange Card */}
  <PromotionCard
    bgColor="#FF7800"
    textColor="text-white"
    planName="Prince"
    planType="Prepaid"
    description={["1TB Data for 1 Month", "Unlimited Talk Time"]}
    price="OMR 25"
  />
  <PromotionCard
    bgColor="#2D13EA"
    textColor="text-white"
    planName="Prince"
    planType="Prepaid"
    description={["1TB Data for 1 Month", "Unlimited Talk Time"]}
    price="OMR 25"
  />
  <PromotionCard
    bgColor="#FF7800"
    textColor="text-white"
    planName="Prince"
    planType="Prepaid"
    description={["1TB Data for 1 Month", "Unlimited Talk Time"]}
    price="OMR 25"
  />


<PromotionCard
    bgColor="#FF7800"
    textColor="text-white"
    planName="Prince"
    planType="Prepaid"
    description={["1TB Data for 1 Month", "Unlimited Talk Time"]}
    price="OMR 25"
  />
  
  <div className="absolute bottom-[455px] left-[50px]">
    <LanguageSelector />
  </div>
      </div>
    </div>

    </div>
  );
}

export default CardLayout;
