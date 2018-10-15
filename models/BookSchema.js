const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  name: String,
  author: String,
  publisher: String,
  page: Number,
  isbn: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
