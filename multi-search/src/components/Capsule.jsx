import React from "react";

const Capsule = ({ image, text, onClick }) => {
  return (
    <span
      onClick={onClick}
      className="w-[180px] bg-slate-950 h-[50px] flex  gap-2 text-white items-center justify-center rounded-[26px] cursor-pointer  "
    >
      <img className="w-6 h-6" src={image} alt={text} />
      <span className="text-sm">{text} ❌</span>
    </span>
  );
};

export default Capsule;
