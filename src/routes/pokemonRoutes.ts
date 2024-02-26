import express from 'express';
import { getPokemonDetailsController } from '../controllers/pokemonDetailsController';
import { getPokemonListController } from '../controllers/pokemonListController';
import { getPokemonSearchController } from '../controllers/pokemonSearchController';

const router = express.Router();

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

// Endpoint para obtener todos los Pokémon con su nombre, tipo y foto
router.get('/', getPokemonListController);

// Endpoint para buscar y filtrar Pokémon por nombre o tipo
router.get('/search', getPokemonSearchController);


// Endpoint para obtener detalles completos de un Pokémon por su nombre
router.get('/:name/details', getPokemonDetailsController);

export default router;
