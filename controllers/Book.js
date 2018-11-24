const { forEach } = require('lodash');
const { Router } = require('express');
const { isAuthenticated } = require('../middleware/Authentication');

const Book = require('../models/BookSchema');

const router = Router();

router.get('/', (req, res) => {
  const search = req.query.search || '';
  const fullUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
  const perPage = 5;
  const page = req.query.page || 1;

  Book
    .find(search !== '' ? { name: { $regex: search, $options: 'i' } } : {})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort({ date: -1 })
    .exec((err, books) => {
      if (err) {
        res.status(200).send({
          status: 500,
          success: false,
          message: err,
        });
      } else {
        Book.countDocuments()
          .exec((fault, count) => {
            if (fault) {
              //
            } else {
              const total = Math.round(count / perPage);

              res.status(200).send({
                status: 200,
                success: true,
                message: 'Get a list of books',
                data: books,
                links: {
                  first: `${fullUrl}?page=1`,
                  last: total > page ? `${fullUrl}?page=${total}` : `${fullUrl}?page=1`,
                  prev: page - 1 !== 0 ? `${fullUrl}?page=${page - 1}` : null,
                  next: total > page ? `${fullUrl}?page=${parseInt(page, 10) + 1}` : null,
                },
                meta: {
                  currentPage: page,
                  from: 1,
                  lastPage: total > page ? total : 1,
                  path: fullUrl,
                  perPage,
                  to: count,
                  total: count,
                },
              });
            }
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

router.post('/checkIsbn', (req, res) => {
  const { isbn } = req.body;

  Book.findOne({ isbn })
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
          status: 200,
          success: true,
          message: 'ISBN can be used',
        });
      } else {
        res.status(200).send({
          status: 200,
          success: false,
          message: 'ISBN cannot be used',
        });
      }
    });
});

router.post('/', isAuthenticated, (req, res) => {
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

router.post('/update', isAuthenticated, (req, res) => {
  const {
    _id, name, author, publisher, page, isbn,
  } = req.body;

  Book.findByIdAndUpdate(_id,
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

router.post('/delete', isAuthenticated, (req, res) => {
  const { id } = req.body;

  Book.findByIdAndDelete(id, (err) => {
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
