const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const hbs = require('express-handlebars')
var mongoose = require('mongoose');
const app = express()
var db = mongoose.connect('mongodb://localhost/nodeman');

app.engine('hbs', hbs({extname:'hbs', defaultLayout:'layout',layoutDir:__dirname + '/views/layouts/'}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req,res,next)=>{
	res.render('index')
})



app.use('/projectSupport',  require('./routes/project-support'))

app.use('/projectholder',  require('./routes/project-holder'))

app.use('/project',  require('./routes/project'))

app.listen(3000)
console.log('Server running on http://localhost:3000')