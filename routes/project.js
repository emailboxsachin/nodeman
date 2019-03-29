const express = require('express')
const router = express.Router()
var project= require('../model/project')
// let phcache = require('../lib/project-holder')
// let projcache = require('../lib/project')

router.get('/',(req,res,next)=>{
	if(req.query.action){
		if(req.query.action == 'new'){
			res.render('project-new', {phc:phcache.phCacheArray})
		}else if(req.query.action == 'edit'){

		}
	}else{
		res.render('project',{title:'project',project:projcache.prCacheArray})
	}
	
})

router.post('/new',(req,res,next)=>{
	const body = req.body
	body.user = req.session.user
	if(body !== null){
		//save in db
		console.log(req.route+JSON.stringify(body))
		project.create(body,function(err,proj){
			if(err){
				res.send(JSON.stringify(err))
			}else{
				projcache.updateProjectHolderCache()
				console.log('inserted data'+proj)
				res.redirect('/project')
			}
		})
	}
})



module.exports = router