const { Router } = require('express');
const router = Router();
const _ = require('lodash');

const books = require('../books.json');
const authors = require('../authors.json');

router.get('/books', (req, res) => {
  // assign  permite agregar atributos anidados
  _.each(books, (book) => {
    _.each(authors, (author) => {
      if (book.authorId == author.id) {
        Object.assign(book, { author });
      }
    });
  });
  res.json(books);
});

router.post('/books', (req, res) => {
  const { name, authorId } = req.body;
  if (name && authorId) {
    const newBook = { ...req.body };
    books.push(newBook);
    res.json({ added: 'ok' });
  } else {
    res.status(400).json({ statuscode: 'bad request' });
  }
});

router.delete('/books/:id', (req, res) => {
  const id = req.params.id;

  _.remove(books, (book) => {
    // el remove permite iterar un array
    return book.id == id;
  });
  res.json(books);
});

router.put('/books/:id', (req, res) => {
  const id = req.params.id;
  const { name, authorId } = req.body;
  _.each(books, (book) => {
    if (book.id == id) {
      book.name = name;
      book.authorId = authorId;
    }
  });
  res.json({ modified: 'ok' });
});

module.exports = router;
