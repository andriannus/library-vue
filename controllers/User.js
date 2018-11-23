// const { forEach } = require('lodash');
// const jwt = require('jsonwebtoken');
const { Router } = require('express');

// const config = require('../config/config');
const User = require('../models/UserSchema');
const { isAuthenticated } = require('../middleware/Authentication');

const router = Router();

router.post('/updateName', isAuthenticated, (req, res) => {
  const { _id, name } = req.body;

  User.findByIdAndUpdate(_id, { name }, { new: true }, (err, updatedName) => {
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
      message: 'Name has been updated',
      user: updatedName,
    });
  });
});

router.post('/updateUsername', isAuthenticated, (req, res) => {
  const { _id, username } = req.body;

  User.findByIdAndUpdate(_id, { username }, { new: true }, (err, updatedUsername) => {
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
      message: 'Username has been updated',
      user: updatedUsername,
    });
  });
});

module.exports = router;
