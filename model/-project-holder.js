var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ProjectHolderSchema = new Schema({
  name:String,
  projectSupportId: Schema.Types.ObjectId,
  place:String,
  address1:String,
  address2:String,
  phone:Number,
  email:String,
  timeStamp:{type:Date,default:Date.now},
  user:String
})
module.exports = mongoose.model('ProjectHolder',ProjectHolderSchema)