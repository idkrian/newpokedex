import { useEffect, useState } from "react";
import axios from "axios";
import { usePalette } from "react-palette";
import Heart from "./assets/heart.png";
import Attack from "./assets/attack.png";
import Shield from "./assets/shield.png";
import SpecialAttack from "./assets/special-attack.png";
import SpecialDefense from "./assets/special-shield.png";
import Speed from "./assets/speed.png";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { PokemonProps } from "./interfaces";
import Steps from "./components/Steps";
import Stat from "./components/Stat";

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
      className="flex flex-col p-12 transition-colors bg-black items-center align-middle h-svh w-svh"
      style={{ backgroundColor: data.muted && data.muted }}
    >
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-3 grid-rows-3 ">
        {pokemonData !== undefined && (
          <>
            <div className="flex flex-col justify-center items-center row-span-3">
              <div className="text-3xl xl:text-5xl transition-all text-white font-pixel drop-shadow-xl">
                {pokemonData.name}
              </div>
              {pokemonData.sprites !== undefined && (
                <img
                  className="drop-shadow-xl"
                  src={
                    pokemonData.sprites.other["official-artwork"].front_default
                  }
                />
              )}
              <Steps
                setPokemonNumber={setPokemonNumber}
                pokemonNumber={pokemonNumber}
              />
            </div>
            <div className="md:order-first self-end">
              <Stat
                pokemonData={pokemonData}
                statNumber={0}
                icon={Heart}
                justify="end"
                rest="self-end"
              />
            </div>
            <Stat
              pokemonData={pokemonData}
              statNumber={1}
              icon={Attack}
              justify="start"
              rest="self-end"
            />

            <Stat
              pokemonData={pokemonData}
              statNumber={2}
              icon={Shield}
              justify="end"
              rest="md:items-center md:mr-10"
            />
            <Stat
              pokemonData={pokemonData}
              statNumber={3}
              icon={SpecialAttack}
              justify="start"
              rest="md:items-center md:ml-10"
            />
            <Stat
              pokemonData={pokemonData}
              statNumber={4}
              icon={SpecialDefense}
              justify="end"
            />
            <Stat
              pokemonData={pokemonData}
              statNumber={3}
              icon={Speed}
              justify="start"
            />
          </>
        )}
      </div>
      <div className="flex flex-col-reverse items-center gap-4 mt-4 md:flex-row justify-between px-12 flex-wrap">
        <div className="flex">
          <button
            onClick={() => setPokemonNumber(pokemonNumber - 1)}
            className="h-9 w-9 flex items-center justify-center border-2 border-black bg-white"
          >
            <FaMinus />
          </button>
          <input
            type="text"
            className="appearance-none border-2 border-y-black outline-none h-9 w-8 text-center font-bold"
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
            className="h-9 w-9 flex items-center justify-center border-2 border-black bg-white"
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
