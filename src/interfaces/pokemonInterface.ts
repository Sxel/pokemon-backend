export interface PokemonData {
  name: string;
  types: string[];
  sprites?: { // Hacer la propiedad 'sprites' opcional con '?'
    front_default: string;
  };
  imageUrl: string;
}
