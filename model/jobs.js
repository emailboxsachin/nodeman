var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ProjectSupportSchema = new Schema({
  name:String,
  place:String,
  personincharge:String,
  address1:String,
  address2:String,
  phone:Number,
  email:String,
  timeStamp:{type:Date,default:Date.now},
  user:String
})
module.exports = mongoose.model('ProjectSupport',ProjectSupportSchema)