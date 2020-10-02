require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const _handlebars = require('handlebars');

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

var sessions = require('express-session');
var session;

//to request body data
const bodyParser = require('body-parser');

const jobController = require('./controllers/jobController');

var app = express();
//middleware to use body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
//to convert into json we call the app.use function again with body parser
app.use(bodyParser.json());

//to hide password
app.use(sessions({
    secret: "$^%@^&^&^**@^&%*&*ghgjsdj@^&^",
    resave: false,
    saveUninitialized:true
}));

//for handlebars
//base path file to join from directories
//app.set('views',path.join(__dirname), '../views/');
app.set('views', path.join(__dirname, '/views/'));



//to configure express handlebar functions we need to set engine
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout',
hbs: allowInsecurePrototypeAccess(_handlebars),
 layoutsDir: __dirname + '/views/layouts/' }));
  

    //set the engine
    app.set('view engine','hbs');

app.listen(8080,() => {
    console.log("express server started at port 3000");
});

//calling jobController
//middleware
app.use('/jobs',jobController);


//ADMIN LOGIN
