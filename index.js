
// Modules ========================================
var express = require('express'),
	app = express(),
	bunyan = require('bunyan'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	expressSession = require('express-session'),
	fs = require('fs'),
	dbConfig = {
		url: 'mongodb://localhost/calocial'
	},
	System = {
		app: app,
		express: express,
		helpers: {},
		log: bunyan.createLogger({name: 'calocial'})
	},
	port = process.env.PORT || 8080;

// Paths
var helperPath = './modules/system/server/helpers/';

// Configurations =================================

// Load Helpers
var helperFiles = fs.readdirSync(helperPath);
helperFiles.forEach(function(helperFile){
	if(helperFile.indexOf('.js') > -1) {
		var helper = require(helperPath + helperFile)(System);
		System.helpers[helper.key] = helper.module;
	}
});

// Middlewares
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded
app.use('/', express.static(__dirname + '/public')); // set the static files location
app.use('/modules', express.static(__dirname + '/modules'));
app.use(expressSession({secret: 'calocial'}));
app.use(passport.initialize()); // Middleware for user authentication / passport
app.use(passport.session());

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