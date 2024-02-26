export interface PokemonData {
  name: string;
  types: string[];
  sprites?: { 
    front_default: string;
  };
  imageUrl: string;
}
