export interface PokemonProps {
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
