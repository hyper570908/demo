var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var settings = require('./settings');
var routes = require('./routes/index');
//Jason add mosca server test
var mosca = require("mosca");

var app = express();
var mqtt = require('mqtt');
var hostname = 'localhost';
var portNumber = 1884;
var mytopic= 'mqtt';
var options = {
    port:portNumber,
    host: hostname,
	protocolId: 'MQIsdp',
	protocolVersion: 3
};
var UserModel = require('./models/user.js');

var client = mqtt.connect(options);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.static(path.dirname(require.resolve("mosca")) + "/public"))

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  resave: false,
  saveUninitialized: true
}));

routes(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
console.log('settings.cookieSecret : '+settings.cookieSecret);
console.log('settings.db : '+settings.db);

client.on('connect', function()  {
	console.log('Connect to mqtt topic:'+mytopic);
  	client.subscribe(mytopic);
});

client.on('message', function(topic, message) {
	console.log('topic:'+topic.toString());
	console.log('message:'+message.toString());
	var obj = JSON.parse(message);
	//console.log('name:'+obj.name +" , age : "+obj.age);
	var newUser = new UserModel({
		name 	  : obj.name,
		age 	  : obj.age,
		created_at: new Date()
	});
	newUser.save(function(error){
		if(error){
			console.log('DB save fail!');
		}	
		console.log('DB save success!');
	});
	
});

//Jason modify on 2016.05.23
//app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//module.exports = app;
