// User Controller

module.exports = function(System){
	// Modules
	var mongoose = require('mongoose'),
		User = require('../models/user')(System);
		$thisUser = {};

	// Create user
	$thisUser.create = function(req, res){
		System.log.info('Create user attempt...');
		var user = new User(req.body);

		// toDo: Improvise success vs. error responses as system helpers
		user.save(function(err, user){
			if (err) {
				System.log.error({error: err});
				return res.send(err);
			}
			System.log.info('User created');
			res.send(user);
		});

	};

	return $thisUser;
}