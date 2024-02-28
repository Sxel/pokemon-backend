import { Request, Response } from 'express';
import { getPokemonList } from '../services/pokemonListService';
import { PokemonData } from '../interfaces/pokemonInterface';

export async function getPokemonListController(req: Request, res: Response) {
  try {
    const pokemonList: PokemonData[] = await getPokemonList();
    res.json(pokemonList);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de Pokémon' });
  }
}
