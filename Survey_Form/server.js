// Importing Node Modules
var express = require('express');  // require express
var bodyParser = require('body-parser');  // require body-parser
var session = require("express-session");  // require session
var path = require('path');  // require path

var app = express();  // creates the express app

// Using the Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({secret: 'codingdojorocks'}));  // string for encryption

// Setting up ejs and our views folder
app.set('views',path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Getting the home page
app.get('/', function(request, response){
    response.render("homePage");
});

// Getting the survey form data
app.post('/survey', function(request, response){
    request.session.name = request.body.myName;
    request.session.location = request.body.location;
    request.session.language = request.body.language;
    request.session.comment = request.body.myComment;
    response.redirect('/result');
});

app.get('/result', function(request, response){
    console.log("Displaying the results");
    response.render('result',{name:request.session.name, location:request.session.location, favLang:request.session.language, comment:request.session.comment});
});

// Informing the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});