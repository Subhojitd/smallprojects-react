import axios from "axios";
import { useEffect, useState } from "react";


function usePokemonList(url,type) {
  const [pokemonListState, setPokemonListState] = useState({
    pokimonList: [],
    isLoading: true,
    pokpokUrl: url,
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemons() {
    setPokemonListState((state) => ({
      ...state,
      isLoading: false,
    }));
    const response = await axios.get(pokemonListState.pokpokUrl); //This downloads 20 pokemons

    const pokemonresults = response.data.results; //We get the array of pokemons from the results
    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));


    if(type){
      setPokemonListState((state)=>({
        ...state,
        pokimonList:response.data.pokemon.slice(0,5)
      }))

    }else{
    // iterating over the array of pokemons, and using their url to download the pokemons from the api
    const pokimonResultPromise = pokemonresults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    // passing that promise array  to axios.all
    const pokemonData = await axios.all(pokimonResultPromise); //array of 20 pokemon detailed data
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
      F;
    });
    console.log(res);
    setPokemonListState((state) => ({
      ...state,
      pokimonList: res,
      isLoading: false,
    }));
  }
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokpokUrl]);

  return [pokemonListState,setPokemonListState]
}

export default usePokemonList;
