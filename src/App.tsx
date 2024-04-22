import { useEffect, useState } from "react";
import Charizard from "./assets/006Charizard.png";
import axios from "axios";

function App() {
  const api = "https://pokeapi.co/api/v2/";
  const [pokemonData, setPokemonData] = useState({});
  const getPokemon = async () => {
    const data = await axios.get(`${api}/pokemon/gengar`);
    console.log(data.data);
    setPokemonData(data.data);
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div className="h-screen w-screen grid grid-cols-3 p-12 bg-orange-300">
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
              <p className="text-xl">Region: Kanto</p>
            </div>
          </div>
          <div className="flex items-center">
            {pokemonData.sprites !== undefined && (
              <img
                src={
                  pokemonData.sprites.other["official-artwork"].front_default
                }
                className="w-96"
                alt=""
              />
            )}
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
  );
}

export default App;
