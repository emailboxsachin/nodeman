const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const hbs = require('express-handlebars')
const app = express()
const session = require('express-session');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/hcdi');

app.engine('hbs', hbs({extname:'hbs', defaultLayout:'layout',layoutDir:__dirname + '/views/layouts/'}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({secret: '2C44-4D44-WppQ38S'}));

const users = { 
	'sachin': { password: 'sachin',admin:false }, 
	'shilpa':{password:'shilpa',admin:true}
};
var auth = function(req, res, next) {
  if (req.session && req.session.user)
    return next();
  else
    return res.redirect('/login');
};

// Login endpoint
app.get('/login', function (req, res) {
  res.render('login')
});
app.post('/loginpost',(req,res,next)=>{
	const user = req.body.userName
	const password = req.body.password
	if(user && password && user!== '' && password !== ''){
		console.log('/loginpost ' + user + '-' + password)
		if (user && users[user] && users[user].password == password) {
			req.session.user = user;
    		req.session.admin = users[user].admin;
    		res.redirect('/projectsupport')
		}else{
			res.status(401).send('<html><a href="/login">Login Failed</a></html>')
		}
	}else{
		console.log('/loginpost ' + user + '-' + password)
		res.status(401).send('<html><a href="/login">Login Failed</a></html>')
	}
	
})
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/', (req,res,next)=>{
	res.render('index')
})

// app.use('/projectSupport', auth, require('./routes/project-support'))

// app.use('/projectholder', auth, require('./routes/project-holder'))

// app.use('/project', auth, require('./routes/project'))

app.use('/projectSupport',  require('./routes/project-support'))

app.use('/projectholder',  require('./routes/project-holder'))

app.use('/project',  require('./routes/project'))

app.listen(3000)
console.log('Server running on http://localhost:3000')