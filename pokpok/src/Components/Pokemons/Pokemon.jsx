import React from "react";
import { Link } from "react-router-dom";

const Pokemon = ({ name, image, id }) => {
  return (
    <div className="w-[300px] shadow-md cursor-pointer h-[320px] flex flex-col items-center justify-evenly gap-2 border-[1px] rounded-xl ">
      <Link to={`/pokemon/${id}`}>
        <div>
          <img
            className="w-[200px] h-[200px] hover:scale-110 duration-300"
            src={image}
          />
        </div>
        <div className="capitalize text-center text-xl tracking-wider mt-2">{name}</div>
      </Link>
    </div>
  );
};

export default Pokemon;
