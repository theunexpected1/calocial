// User Controller

module.exports = function(System){
	// Modules
	var mongoose = require('mongoose'),
		User = require('../models/user')(System),
		passport = require('../passport')(System),
		async = require('async'),
		communication = System.helpers.communication,
		$thisUser = {};


	// Create user
	$thisUser.create = function(req, res){
		System.log.info('Create user attempt...');
		var user = new User(req.body);

		// toDo: Improvise success vs. error responses as system helpers
		user.save(function(err){
			if (err) {
				System.log.error({error: err});
				return communication.fail(res, err);
			}
			System.log.info('User created');
			communication.success(res, user);
		});
	};

	$thisUser.login = function(req, res, next){
		async.waterfall([
			function authenticate(done){
				passport.authenticate('login', function(err, user) {
					if (err) { return done(err, false); }
					if (!user) { return done(null, false); }

					return req.logIn(user, function(err) {
						if (err) {
							return done(err, false);
						}
						return done(err, true);
					});
				})(req, res);
			},
			function respond(status, done){
				if(status){
					return communication.success(res, req.user);
				}
				return communication.fail(res, null, 'Login failed!');
			}
		], function(err){
			return communication.fail(res, err, 'Login failed!');
		});

	};

	$thisUser.logout = function(req, res){
		if(req.user){
			req.logout();
		}
		return communication.success(res);
	};

	return $thisUser;
}