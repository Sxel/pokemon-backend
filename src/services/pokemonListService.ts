import axios from 'axios';
import '../interfaces/pokemonInterface'
import { PokemonData } from '../interfaces/pokemonInterface';
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonList(limit: number = 10): Promise<PokemonData[]> {
  try {
    const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}`);
    const pokemonList: PokemonData[] = await Promise.all(response.data.results.map(async (pokemon: any) => {
      const pokemonDetailsResponse = await axios.get(pokemon.url);
      const pokemonDetails: PokemonData = pokemonDetailsResponse.data;
      
      const imageUrl = pokemonDetails.sprites ? pokemonDetails.sprites.front_default : '';
      
      return {
        name: pokemonDetails.name,
        types: pokemonDetails.types.map((type: any) => type.type.name),
        imageUrl: imageUrl
      };
    }));
    return pokemonList;
  } catch (error) {
    throw new Error('Error al obtener la lista de Pokémon');
  }
}
