import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { pool } from './database';
import { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dev platforms API',
      version: '1.0.0',
      description: 'A simple API for managing users and posts',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: ['../src/routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    //Will show GET etc and the URL
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error occurred:', err.message);

  res.status(500).json({
    error: 'Internal server error',
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Something went wrong',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
