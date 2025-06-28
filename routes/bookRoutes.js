const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing a collection of books
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server error
 */
router.get('/', bookController.getBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retrieve a single book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to retrieve
 *     responses:
 *       200:
 *         description: The requested book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.get('/:id', bookController.getBook);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book to the collection
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - title
 *               - author
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: The Hobbit
 *               author:
 *                 type: string
 *                 example: J.R.R. Tolkien
 *     responses:
 *       201:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/', bookController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update an existing book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *             example:
 *               title: The Silmarillion
 *               author: J.R.R. Tolkien
 *     responses:
 *       200:
 *         description: The book was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.put('/:id', bookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to delete
 *     responses:
 *       200:
 *         description: The book was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book deleted
 *                 book:
 *                   $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', bookController.deleteBook);

module.exports = router;
