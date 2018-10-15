const { Router } = require('express');
const { forEach } = require('lodash');

const Book = require('../models/BookSchema');

const router = Router();

router.get('/', (req, res) => {
  Book.find()
    .exec((err, books) => {
      if (err) {
        res.status(200).send({
          status: 500,
          success: false,
          message: err,
        });
      } else {
        res.status(200).send({
          status: 200,
          success: true,
          message: 'Get a list of books',
          data: books,
        });
      }
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Book.findById(id)
    .exec((err, book) => {
      if (err) {
        res.status(200).send({
          status: 500,
          success: false,
          message: err,
        });
      }

      if (book == null) {
        res.status(200).send({
          status: 404,
          success: false,
          message: 'Book cannot be found',
        });
      } else {
        res.status(200).send({
          status: 200,
          success: true,
          message: 'Get a book',
          data: book,
        });
      }
    });
});

router.post('/', (req, res) => {
  const newBook = new Book();

  forEach(req.body, (value, index) => {
    newBook[index] = value;
  });

  newBook.save((err, book) => {
    if (err) {
      res.status(200).send({
        status: 500,
        success: false,
        message: err,
      });
    } else {
      res.status(200).send({
        status: 201,
        success: true,
        message: 'Book has been created',
        data: book,
      });
    }
  });
});

router.post('/update', (req, res) => {
  const {
    id, name, author, publisher, page, isbn,
  } = req.body;

  Book.findByIdAndUpdate(id,
    {
      name, author, publisher, page, isbn,
    },
    { new: true }, // Callback updated book
    (err, updatedBook) => {
      if (err) {
        res.status(200).send({
          status: 500,
          success: false,
          message: err,
        });
      }

      res.status(200).send({
        status: 200,
        success: true,
        message: 'Book has been updated',
        data: updatedBook,
      });
    });
});

router.post('/delete', (req, res) => {
  const { id } = req.body;

  Book.findOneAndDelete(id, (err) => {
    if (err) {
      res.status(200).send({
        status: 404,
        success: false,
        message: err,
      });
    }

    res.status(200).send({
      status: 200,
      success: true,
      message: 'Book has been deleted',
    });
  });
});

module.exports = router;
