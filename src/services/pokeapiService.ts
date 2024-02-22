import axios from 'axios';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonDetails(name: string) {
  try {
    const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${name}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener detalles del Pokémon');
  }
}
