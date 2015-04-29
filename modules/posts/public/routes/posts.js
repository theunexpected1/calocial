// Posts route

angular.module('calocial.posts')
	.config([
		'$stateProvider',
		function($stateProvider){

			$stateProvider
				.state('meetings', {
					url: '/meetings',
					templateUrl: '/modules/posts/public/views/posts.html'
				})
		}
	]);