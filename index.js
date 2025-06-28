const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Management API with JSDoc',
      version: '1.0.0',
      description: 'A simple API for managing books, documented with JSDoc.',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Book: {
          type: 'object',
          required: ['id', 'title', 'author'],
          properties: {
            id: {
              type: 'integer',
              description: 'The unique ID of the book',
              example: 1,
            },
            title: {
              type: 'string',
              description: 'The title of the book',
              example: 'The Hobbit',
            },
            author: {
              type: 'string',
              description: 'The author of the book',
              example: 'J.R.R. Tolkien',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/bookRoutes.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
