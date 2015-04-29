// Post model

module.exports = function(System){
	// Modules
	var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		async = require('async');

	// The Post Schema
	var PostSchema = new Schema({
		date_created: {
			type: Date,
			default: Date.now
		},
		creator: {
			type: Schema.ObjectId,
			required: true,
			ref: 'User'
		},
		title: {
			type: String,
			require: true
		},
		description: {
			type: String,
			require: false
		},
		type: {
			type: String,
			default: 'meeting'
		}
		date: {
			type: Date,
			require: true
		},
		participants: [{
			user: {
				type: Schema.ObjectId,
				required: false,
				ref: 'User'
			},
			status: {
				type: Number,
				required: false,
				default: 0
			}
			date_created: {
				type: Date,
				default: Date.now
			}
		}]
	});

	// participants -> status
	// 0 => pending/invited
	// 1 => accepted
	// 2 => rejected

	return mongoose.model('Post', PostSchema);
};