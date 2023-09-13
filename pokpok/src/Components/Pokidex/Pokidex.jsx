import React from "react";
import Search from "../Search/Search";
import FinderImage from "../../assets/finderimage.png";
import PokimonList from "../PokimonList/PokimonList";

const Pokidex = () => {
  return (
    <>
      <div className=" w-full h-full text-white bg-gradient-to-b from-slate-900 via-slate-800 to bg-slate-600  flex items-center justify-center flex-col p-8">
        <img
          className="w-[100px] h-[100px] rounded-lg"
          src={FinderImage}
          alt=""
        />
        <h1 className="text-3xl tracking-wider  mb-4">Find your pokemon !</h1>
        <Search />
        <PokimonList />
      </div>
    </>
  );
};

export default Pokidex;
