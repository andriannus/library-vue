const morgan = require('morgan');
const { json } = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const config = require('./config/config');

const PORT = process.env.PORT || config.app.port;

// MongoDB with Mongoose
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(config.db.mongoUri, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(`MongoDB: ${err}`);
  } else {
    console.log('MongoDB: Connected');
  }
});

app.use(morgan('dev'));
app.use(json());
app.use(cors());

io.on('connection', (socket) => {
  console.log('Socket.io: Connected');

  socket.on('fetch-book', () => {
    io.emit('fetch-book');
  });
});

// Load Controller files
const auth = require('./controllers/Auth');
// const user = require('./controllers/User');
const book = require('./controllers/Book');

app.use('/api/v1/auth', auth);
// app.use('/api/v1/user', user);
app.use('/api/v1/book', book);

http.listen(PORT, () => console.log(`App running in port ${PORT}`));
