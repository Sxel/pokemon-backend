export interface PokemonData {
    name: string;
    stats: { base_stat: number, effort: number, stat: { name: string, url: string } }[];
    types: string[];
    sprites: {
      front_default: string;
    };
  }
  
 