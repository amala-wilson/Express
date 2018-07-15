var express = require("express");
var session = require("express-session");
var path = require("path");
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + "/static"));
app.use(session({secret: 'codingdojorocks'}));  // string for encryption
app.use(bodyParser.urlencoded({extended: true}));

// app.use(function(req,res,next){
//     console.log("THIS IS THE FIRST MIDDLEWARE HIT");
//     next();
// });

// app.get("/users", function(req,res){
//     console.log("THIS HIT THE USERS");
// });

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  var sess = request.session;
  if(sess.count != undefined){
      sess.count += 1;
  }
  else{
      sess.count = 1;
  }
  response.render('counter', {count:sess.count})
});

app.post('/addByTwo', function(request, response) {
    var sess = request.session;
    if(sess.count != undefined){
        sess.count += 1;
    }
    else{
        sess.count = 1;
    }
    response.redirect('/');
});

app.post('/reset', function(request, response) {
    var sess = request.session;
    if(sess.count != 0){
        sess.count = 0;
    }
    response.redirect('/');
});


app.listen(8000, function() {
  console.log("listening on port 8000");
})
