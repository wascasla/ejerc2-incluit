const { Router } = require('express');
const router = Router();
const _ = require('lodash');

const authors = require('../authors.json');
const books = require('../books.json');

//get all authors
router.get('/authors', (req, res) => {
  res.json(authors);
});

router.post('/authors', (req, res) => {
  const { name, lastname } = req.body;
  if (name && lastname) {
    const newAuthor = { ...req.body };
    authors.push(newAuthor);
    res.json({ added: 'ok' });
  } else {
    res.status(400).json({ statuscode: 'bad request' });
  }
});

router.delete('/authors/:id', (req, res) => {
  const id = req.params.id;

  _.each(books, (book) => {
    if (book.authorId == id) {
      res.status(400).json({
        mensaje:
          'No se puede eliminar el autor por que exiten libros del mismo',
      });
    } else {
      _.remove(authors, (author) => {
        // el remove permite iterar un array
        return author.id == id;
      });
    }
  });

  res.json(authors);
});

router.put('/authors/:id', (req, res) => {
  const id = req.params.id;
  const { name, lastname } = req.body;
  _.each(authors, (author) => {
    if (author.id == id) {
      author.name = name;
      author.lastname = lastname;
    }
  });
  res.json({ modified: 'ok' });
});

module.exports = router;
