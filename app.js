var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql=require("mysql");
var index = require('./routes/index');
var users = require('./routes/users');
var http=require("http");
var cors=require("cors")
var myConnection=require('express-myconnection');
var app = express();
app.use(cors());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root1234',
  multipleStatements: true

});
app.set("connection",connection);
app.set('port', process.env.PORT || 3100);
console.log(app.use)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var login=require('./routes/login');
app.use('/', index);
app.use('/users', users);
app.use("/login",login);
app.use("/signup",require('./routes/signup'));
app.use('/update',require('./routes/update'));

connection.query('CREATE DATABASE IF NOT EXISTS test', function (err) {
  if (err) throw err;
  connection.query('USE test', function (err) {
      if (err) throw err;
      connection.query('CREATE TABLE IF NOT EXISTS users('
          + 'id INT NOT NULL AUTO_INCREMENT,'
          + 'PRIMARY KEY(id),'
          + 'name VARCHAR(30),password text,uniqueid varchar(30),phone varchar(20),referralId varchar(30),email varchar(100) NOT NULL UNIQUE'
          +  ');', function (err) {
              if (err) throw err;
          });
  });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("4")
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.log("here")
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Listening on port ' + app.get('port'));
});
module.exports = app;
