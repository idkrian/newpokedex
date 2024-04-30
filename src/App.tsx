import { useEffect, useState } from "react";
import axios from "axios";
import { usePalette } from "react-palette";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Heart from "./assets/heart.png";
import Attack from "./assets/attack.png";
import Shield from "./assets/shield.png";
import SpecialAttack from "./assets/special-attack.png";
import SpecialDefense from "./assets/special-shield.png";
import Speed from "./assets/speed.png";
import { FaMinus, FaPlus } from "react-icons/fa6";
interface PokemonProps {
  order: number;
  name: string;
  height: number;
  weight: number;
  region: {
    name: string;
  };
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
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

      setPokemonData(reqPokemonData.data);
      setBackgroundImage(
        reqPokemonData.data.sprites.other["official-artwork"].front_default
      );
    };
    getPokemon();
  }, [pokemonNumber]);

  const getPokemonByName = async (pokemonName: string) => {
    if (pokemonName.length > 3) {
      await axios
        .get(`${api}/pokemon/${pokemonName}`)
        .then((res) => {
          setPokemonData(res.data);
          setPokemonNumber(res.data.id);
          setBackgroundImage(
            res.data.sprites.other["official-artwork"].front_default
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const { data } = usePalette(backgroundImage!);

  return (
    <div
      className="h-screen w-screen p-12 transition-colors bg-black items-center align-middle"
      style={{ backgroundColor: data.muted && data.muted }}
    >
      <div className="h-full w-full grid grid-cols-3 grid-rows-3 ">
        {pokemonData !== undefined && (
          <>
            <div className="flex justify-end font-pixel text-3xl uppercase text-white self-end">
              <h1>
                {pokemonData.stats[0].stat.name}:
                {pokemonData.stats[0].base_stat}
              </h1>
              <img
                src={Heart}
                alt=""
                className="w-6 h-6 text-white border-2 rounded-full border-black"
              />
            </div>
            <div className="flex flex-col items-center justify-center  row-span-3 ">
              {pokemonData.sprites !== undefined && (
                <img
                  src={
                    pokemonData.sprites.other["official-artwork"].front_default
                  }
                />
              )}
              <div className="transition-all text-3xl text-white font-pixel">
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
            <div className="flex justify-start self-end  text-3xl uppercase text-white font-pixel">
              <h1>
                {pokemonData.stats[1].stat.name}:
                {pokemonData.stats[1].base_stat}
              </h1>
              <img
                src={Attack}
                alt=""
                className="w-6 h-6 text-white border-2 rounded-full border-black"
              />
            </div>
            <div className="flex justify-end items-center  text-3xl uppercase text-white font-pixel mr-6">
              <h1>
                {pokemonData.stats[2].stat.name}:
                {pokemonData.stats[2].base_stat}
              </h1>
              <img
                src={Shield}
                alt=""
                className="w-6 h-6 text-white border-2 rounded-full border-black"
              />
            </div>
            <div className=" flex items-center text-3xl uppercase text-white font-pixel ml-6">
              <h1>
                {pokemonData.stats[3].stat.name}:
                {pokemonData.stats[3].base_stat}
              </h1>
              <img
                src={SpecialAttack}
                alt=""
                className="w-6 h-6 text-white border-2 rounded-full border-black"
              />
            </div>
            <div className="flex justify-end  text-3xl uppercase text-white font-pixel self-start">
              <h1>
                {pokemonData.stats[4].stat.name}:
                {pokemonData.stats[4].base_stat}
              </h1>
              <img
                src={SpecialDefense}
                alt=""
                className="w-6 h-6 text-white border-2 rounded-full border-black"
              />
            </div>
            <div className=" flex justify-start self-start text-3xl uppercase text-white font-pixel">
              <h1>
                {pokemonData.stats[5].stat.name}:
                {pokemonData.stats[5].base_stat}
              </h1>
              <img
                src={Speed}
                alt=""
                className="w-6 h-6 text-white border-2 rounded-full border-black"
              />
            </div>
          </>
        )}
      </div>
      <div className="flex justify-between px-12">
        <div className="flex">
          <button
            onClick={() => setPokemonNumber(pokemonNumber - 1)}
            className="px-4 py-2 bg-purple-700 border-2 border-black"
          >
            <FaMinus />
          </button>
          <input
            type="text"
            className="appearance-none border-2 border-y-black outline-none h-10"
            value={pokemonNumber}
            placeholder="Search by Number"
            onChange={(e) => {
              if (Number(e.target.value) === 0) {
                setPokemonNumber(0);
              }
              setPokemonNumber(Number(e.target.value));
            }}
          />
          <button
            onClick={() => setPokemonNumber(pokemonNumber + 1)}
            className="px-4 py-2 bg-purple-700 border-2 border-black"
          >
            <FaPlus />
          </button>
        </div>
        <div>
          <input
            type="text"
            className="border-2 border-black outline-none h-10 p-2"
            placeholder="Search by Name"
            onChange={(e) => {
              getPokemonByName(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
