// Posts controller

module.exports = function(System){
	// Modules
	var mongoose = require('mongoose'),
		Post = require('../models/post')(System),
		communication = System.helpers.communication,
		postsController = {};

	/**
	 * Method to create a new post with provided post parameters
	 * @param  {Object} req Request Object
	 * @param  {Object} res Response Object
	 * @return {Object}     Communication response object
	 */
	postsController.create = function(req, res){
		var params = req.body,
			post;

		if(!req.user){
			System.log.error('attempting to create post without logging in');
			return communication.fail(res, null, 'Please login to post')
		}
		params.creator = req.user;

		post = new Post(params);
		post.save(function(err){
			if(err){
				System.log.error({err: err});
				return communication.fail(res, err);
			}
			return communication.ok(res, post);
		});
	};

	/**
	 * Method to get a single post or list of posts depending on provided post parameters
	 * @param  {Object} req Request Object
	 * @param  {Object} res Response Object
	 * @return {Object}     Communication response object
	 */
	postsController.get = function(req, res){
		var params = {};
		if(req.params.postId){
			params._id = req.params.postId;
		}
		
		Post
			.find(params)
			.populate('creator')
			.exec(function(err, posts){
				if(err){
					System.log.error({err: err});
					return communication.fail(res, err);
				}
				return communication.ok(res, posts);
			});
	};

	return postsController;
};