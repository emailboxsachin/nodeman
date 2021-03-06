var model= require('../model/jobs')

module.exports.getAllJobs = function(req,res,next){
	model.find({}).sort({published: 'desc'}).exec((err,data)=>{	
		if(err){
			res.send('error occured' + JSON.stringify(err))
		}else{
			res.render('jobs',{jobs:data})	
		}
	})
}

module.exports.getPostJobPage = function(req,res,next){
	res.render('postJobsPage')	
}

module.exports.validatePostedJob = function(req,res,next){
	console.log('body '+JSON.stringify(req.body))
	req.body.details.trim()
	res.render('postJobsPage',{postedJob:req.body})	
}

module.exports.postJob = function(req,res,next){
	console.log('body '+JSON.stringify(req.body))
	model.create(req.body,function(err,job){
		if(err){
			res.send('error')
		}else{
			console.log('inserted data'+job)
			res.redirect('/')
		}
	})
}



