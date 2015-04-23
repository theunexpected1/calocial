
// Modules ========================================
var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	port = process.env.PORT || 8080;


// Configurations =================================

// parse application/json 
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Database
	dbConfig = {
		url: 'mongodb://localhost/calocial'
	},
	db = mongoose.connect(dbConfig.url);

// Connect to database
mongoose.connection.on('open', function(){
	console.log('DB connected...');

});

// Start the application at localhost:port
app.listen(port);
console.log('App started at http://localhost:' + port);