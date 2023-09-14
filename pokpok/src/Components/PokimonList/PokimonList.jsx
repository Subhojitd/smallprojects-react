import Pokemon from "../Pokemons/Pokemon";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import usePokemonList from "../../hooks/usePokemonList";
const PokimonList = () => {

  

  const [pokemonListState,setPokemonListState] = usePokemonList("https://pokeapi.co/api/v2/pokemon")

  const myprevButtonClass = pokemonListState.prevUrl ? "" : "opacity-50";

  return (
    <>
      <div className=" w-full h-full ">
        {" "}
        <div className="w-full  text-2xl text-center my-3 tracking-wide ">
          -: Pokemon Collection :-
        </div>
        <div className="flex flex-wrap items-center justify-center mt-8 gap-4 pb-6 border-b-[1px] ">
          {pokemonListState.isLoading
            ? "Loading.."
            : pokemonListState.pokimonList.map((p) => {
                return (
                  <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
                );
              })}
        </div>
        <div className="mt-6 flex items-center justify-center gap-8">
          <button
            onClick={() => {
              const urlToSet = pokemonListState.prevUrl;
              setPokemonListState({
                ...pokemonListState,
                pokpokUrl: urlToSet,
              });
            }}
            className={myprevButtonClass}
          >
            <ArrowBackIosNewIcon />
            Prev
          </button>
          <button
            onClick={() => {
              const urlToSet = pokemonListState.nextUrl;
              setPokemonListState({ 
                ...pokemonListState, 
                pokpokUrl: urlToSet });
            }}
          >
            Next
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default PokimonList;
