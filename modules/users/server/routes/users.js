// User Route

module.exports = function(System){
	// Modules
	var userController = require('../controllers/users')(System),
		userRouter = System.express.Router();
	
	// Define routes here
	// Create User
	userRouter.post('/', userController.create);
	
	return userRouter;
};
