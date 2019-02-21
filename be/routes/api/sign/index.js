var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const jwt = require('jsonwebtoken');
const cfg = require('../../../../config');
const User = require('../../../models/users');

const signToken = (id,age) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id, age }, cfg.secretKey, (err, token) => {
      if(err) reject(err);
      resolve(token);
    });
  });
};

// User.findOne({id: 'egas'})
//      .then(r=> console.log(r))
//      .catch(e=>console.err(e));

router.post('/in', function(req, res, next) {
  console.log(req.body);
  const { id, pwd } = req.body;
  if( !id ) return res.send({ success: false, msg: '아이디를 입력해주세요'});
  if( !pwd ) return res.send({ success: false, msg: '비밀번호를 입력해주세요'});
  
 // console.log( {id })
  //console.log(User.find())

console.log({id}.id === {id:'egas'})
console.log({id});
User.findOne({ id: {id}.id })
     .then(r=> console.log(r))
     .catch(e=>console.err(e));


  User.findOne({ id: {id}.id })
  .then((r) => {
    if (!r) throw new Error('존재하지 않는 아이디입니다.');
    if (r.pwd !== pwd) throw new Error('비밀번호가 맞지 않습니다.');
    return signToken(r.id, r.age);
  })
  .then((r) => {
    res.send({ success: true, token: r})
  })
  .catch((e) => {
    res.send({ success: false, msg: e.message})
  }) 

});

router.post('/out', function(req, res) {
  res.send({ success: false, msg: '아직 준비 안됨.'});
});

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어요'));
});

module.exports = router;
