import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemons/Pokemon";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const PokimonList = () => {

  // Defining the states
  const [pokimonList, setPokimonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const POKPOK_URL = "https://pokeapi.co/api/v2/pokemon";

  async function downloadPokemons() {
    const response = await axios.get(POKPOK_URL);//This downloads 20 pokemons

    const pokemonresults = response.data.results;//We get the array of pokemons from the results

    // iterating over the array of pokemons, and using their url to download the pokemons from the api
    const pokimonResultPromise = pokemonresults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    // passing that promise array  to axios.all 
    const pokemonData = await axios.all(pokimonResultPromise);//array of 20 pokemon detailed data
    console.log(pokemonData);

    // now iterate over the each data ofo pokemon detailed data like name ,id, image etc. and 
    const res = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.other.front_shiny,
        types: pokemon.types,
      };
    });
    console.log(res);
    setPokimonList(res);
    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemons();
  }, []);

  return (
    <>
      <div className="">
        <div className="w-full text-2xl text-center my-3 tracking-wide ">-:{" "}Pokemon Collection{" "}:-</div>
        <div className="flex flex-wrap items-center justify-center mt-8 gap-4 pb-6 border-b-[1px] ">
        {isLoading
          ? "Loading.."
          : pokimonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} />
            ))}
        </div>
        
        <div className="mt-6 flex items-center justify-center gap-8">
          <button><ArrowBackIosNewIcon/>Prev</button>
          <button>Next<ArrowForwardIosIcon/></button>
        </div>
        
      </div>
    </>
  );
};

export default PokimonList;
