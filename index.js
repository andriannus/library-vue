const express = require('express');
const morgan = require('morgan');
const { json } = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');

// MongoDB with Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.db.mongoUri, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(`MongoDB: ${err}`);
  } else {
    console.log('MongoDB: Connected');
  }
});

const PORT = process.env.PORT || config.app.port;
const app = express();

app.use(morgan('dev'));
app.use(json());
app.use(cors());

// Load Controller files
// const auth = require('./controllers/Auth');
// const user = require('./controllers/User');
const book = require('./controllers/Book');

// app.use('/api/v1/auth', auth);
// app.use('/api/v1/user', user);
app.use('/api/v1/book', book);

app.listen(PORT, () => console.log(`App running in port ${PORT}`));
