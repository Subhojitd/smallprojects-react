import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemons/Pokemon";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const PokimonList = () => {
  
  // Defining the states
  const [pokimonList, setPokimonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pokpokUrl,setpokpokUrl] = useState("https://pokeapi.co/api/v2/pokemon");

  const [prevUrl, setPrevUrl] = useState("")
  const [nextUrl, setnextUrl] = useState("")

  const myprevButtonClass = prevUrl ? "" : "opacity-50";

  async function downloadPokemons() {
    setIsLoading(true)
    const response = await axios.get(pokpokUrl);//This downloads 20 pokemons

    const pokemonresults = response.data.results;//We get the array of pokemons from the results
    setnextUrl(response.data.next)
    setPrevUrl(response.data.previous)
    
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
  }, [pokpokUrl]);

  return (
    <>
      <div className=" w-full h-full ">
        <div className="w-full  text-2xl text-center my-3 tracking-wide ">-:{" "}Pokemon Collection{" "}:-</div>
        <div className="flex flex-wrap items-center justify-center mt-8 gap-4 pb-6 border-b-[1px] ">
        {isLoading
          ? "Loading.."
          : pokimonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
        </div>
        
        <div className="mt-6 flex items-center justify-center gap-8">
          <button onClick={()=>setpokpokUrl(prevUrl)} className={myprevButtonClass}><ArrowBackIosNewIcon/>Prev</button>
          <button onClick={()=>setpokpokUrl(nextUrl)}>Next<ArrowForwardIosIcon/></button>
        </div>
        
      </div>
    </>
  );
};

export default PokimonList;
