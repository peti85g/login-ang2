var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');

const config = require('./config/database');

//connecting mongoose with the app
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database : ' + config.database);
});

 //on error to connecting to database
 mongoose.connection.on('error', (err) => {
    console.log('Error in connection to database : ' + err);
});

var app = express();

const users = require('./routes/users');

//port number
const port = 3000;

//CORS middleware
app.use(cors());

//setting static folder route
app.use(express.static(path.join(__dirname, 'public')));


//body-parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//passport
require('./config/passport')(passport);

//set user to the users folder
app.use('/users', users);

//Index route
app.get('/', function(req, res){
    res.send('invalid entry point');
});

//start server
app.listen(port, () => {
    console.log("Server started at port: " + port)
}); 
