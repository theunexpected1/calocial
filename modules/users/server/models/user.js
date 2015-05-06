// User Model

module.exports = function(System){
	// Modules
	var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		bcrypt = require('bcrypt'),
		async = require('async');

	// The User Schema
	var UserSchema = new Schema({
		created: {
			type: Date,
			default: Date.now
		},
		username: String,
		email: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		name: {
			type: String,
			required: true
		},
		avatar: String,
		password: String,
		password_salt: String
	});

	// Pre-save actions
	UserSchema.pre('save', function(next){
		var $this = this;

		// 1. Symmetric encryption
		async.waterfall([
			function generateSalt(done){
				bcrypt.genSalt(10, function(err, salt){
					if(!err){
						return done(null, salt);
					}
					return done(err);
				});
			},
			function generateHash(salt, done){
				bcrypt.hash($this.password, salt, function(err, hash){
					if(!err){
						$this.password_salt = salt;
						return done(null, hash);
					}
					return done(err);
				});
			}
		], function(err, hash){
			if(!err){
				$this.password = hash;
				next();
			} else{
				System.log.error({error: err});
			}
		});
	});

	///////////
	// User //
	///////////

	// User methods
	/**
	 * Check validity of password
	 * @param  {String}  password Password to test against
	 * @return {Boolean}          True if valid, else false
	 */
	UserSchema.methods.isPasswordValid = function (password) {
		return bcrypt.compareSync(password, this.password);
	};

	/**
	 * Eliminate critical information before providing the user model
	 * @return {Object} User model
	 */
	UserSchema.methods.toJSON = function(){
		var userObject = this.toObject();
		delete userObject.password;
		delete userObject.password_salt;
		return userObject;
	};

	return mongoose.model('User', UserSchema);
};