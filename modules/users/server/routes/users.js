// User Route

module.exports = function(System){
	// Modules
	var controller = require('../controllers/users')(System),
		router = System.express.Router();
	
	// Routes
	router
		.post('/', controller.create) // Create User
		.get('/:userId', controller.get) // Get a User
		.put('/', controller.update) // Update User details
		.post('/login/', controller.login) // Login User
		.post('/logout/', controller.logout); // Logout User
	
	return router;
};
