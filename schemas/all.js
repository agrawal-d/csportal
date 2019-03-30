var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Schemas = {};
Schemas.users = new Schema({
  googleid: String,
  name: String,
  date: { type: Date, default: Date.now },
  image: String,
  email: String,
  admin: Number,
  special: String

})
Schemas.materials = new Schema({
  name: String,
  date: { type: Date, default: Date.now },
  user: String,
  verified: Boolean
})

Schemas.questions = new Schema({
  question: String,
  user: String,
  upvotes: Number,
  downvotes: Number,
  date: { type: Date, default: Date.now },
  material: String
})

Schemas.answers = new Schema({
  code: String,
  descreption: String,
  language: String,
  user: String,
  upvotes: Number,
  date: { type: Date, default: Date.now },
  downvotes: Number,
  question: String,
})

module.exports = Schemas;