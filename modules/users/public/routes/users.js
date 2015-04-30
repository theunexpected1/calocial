// Users route

angular.module('calocial.users')
	.config([
		'$stateProvider', 
		function($stateProvider){

			$stateProvider
				.state('auth/register', {
					url: '/auth/register',
					templateUrl: '/modules/users/public/views/register.html'
				})
				.state('auth/login', {
					url: '/auth/login',
					templateUrl: '/modules/users/public/views/login.html'
				})
		}
	]);