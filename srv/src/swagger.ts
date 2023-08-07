import express from 'express';
import path from 'path'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação API Storeadmin',
      version: '1.0.0',
      description: 'Descrição',
    },
    servers: [
      {
        url: 'http://localhost:4001',
      },
    ],
  },
  apis: [
    path.join(__dirname, './routes/auth.routes.ts'),
    path.join(__dirname, './routes/costs.routes.ts'),
    path.join(__dirname, './routes/sales.routes.ts'),
    path.join(__dirname, './routes/purchases.routes.ts'),
    path.join(__dirname, './routes/categories.routes.ts'),
    path.join(__dirname, './routes/products.routes.ts'),
    path.join(__dirname, './routes/units.routes.ts'),
    // Add more route files if needed
  ],
};

const specs = swaggerJsdoc(options);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs));

export default router;
