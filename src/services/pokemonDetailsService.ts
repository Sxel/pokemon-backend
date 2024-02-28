import axios from 'axios';
import { PokemonDetails } from '../interfaces/pokemonDetailsInterface';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonDetails(name: string): Promise<PokemonDetails> {
  try {
    const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${name}`);
    const pokemonDetails: PokemonDetails = response.data;
    const types: string[] = pokemonDetails.types.map((type: any) => type.type.name);
    const type: string = types.join(', '); 

    return {
      name: pokemonDetails.name,
      height: pokemonDetails.height,
      weight: pokemonDetails.weight,
      abilities: pokemonDetails.abilities.map((ability: any) => ability.ability.name),
      types: pokemonDetails.types.map((type: any) => type.type.name),
    };
  } catch (error) {
    throw new Error('Error al obtener detalles del Pokémon');
  }
}
