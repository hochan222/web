var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const history = require('connect-history-api-fallback');
const cors = require('cors');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}
app.use('/api',require('./routes/api'));
app.use(history());

app.use(express.static(path.join(__dirname, '../', 'fe', 'dist')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.send({msg:err.message})
});

const mongoose = require('mongoose');
const User = require('./models/users');

console.log(`${process.env.NODE_ENV} started!(환경변수)`);

//config파일의 db인증 불러오기
const cfg = require('../config');

mongoose.connect(cfg.dbUrl, { useNewUrlParser: true }, (err) => {
  if (err) return console.error(err);
  console.log('mongoose connected!');
  // User.deleteMany()
  //     .then(r=>console.log(r))
  //     .catch(e=>console.error(e));
})

// User.create({ name: '하하' })
//     .then(r => console.log(r))
//     .catch(e => console.error(e));

// User.find()
//     .then(r=> console.log(r))
//     .catch(e=>console.err(e));

// User.updateOne({ _id: '5c6aa9fe9c9df614184a95be'}, { $set: { age: 34 } })
//     .then(r=> {
  //       console.log(r)
  //       console.log('updated')
  //       return User.find()
  //     })
  //     .then(r => console.log(r))
  //     .catch(e=>console.err(e));
  
  // User.deleteOne({ name: '하하'})
  //     .then(r => console.log(r))
  //     .catch(e=>console.err(e));

  module.exports = app;

var jwt = require('jsonwebtoken');
const key = '베리베리어려운키';
var token = jwt.sign({ id: 'memi', email: 'memi@xxx.com' }, key);

console.log(token);

var decoded = jwt.verify(token, key);
console.log(decoded) 
//console.log(new Date(decoded.iat*1000))