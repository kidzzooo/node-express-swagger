const { books } = require('../models/bookModel');

exports.getBooks = (req, res) => {
  res.json(books);
};

exports.getBook = (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
};

exports.createBook = (req, res) => {
  const { id, title, author } = req.body;
  if (!id || !title || !author) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newBook = { id, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
};

exports.updateBook = (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  books[index] = { ...books[index], ...req.body };
  res.json(books[index]);
};

exports.deleteBook = (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  const deleted = books.splice(index, 1)[0];
  res.json({ message: 'Book deleted', book: deleted });
};
