import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokémon API',
      version: '1.0.0',
      description: 'API para acceder a datos de Pokémon.',
    },
  },
  apis: ['./src/routes/pokemonRoutes.ts'], // Verifica que esta ruta sea correcta
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec }; // Exporta swaggerSpec como un módulo nombrado
