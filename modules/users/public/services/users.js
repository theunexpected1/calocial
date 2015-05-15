// Users factory service

angular.module('calocial.users')
	.factory('users', [
		'$resource',
		function($resource){
			var usersFactory = {};

			usersFactory.login = $resource('/auth/login');
			usersFactory.logout = $resource('/auth/logout');
			usersFactory.single = $resource('/auth/:userId');
			usersFactory.me = $resource('/auth', null, {
				update: {
					method: 'PUT'
				}
			});

			return usersFactory;
		}]);