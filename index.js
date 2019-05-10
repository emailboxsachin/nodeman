const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const hbs = require('express-handlebars')
const jobsRoute = require('./routes/jobs')
import {getAllJobs} from './routes/jobs'
var mongoose = require('mongoose');
const app = express()
var db = mongoose.connect('mongodb://localhost/nodeman');
const port = 3001

app.engine('hbs', hbs({extname:'hbs', defaultLayout:'layout',layoutDir:__dirname + '/views/layouts/'}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', jobsRoute.getAllJobs)
app.get('/postJobPage', jobsRoute.getPostJobPage)
app.post('/validatePostedJob', jobsRoute.validatePostedJob)
app.post('/postJob', jobsRoute.postJob)


app.listen(port)
console.log('Server running on http://localhost:'+port)