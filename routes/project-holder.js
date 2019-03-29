const express = require('express')
const router = express.Router()
var ph= require('../model/project-holder')
// let pscache = require('../lib/project-support')
// let phcache = require('../lib/project-holder')

router.get('/',async (req,res,next)=>{
	if(req.query.psid){
		ph.find({projectSupportId:req.query.psid}).sort({timeStamp: 'desc'}).select('_id name email address1').exec((err,ph)=>{
			if(err){
				res.send('error occured' + JSON.stringify(err))
			}else{
				res.render('project-holder',{title:'project Holder', psid:req.query.psid, projectholder:ph})	
			}
		})		
	}
})

router.post('/new',(req,res,next)=>{
	const body = req.body
	body.user = req.session.user
	if(body !== null){
		//save in db
		console.log(JSON.stringify(body))
		ph.create(body,function(err,projholder){
			if(err){
				res.send('error')
			}else{
				console.log('inserted data'+projholder)
				res.redirect('/projectholder?psid='+body.projectSupportId)
			}
		})
	}
})



module.exports = router