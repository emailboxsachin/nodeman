var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ProjectSchema = new Schema({
  name:String,
  projectHolderId: Schema.Types.ObjectId,
  location:String,
  projectDirector:String,
  directorPhone:Number,
  directorEmail:String,
  coordicator:String,
  coordicatorPhone:Number,
  coordicatorEmail:String,
  socialWorker:String,
  socialWorkerPhone:Number,
  socialWorkerEmail:String,
  quota:Number,
  numberOfChildren:Number,  
  timeStamp:{type:Date,default:Date.now},
  user:String
})
module.exports = mongoose.model('Project',ProjectSchema)