var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const jwt = require('jsonwebtoken');
const cfg = require('../../../config');

router.use('/sign', require('./sign'));

const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    jwt.verify( t, cfg.secretKey, (err, t) => {
      if(err) reject(err);
      resolve(t);
    });
  });
};

//middleWare
router.all('*', function(req, res, next) {
  const token = req.headers.authorization;
  verifyToken(token)
    .then(v => {
      console.log(v);
      next()
    })
    .catch(e => res.send({success: false, msg: e.message}))
});

router.use('/test', require('./test'));
router.use('/user', require('./user'));
router.use('/sign', require('./sign'));

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어요'));
});

module.exports = router;
