import React from "react";
import { ColorRing } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="bg-[#2E2E29]/10 h-[940px] flex justify-center items-center z-50">
      <ColorRing
        visible={true}
        height="50"
        width="50"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#F0ECE4", "#F2ECA4", "#99BAEC", "#B8E2C6", "#FFFFFF"]}
      />
    </div>
  );
};

export default Spinner;
