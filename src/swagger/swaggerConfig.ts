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
  apis: ['./server.ts'], // Ruta donde se encuentran tus definiciones de endpoints
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec }; // Exporta swaggerSpec como un módulo nombrado
