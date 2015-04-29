// User Controller

module.exports = function(System){
	// Modules
	var mongoose = require('mongoose'),
		User = require('../models/user')(System),
		passport = require('../passport')(System),
		async = require('async'),
		communication = System.helpers.communication,
		usersController = {};

	/**
	 * Method to register user 
	 * @param  {Object} req Request Object
	 * @param  {Object} res Response Object
	 * @return {Object}     Communication response object
	 */
	usersController.create = function(req, res){
		System.log.info('Create user attempt...');
		var user = new User(req.body);

		// toDo: Improvise success vs. error responses as system helpers
		user.save(function(err){
			if (err) {
				System.log.error({error: err});
				// Error code 11000 means an error with index
				if(err.code && (err.code == 11000)){
					return communication.fail(res, err, 'User already exists. Please try a different email address.');
				}
				return communication.fail(res, err, 'There was a problem with registration. Please try again later.');
			}
			System.log.info('User created');
			communication.success(res, user);
		});
	};

	/**
	 * Method to login user
	 * @param  {Object} req Request Object
	 * @param  {Object} res Response Object
	 * @return {Object}     Communication response object
	 */
	usersController.login = function(req, res){
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

	/**
	 * Method to logout user
	 * @param  {Object} req Request Object
	 * @param  {Object} res Response Object
	 * @return {Object}     Communication response object
	 */
	usersController.logout = function(req, res){
		if(req.user){
			req.logout();
		}
		return communication.success(res);
	};

	return usersController;
}