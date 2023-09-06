import React from "react";
import Icons from "../Icon/Icons";

const Card = ({ player ,onPlay,index}) => {
  let icon = <Icons/>;
  if (player == "X") {
    icon = <Icons name="cross" />;
  } else if (player == "O") {
    icon = <Icons name="circle" />;
  }
  return (
    <div onClick={()=> onPlay(index)} className="flex items-center justify-center  border-[1px] border-black w-[120px] m-2 h-[120px] rounded-lg bg-yellow-500 text-5xl ">
      {icon}
    </div>
  );
};

export default Card;
