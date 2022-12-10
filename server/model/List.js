const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const listSchema = mongoose.Schema({
  id: {
    type: String,
  },
  nickname: {
    type: String,
  },
  title: {
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  content: {
    type: String,
    minlength: 5,
  },
  date: {
    type: Date,
  },
  postnum: {
    type: Number,
  },
  email: {
    type: String,
  },
  like: {
    type: Number,
  },
  hate: {
    type: Number,
  },
  role: {
    type: Number,
    default: 1,
  },
  image: {
    type: String,
  },
});

// listSchema.pre('save', function (next) {
//   let list = this;
//   if (user.isModified('password')) {
//     bcrypt.genSalt(saltRounds, (err, salt) => {
//       bcrypt.hash(user.password, salt, (err, hash) => {
//         if (err) return next(err);
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     next();
//   }
// });

// listSchema.methods.comparePassword = function (plainPassword, cb) {
//   bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

// listSchema.methods.genToken = function (cb) {
//   let user = this;
//   let token = jwt.sign(
//     {
//       id: user.id,
//       username: user.name,
//       email: user.email,
//     },
//     process.env.SECRET_CODE,
//     {
//       expiresIn: '10m',
//       issuer: 'About Tech',
//     }
//   );
//   user.token = token;
//   user.save((err, user) => {
//     if (err) return cb(err);
//     cb(null, user);
//   });
// };

// userSchema.statics.findByToken = function (token, cb) {
//   let user = this;
//   //token decode==token에 어떤것을 넣었는지에 따라 decoded에서 뽑아내야함
//   jwt.verify(token, process.env.SECRET_CODE, function (err, decoded) {
//     user.findOne({ id: decoded.id, token: token }, (err, user) => {
//       if (err) return cb(err);
//       cb(null, user);
//     });
//   });
// };

const List = mongoose.model('List', listSchema);

module.exports = { List };
