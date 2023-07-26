import express from 'express';
import path from 'path'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Your API description',
    },
    servers: [
      {
        url: 'http://localhost:4001',
      },
    ],
  },
  apis: [
    path.join(__dirname, './routes/costs.routes.ts'),
    path.join(__dirname, './routes/sales.routes.ts'),
    path.join(__dirname, './routes/auth.routes.ts'),
    // Add more route files if needed
  ],
};

const specs = swaggerJsdoc(options);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs));

export default router;
