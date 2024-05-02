import { PokemonProps } from "../interfaces";
interface Props {
  pokemonData: PokemonProps;
  icon: string;
  statNumber: number;
  justify: "start" | "end";
  rest?: string;
}

const Stat = ({ pokemonData, icon, statNumber, justify, rest }: Props) => {
  return (
    <div
      className={`flex gap-2 font-pixel text-3xl uppercase text-white   
      ${justify == "end" ? "justify-end" : "justify-end flex-row-reverse"} 
      ${rest}`}
    >
      <h1>
        {pokemonData.stats[statNumber].stat.name}:{" "}
        {pokemonData.stats[statNumber].base_stat}
      </h1>
      <img
        src={icon}
        className="w-10 h-10 text-white border-2 rounded-full border-black p-1"
      />
    </div>
  );
};

export default Stat;
