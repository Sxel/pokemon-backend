import express from 'express';
import axios from 'axios';
import { PokemonData } from '../interfaces/pokemonInterface';
import { getPokemonDetailsController } from '../controllers/pokemonController';

const router = express.Router();

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

// Endpoint para obtener todos los Pokémon con su nombre, tipo y foto
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon?limit=10`);
    const pokemonList = response.data.results;

    let pokemonDetailsList: { name: string, types: string[], imageUrl: string }[] = [];

    for (const pokemon of pokemonList) {
      const pokemonResponse = await axios.get(pokemon.url);
      const pokemonData: PokemonData = pokemonResponse.data;
      const imageUrl = pokemonData.sprites.front_default;
      pokemonDetailsList.push({ name: pokemonData.name, types: pokemonData.types.map((type: any) => type.type.name), imageUrl });
    }

    res.json(pokemonDetailsList);
  } catch (error) {
    console.error('Error al obtener detalles de los Pokémon:', error);
    res.status(500).json({ error: 'Error al obtener detalles de los Pokémon' });
  }
});

// Endpoint para buscar y filtrar Pokémon por nombre o tipo
router.get('/search', async (req, res) => {
  const { name, type } = req.query; // Obtener parámetros de búsqueda

  try {
    let searchResults: { name: string, types: string[], imageUrl: string }[] = []; // Definir el tipo de la variable de resultados

    if (name) {
      // Realizar búsqueda por nombre si se proporciona el parámetro 'name'
      const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${name}`);
      const pokemonData: PokemonData = response.data;
      const imageUrl = pokemonData.sprites.front_default;
      searchResults.push({ name: pokemonData.name, types: pokemonData.types.map((type: any) => type.type.name), imageUrl });
    } else if (type) {
      // Realizar búsqueda por tipo si se proporciona el parámetro 'type'
      const response = await axios.get(`${POKEAPI_BASE_URL}/type/${type}`);
      const typeData = response.data;
      for (const pokemon of typeData.pokemon) {
        const response = await axios.get(pokemon.pokemon.url);
        const pokemonData: PokemonData = response.data;
        const imageUrl = pokemonData.sprites.front_default;
        searchResults.push({ name: pokemonData.name, types: pokemonData.types.map((type: any) => type.type.name), imageUrl });
      }
    } else {
      return res.status(400).json({ error: 'Debe proporcionar un nombre o tipo para realizar la búsqueda' });
    }

    // Enviar los resultados al frontend
    res.json(searchResults);
  } catch (error) {
    console.error('Error al realizar la búsqueda:', error);
    res.status(500).json({ error: 'Error al realizar la búsqueda' });
  }
});

// Endpoint para obtener detalles completos de un Pokémon por su nombre
router.get('/:name/details', getPokemonDetailsController);

export default router;
