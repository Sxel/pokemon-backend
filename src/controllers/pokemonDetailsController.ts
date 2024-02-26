import { Request, Response } from 'express';
import { getPokemonDetails } from '../services/pokemonDetailsService';


export async function getPokemonDetailsController(req: Request, res: Response) {
  const { name } = req.params;
  try {
    const pokemonDetails = await getPokemonDetails(name);
    res.json(pokemonDetails);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener detalles del Pokémon' });
  }
}
