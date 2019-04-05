var mongoose = require('mongoose')
var Schema = mongoose.Schema
var JobSchema = new Schema({
  title:String,
  phone:String,
  email:String,
  details:String,
  published:{type:Date,default:Date.now},
})
module.exports = mongoose.model('Job',JobSchema)