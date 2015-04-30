// Post model

module.exports = function(System){
	// Modules
	var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		async = require('async');

	// The Post Schema
	var PostSchema = new Schema({
		created: {
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
			required: true
		},
		description: {
			type: String,
			required: false
		},
		type: {
			type: String,
			default: 'meeting'
		},
		date: {
			type: Date,
			required: true
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
			},
			created: {
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