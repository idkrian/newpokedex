import { Dispatch, SetStateAction } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Props {
  pokemonNumber: number;
  setPokemonNumber: Dispatch<SetStateAction<number>>;
}

const Steps = ({ pokemonNumber, setPokemonNumber }: Props) => {
  return (
    <div className="flex gap-6">
      <button onClick={() => setPokemonNumber(pokemonNumber - 1)} className="">
        <FaAngleLeft className="text-3xl text-white" />
      </button>
      <button onClick={() => setPokemonNumber(pokemonNumber + 1)} className="">
        <FaAngleRight className="text-3xl text-white" />
      </button>
    </div>
  );
};

export default Steps;
