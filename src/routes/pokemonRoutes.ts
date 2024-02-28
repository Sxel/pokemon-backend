import express from 'express';
import { getPokemonDetailsController } from '../controllers/pokemonDetailsController';
import { getPokemonListController } from '../controllers/pokemonListController';
import { getPokemonSearchController } from '../controllers/pokemonSearchController';

const router = express.Router();

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * @swagger
 * /pokemon:
 *   get:
 *     summary: Obtiene una lista de Pokémon.
 *     description: Endpoint para obtener una lista de Pokémon.
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve una lista de Pokémon.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', getPokemonListController);
    // Implementación del endpoint para obtener una lista de Pokémon
  
  

  /**
 * @swagger
 * /search:
 *   get:
 *     summary: Obtiene el resultado de una busqueda.
 *     description: Endpoint para obtener uno o mas Pokemones encontrados.
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve el resultado de la busqueda.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/search', getPokemonSearchController);
 // Implementación del endpoint para buscar y filtrar Pokemon o tipo

 /**
 * @swagger
 * /:name/details:
 *   get:
 *     summary: Obtiene el resultado detallado de un Pokemon.
 *     description: Endpoint para obtener mas informacion.
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve los detalles del Pokemon.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:name/details', getPokemonDetailsController);
 // Implementación del endpoint para obtener detalles completos de un Pokemon por su nombre

export default router;
