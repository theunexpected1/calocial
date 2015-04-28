// User Route

module.exports = function(System){
	// Modules
	var userController = require('../controllers/users')(System),
		userRouter = System.express.Router();
	
	// Define routes here
	// Create User
	userRouter.post('/', userController.create);

	// Login User
	userRouter.post('/login/', userController.login);
	userRouter.post('/logout/', userController.logout);
	
	return userRouter;
};
