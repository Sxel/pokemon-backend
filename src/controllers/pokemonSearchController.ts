import { Request, Response } from 'express';
import { searchPokemonByName, searchPokemonByType } from '../services/pokemonSearchService';

export async function getPokemonSearchController(req: Request, res: Response) {
  const { name, type } = req.query;

  try {
    let searchResults: { name: string, types: string[], imageUrl: string }[] = [];

    if (name) {
      searchResults = await searchPokemonByName(name.toString());
    } else if (type) {
      searchResults = await searchPokemonByType(type.toString());
    } else {
      return res.status(400).json({ error: 'Debe proporcionar un nombre o tipo para realizar la búsqueda' });
    }

    res.json(searchResults);
  } catch (error) {
    console.error('Error al realizar la búsqueda:', error);
    res.status(500).json({ error: 'Error al realizar la búsqueda' });
  }
}
