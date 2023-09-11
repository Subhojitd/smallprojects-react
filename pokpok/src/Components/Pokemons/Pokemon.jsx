import React from "react";

const Pokemon = ({ name, image }) => {
  return (
    <div className="w-[300px] shadow-md cursor-pointer h-[320px] flex flex-col items-center justify-evenly border-[1px] rounded-xl ">
      <div>
        <img className="w-[200px] h-[200px] hover:scale-110 duration-300" src={image} />
      </div>
      <div className="capitalize text-xl tracking-wider">{name}</div>
    </div>
  );
};

export default Pokemon;
