const jwt = require('jsonwebtoken');
const config = require('../config/config');

const isAuthenticated = (req, res, next) => {
  const token = req.headers['t-t'];

  if (token) {
    jwt.verify(token, config.jwt.secretKey, (err) => {
      if (err) {
        res.status(500).send({
          status: 500,
          success: false,
          message: 'Token expired',
        });
      } else {
        next();
      }
    });
  } else {
    res.status(500).send({
      status: 404,
      success: false,
      message: 'Token not found',
    });
  }
};

module.exports.isAuthenticated = isAuthenticated;
