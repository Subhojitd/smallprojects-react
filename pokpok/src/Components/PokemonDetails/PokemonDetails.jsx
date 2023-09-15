import React  from "react";
import {useParams } from "react-router-dom";
import usePokemonDetails from "../../hooks/usePokemonDetails";
const PokemonDetails = ({ pokemonName }) => {
  const { id } = useParams();
  const [pokemon] = usePokemonDetails(id, pokemonName)

  return (
    <>
      <div className="w-full h-screen text-white bg-gradient-to-br from-slate-900 via-slate-800 to bg-slate-600  flex items-center  justify-center  p-8">
      
        <div className=" h-[70%] w-[90%] lg:w-[50%] lg:rounded-lg border-[1px] border-white flex items-center justify-evenly bg-slate-900 rounded-lg  shadow-md  shadow-white md:rou ">
        <div className="flex flex-col items-center justify-center gap-3">
          <img className="w-[200px] h-[200px]" src={pokemon.image} alt="" />
          <h1 className="capitalize text-2xl font-bold tracking-wider ">{pokemon.name}</h1>  
        </div>
        <div className="flex flex-col items-start justify-evenly gap-3  text-sm lg:text-xl px-2">
          <h1><span className="opacity-50">Height:</span> {pokemon.height}</h1>
          <h1><span className="opacity-50">Weight:</span> {pokemon.weight}</h1>
          <h1 className="capitalize">
          <span className="opacity-50">Type:</span> {" "}
            {pokemon.types &&
              pokemon.types.map((t) => <span key={t}> {t} </span>)}
          </h1>
        </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDetails;
