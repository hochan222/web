var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/users');

router.get('/', function(req, res, next) {
  
  User.find()
  .then(r=> {
    res.send({ success: true, users: r});
  })
  .catch(e=> {
    res.send({ success: false })
  });

});

router.post('/', (req, res, next) => {
  //post는 body에 넘겨줌
  const {name, age, id} = req.body;
  const u = new User({
    name,
    age,
    id
  });
  u.save()
   .then(r => {
     res.send({success: true, msg: r});
   })
   .catch(e=> {
    res.send({ success: false , message: e})
  });
});

router.put('/:id', (req, res, next) => {
  console.log(req.params)
  const id = req.params.id;
  const {name, age} = req.body;
  User.updateOne({_id: id}, {$set: {name, age}})
      .then(r => {
         res.send({success: true, msg: r});
       })
       .catch(e=> {
        res.send({ success: false , message: e})
      });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  User.deleteOne({_id: id})
  .then(r => {
     res.send({success: true, msg: r});
   })
   .catch(e=> {
    res.send({ success: false , message: e})
  });
});

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어요'));
});

module.exports = router;
