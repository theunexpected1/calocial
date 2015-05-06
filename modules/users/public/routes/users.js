// Users route

angular.module('calocial.users')
	.config([
		'$stateProvider', 
		function($stateProvider){

			$stateProvider
				.state('register', {
					url: '/register',
					templateUrl: '/modules/users/public/views/register.html'
				})
				.state('login', {
					url: '/login',
					templateUrl: '/modules/users/public/views/login.html'
				})
				.state('profile', {
					url: '/profile/:userId',
					templateUrl: function($stateParams){
						return '/modules/users/public/views/profile.html'
					}
				});
		}
	]);