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
	 * Register user 
	 * @param  {Object} req Request Object
	 * @param  {Object} res Response Object
	 * @return {Object}     Communication response object
	 */
	usersController.create = function(req, res){
		System.log.info('Create user attempt...');
		var user = new User(req.body);

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
			communication.ok(res, user);
		});
	};

	/**
	 * Get a user by _id
	 * @param  {Object} req Request Object
	 * @param  {Object} res Response Object
	 * @return {Object}     Communication response object
	 */
	usersController.get = function(req, res){
		var params = {};
		if(req.params.userId){
			params._id = req.params.userId;			
			User
				.findOne(params)
				.exec(function(err, user){
					if(err){
						return communication.fail(res, err, 'User not found');
					}
					return communication.ok(res, user);
				});
		} else{
			return communication.fail(res, null, 'User not found')
		}
		
	};



	/**
	 * Get a user by _id
	 * @param  {Object} req Request Object
	 * @param  {Object} res Response Object
	 * @return {Object}     Communication response object
	 */
	usersController.update = function(req, res){
		if(!req.user){
			return communication.fail(res, null, 'User is not logged in');
		}
		var user = req.user;
		user.name = req.body.name;
		user.save(function(err){
			if(err){
				return communication.fail(res, err, 'Could not save user');
			}
			return communication.ok(res, user);
		});
	};

	/**
	 * Login user
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
					return communication.ok(res, req.user);
				}
				return communication.fail(res, null, 'Login failed!');
			}
		], function(err){
			return communication.fail(res, err, 'Login failed!');
		});

	};

	/**
	 * Logout user
	 * @param  {Object} req Request Object
	 * @param  {Object} res Response Object
	 * @return {Object}     Communication response object
	 */
	usersController.logout = function(req, res){
		if(req.user){
			req.logout();
		}
		return communication.ok(res);
	};

	return usersController;
}