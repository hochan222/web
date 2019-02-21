const mongoose = require('mongoose')
const cfg = require('../../config')

mongoose.set('useCreateIndex', true);
const userSchema = new mongoose.Schema({
  name: { type: String, default: ''},
  age: { type: Number, default: 1},
  id: { type: String, default: '', unique: true, index: true},
  pwd: { type: String, default: ''},
  retry: { type: Number, default: 0}
});

const User = mongoose.model('User', userSchema);


// User.deleteMany()
//       .then(r=>console.log(r))
//       .catch(e=>console.error(e));


module.exports = User;