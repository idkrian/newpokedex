import { useEffect, useState } from "react";
import axios from "axios";
import { usePalette } from "react-palette";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
interface PokemonProps {
  order: number;
  name: string;
  height: number;
  weight: number;
  region: {
    name: string;
  };
  stats: [
    {
      base_stat: number;
      stat: { name: string };
    }
  ];
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string;
      };
    };
  };
}
function App() {
  const api = "https://pokeapi.co/api/v2/";
  const [pokemonData, setPokemonData] = useState<PokemonProps>();
  const [backgroundImage, setBackgroundImage] = useState();
  const [pokemonNumber, setPokemonNumber] = useState(1);

  useEffect(() => {
    const getPokemon = async () => {
      const reqPokemonData = await axios.get(`${api}/pokemon/${pokemonNumber}`);
      const reqRegionData = await axios.get(`${api}/location/${pokemonNumber}`);
      // console.log(reqRegionData.data);

      setPokemonData({
        ...reqPokemonData.data,
        region: reqRegionData.data.region,
      });
      setBackgroundImage(
        reqPokemonData.data.sprites.other["official-artwork"].front_default
      );
    };
    getPokemon();
  }, [pokemonNumber]);

  const { data } = usePalette(backgroundImage!);
  console.log(pokemonData);

  return (
    <>
      <div
        className="h-screen w-screen grid grid-cols-3 p-12 transition-colors bg-black"
        style={{ backgroundColor: data.muted && data.muted }}
      >
        {pokemonData !== undefined && (
          <>
            <div className="flex flex-col justify-between">
              <div className="font-pixel text-white">
                <p className="text-2xl">#{pokemonData.order}</p>
                <p className="text-2xl">{pokemonData.name}</p>
              </div>
              <div className="self-center font-pixel text-white">
                <p className="text-xl">Height: {pokemonData.height / 10}m</p>
                <p className="text-xl">Weigth: {pokemonData.weight / 10}kg</p>
              </div>
              <div className="flex -rotate-90 w-fit mb-14 self-start -translate-x-14 font-pixel text-white">
                <p className="text-xl">Region: {pokemonData.region.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              {pokemonData.sprites !== undefined && (
                <img
                  src={
                    pokemonData.sprites.other["official-artwork"].front_default
                  }
                />
              )}
              <div className="transition-all text-3xl text-white">
                {pokemonData.name}
              </div>
              <div>
                <button
                  onClick={() => setPokemonNumber(pokemonNumber - 1)}
                  className=""
                >
                  <FaAngleLeft className="text-3xl text-white" />
                </button>
                <button
                  onClick={() => setPokemonNumber(pokemonNumber + 1)}
                  className=""
                >
                  <FaAngleRight className="text-3xl text-white" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <p className="text-5xl font-pixel text-white">Base Stats:</p>
              <div className="flex gap-2">
                <div className="p-1 border-2 border-b-4 border-r-4 border-black rounded-sm bg-white"></div>
                <div className="flex flex-wrap gap-4">
                  {pokemonData.stats?.map((item, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 border-2 border-b-4 border-r-4 bg-white border-black rounded-sm"
                    >
                      <p>
                        <span className="uppercase">{item.stat.name}</span>:{" "}
                        {item.base_stat}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
