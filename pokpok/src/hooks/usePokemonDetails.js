import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonDetails(id, pokemonName) {
    const [pokemon, setPokemon] = useState({});
    const [pokemonListState, setPokemonListState] = useState({});

    async function downloadPokemon() {
        try {
            let response;

            if (pokemonName) {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            } else if (id) {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            } else {
                // Handle the case where neither id nor pokemonName is provided
                return;
            }

            const pokemonOfSameTypes = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ''}`);
            
            setPokemon({
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default,
                weight: response.data.weight,
                height: response.data.height,
                types: response.data.types.map((t) => t.type.name),
                similarPokemons: pokemonOfSameTypes.data.pokemon
            });

            setPokemonListState({ ...pokemonListState, type: response.data.types ? response.data.types[0].type.name : '' });
        } catch (error) {
            console.error('Something went wrong:', error);
        }
    }

    useEffect(() => {
        downloadPokemon();
    }, [id, pokemonName]);

    return [pokemon];
}

export default usePokemonDetails;
