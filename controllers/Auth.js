const { forEach } = require('lodash');
const jwt = require('jsonwebtoken');
const { Router } = require('express');

const config = require('../config/config');
const User = require('../models/UserSchema');

const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .exec((err, user) => {
      if (err) {
        res.status(200).send({
          status: 500,
          success: false,
          message: err,
        });
      } else if (!user) {
        res.status(200).send({
          status: 404,
          success: false,
          message: 'User not found',
        });
      } else {
        user.comparePassword(password, (fault, isMatch) => {
          if (fault) {
            res.status(200).send({
              status: 500,
              success: false,
              message: fault,
            });
          }

          if (!isMatch) {
            res.status(200).send({
              status: 401,
              success: false,
              message: 'Password does not match',
            });
          } else {
            jwt.sign(
              { email, password },
              config.jwt.secretKey,
              { expiresIn: config.jwt.expiresIn },
              (fail, token) => {
                if (fail) {
                  res.status(200).send({
                    status: 500,
                    success: false,
                    message: fail,
                  });
                }

                res.status(200).header('t-t', token).send({
                  status: 200,
                  success: true,
                  message: 'Login successful',
                  user,
                  token,
                });
              },
            );
          }
        });
      }
    });
});

router.post('/register', (req, res) => {
  const newUser = new User();

  forEach(req.body, (value, index) => {
    newUser[index] = value;
  });

  newUser.save((err, user) => {
    if (err) {
      res.status(200).send({
        status: 500,
        success: false,
        message: err,
      });
    }

    res.status(200).send({
      status: 201,
      success: true,
      message: 'Successful registration',
      data: user,
    });
  });
});

module.exports = router;
