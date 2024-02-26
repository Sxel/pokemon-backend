import axios from 'axios';
import { PokemonData } from '../interfaces/pokemonInterface';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export async function searchPokemonByName(name: string): Promise<PokemonData[]> {
  try {
    const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${name}`);
    const { data: pokemonDetails }: { data: PokemonData } = response;
    const imageUrl = pokemonDetails.sprites ? pokemonDetails.sprites.front_default : ''; // Asignar un valor predeterminado si sprites es undefined
    return [{
      name: pokemonDetails.name,
      types: pokemonDetails.types.map((type: any) => type.type.name),
      imageUrl: imageUrl
    }];
  } catch (error) {
    throw new Error('Error al buscar el Pokémon por nombre');
  }
}

export async function searchPokemonByType(type: string): Promise<PokemonData[]> {
  try {
    const response = await axios.get(`${POKEAPI_BASE_URL}/type/${type}`);
    const { data: typeData }: { data: { pokemon: { pokemon: { url: string } }[] } } = response;
    const pokemonList: PokemonData[] = await Promise.all(typeData.pokemon.map(async (pokemon: any) => {
      const pokemonDetailsResponse = await axios.get(pokemon.pokemon.url);
      const { data: pokemonDetails }: { data: PokemonData } = pokemonDetailsResponse;
      const imageUrl = pokemonDetails.sprites ? pokemonDetails.sprites.front_default : ''; // Asignar un valor predeterminado si sprites es undefined
      return {
        name: pokemonDetails.name,
        types: pokemonDetails.types.map((typeInfo: any) => typeInfo.type.name),
        imageUrl: imageUrl
      };
    }));
    return pokemonList;
  } catch (error) {
    throw new Error('Error al buscar el Pokémon por tipo');
  }
}
