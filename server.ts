import express from 'express';
import cors from 'cors';
import  pokemonRoutes from './src/routes/pokemonRoutes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './src/swagger/swaggerConfig';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/pokemon', pokemonRoutes);

app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

});
