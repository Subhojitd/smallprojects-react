import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  async function getPokemodDetails() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
    });
    console.log(response.data);
  }

  useEffect(() => {
    getPokemodDetails();
  }, []);

  return (
    <>
      <div className="w-full h-screen text-white bg-gradient-to-br from-slate-900 via-slate-800 to bg-slate-600  flex items-center  justify-center  p-8">
      
        <div className=" h-[70%] w-[55%] border-[1px] border-white flex items-center justify-evenly bg-slate-900 rounded-full shadow-md  shadow-white ">
        <div className="flex flex-col items-center justify-center gap-3">
          <img className="w-[200px] h-[200px]" src={pokemon.image} alt="" />
          <h1 className="capitalize text-2xl font-bold tracking-wider ">{pokemon.name}</h1>  
        </div>
        <div className="flex flex-col items-start justify-evenly gap-3 text-xl ">
          <h1><span className="opacity-50">Height:</span> {pokemon.height}</h1>
          <h1><span className="opacity-50">Weight:</span> {pokemon.weight}</h1>
          <h1 className="capitalize">
          <span className="opacity-50">Type of pokemon:</span> {" "}
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
