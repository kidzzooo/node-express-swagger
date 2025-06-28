# 📘 Swagger Integration with Express.js

This repository demonstrates how to **integrate Swagger (OpenAPI 3.0)** documentation into a **Node.js + Express** application using **JSDoc comments** and `swagger-jsdoc` / `swagger-ui-express`.

## 🎯 Goal

To show how to document an Express API using Swagger by annotating route files with JSDoc comments and serving the Swagger UI through Express.

---

## 📦 Stack

* **Express.js** – Web framework
* **Swagger UI Express** – To serve the Swagger docs
* **Swagger JSDoc** – To generate OpenAPI spec from JSDoc
* **Nodemon** (optional) – For auto-restarting in development

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/node-swagger.git
cd node-swagger
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

```bash
node index.js
```

Or, during development:

```bash
npx nodemon index.js
```

---

## 🌐 Access the API Docs

Once the server is running, navigate to:

```
http://localhost:3000/api-docs
```

This opens an interactive Swagger UI generated from the JSDoc comments in your code.

---

## 🗂️ Project Structure

```
.
├── controllers/            # Request handlers
│   └── bookController.js
├── models/                 # In-memory data storage
│   └── bookModel.js
├── routes/                 # Route definitions with Swagger annotations
│   └── bookRoutes.js
├── index.js                # Entry point: Swagger + Express setup
├── package.json
```

---

## 🔧 Swagger Setup Overview

In `index.js`, we configure Swagger like this:

```js
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Management API with JSDoc',
      version: '1.0.0',
      description: 'A simple API for managing books, documented with JSDoc.',
    },
    servers: [{ url: 'http://localhost:3000/api' }],
    components: {
      schemas: {
        Book: {
          type: 'object',
          required: ['id', 'title', 'author'],
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            author: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./routes/bookRoutes.js'],
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

---

## 📝 Documenting Routes with JSDoc

In `routes/bookRoutes.js`, routes are annotated like this:

```js
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 */
router.get('/', bookController.getBooks);
```

The `@swagger` tags are parsed by `swagger-jsdoc` to generate the OpenAPI spec.

---

## 📚 Example API Endpoint

**GET /api/books**

Returns all books.

```json
[
  {
    "id": 1,
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien"
  }
]
```

---



