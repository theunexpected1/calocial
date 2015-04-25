
// Modules ========================================
var express = require('express'),
	app = express(),
	bunyan = require('bunyan'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	dbConfig = {
		url: 'mongodb://localhost/calocial'
	},
	System = {
		app: app,
		express: express,
		log: bunyan.createLogger({name: 'calocial'})
	},
	port = process.env.PORT || 8080;


// Configurations =================================

// parse application/json 
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// set the static files location 
// /public/img will be /img for users
app.use('/', express.static(__dirname + '/public'));
app.use('/modules', express.static(__dirname + '/modules'));

// Database
db = mongoose.connect(dbConfig.url);

// Routes
require('./modules/system/server/routes/system')(System);

// Connect to database
mongoose.connection.on('open', function(){
	console.log('DB connected...');

});

// Start the application at localhost:port
app.listen(port);
console.log('App started at http://localhost:' + port);