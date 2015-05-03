// Posts controller

module.exports = function(System){
	// Modules
	var mongoose = require('mongoose'),
		Post = require('../models/post')(System),
		communication = System.helpers.communication,
		postsController = {};

	// Methods
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
	 * Method to get a single post or list of posts depending on postId
	 * @param  {Object} req Request Object
	 * @param  {Object} res Response Object
	 * @return {Object}     Communication response object
	 */
	postsController.get = function(req, res){
		var params = {};
		if(req.params.postId){
			params._id = req.params.postId;
		}
		return postsController.query(req, res, params);
	};

	/**
	 * Method to get find posts depending on keyword for search
	 * @param  {Object} req Request Object
	 * @param  {Object} res Response Object
	 * @return {Object}     Communication response object
	 */
	postsController.search = function(req, res){
		// Currently searching titles of posts only
		var params ={};
		if(req.params.keyword){
			params.title = new RegExp(req.params.keyword, 'i');
		}
		return postsController.query(req, res, params);
	};

	/**
	 * Method to query posts with the given parameters of search
	 * @param  {Object} req    Request Object
	 * @param  {Object} res    Response Object
	 * @param  {Object} params Parameters key-value pairs as passed by other methods of this controller (usually schema keys and their corresponding value to search)
	 * @return {Object}        Communication response object
	 */
	postsController.query = function(req, res, params){
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