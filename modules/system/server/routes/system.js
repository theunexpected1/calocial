// System route

module.exports = function(System){
	// Add routes here manually
	// toDo: refactor to add this to configurations / automation
	var routes = [{
		module: 'users',
		root: 'auth'
	}];

	// Include routes for all modules defined
	routes.forEach(function(route){
		var router = require('../../../' + route.module + '/server/routes/' + route.module)(System);
		System.app.use('/' + route.root, router);

		System.log.info(route.module + ' route set');

	});
};