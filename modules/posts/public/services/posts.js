// Posts factory service

angular.module('calocial.posts')
	.factory('posts', [
		'$resource',
		function($resource){
			var postsFactory = {};

			postsFactory.feed = $resource('/posts/:postId');
			postsFactory.single = $resource('/posts/:postId');
			postsFactory.search = $resource('/posts/search/:keyword');

			return postsFactory;
		}]);