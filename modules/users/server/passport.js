// Passport setup
module.exports = function(System){

	// Modules
	var passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy,
		User = require('mongoose').model('User');
	
	System.log.info('setting passport middleware for login');
	
	// Login middleware
	passport.use('login', new LocalStrategy({
			passReqToCallback : true,
			usernameField: 'email',
			passwordField: 'password'
		},
		function(req, email, password, done) {

			System.log.info('attempting login from passport');
			User.findOne({ 
				'email': email
			}, function(err, user) {
				if (err) { return done(err); }
				if (!user) {
					// return done(null, false, { message: 'Incorrect username.' });
					return done(null, err);
				}
				if (!user.isPasswordValid(password)) {
					// return done(null, false, { message: 'Incorrect password.' });
					return done(null, err);
				}

				// Session
				req.login(user, function(err){
					if (err) {
						return done(null, err);
					}
					System.log.info('User logged in with email:' + req.user.email);
				});
				return done(null, user);
			});
		}
	));

	// toDo: Passport Strategy for Register 

	// User serialization & deserialization for reading
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	return passport;
};

