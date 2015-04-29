// User Route

module.exports = function(System){
	// Modules
	var controller = require('../controllers/users')(System),
		router = System.express.Router();
	
	// Routes
	router
		.post('/', controller.create) // Create User
		.post('/login/', controller.login) // Login User
		.post('/logout/', controller.logout); // Logout User
	
	return router;
};
