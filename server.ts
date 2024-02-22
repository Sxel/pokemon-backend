import express, { Request, Response } from 'express';
import axios from 'axios';
import { PokemonData } from './src/interfaces/pokemonInterface'; 


const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');

app.use(cors());


// Endpoint para obtener todos los Pokémon con su nombre, tipo y foto
app.get('/pokemon', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10`);
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
app.get('/search', async (req: Request, res: Response) => {
  const { name, type } = req.query; // Obtener parámetros de búsqueda

  try {
    let searchResults: { name: string, types: string[], imageUrl: string }[] = []; // Definir el tipo de la variable de resultados

    if (name) {
      // Realizar búsqueda por nombre si se proporciona el parámetro 'name'
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemonData: PokemonData = response.data;
      const imageUrl = pokemonData.sprites.front_default;
      searchResults.push({ name: pokemonData.name, types: pokemonData.types.map((type: any) => type.type.name), imageUrl });
    } else if (type) {
      // Realizar búsqueda por tipo si se proporciona el parámetro 'type'
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
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


/// Endpoint para obtener detalles completos de un Pokémon por su nombre
app.get('/pokemon/:name/details', async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    
    const pokemonData = {
      name: response.data.name,
      height: response.data.height,
      weight: response.data.weight,
      types: response.data.types.map((type: any) => type.type.name),
      abilities: response.data.abilities.map((ability: any) => ability.ability.name),
    };

    // Enviar la respuesta al frontend
    res.json(pokemonData);
  } catch (error) {
    console.error('Error al obtener detalles completos del Pokémon:', error);
    res.status(500).json({ error: 'Error al obtener detalles completos del Pokémon' });
  }
});



app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
