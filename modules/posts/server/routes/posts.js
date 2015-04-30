// Posts route

module.exports = function(System){
	// Modules
	var controller = require('../controllers/posts')(System),
		router = System.express.Router();

	// Routes
	router
		.post('/', controller.create)
		.get('/', controller.get)
		.get('/:postId', controller.get);

	return router;
};