angular.module('calocial.posts')
	.directive('appPost', function(){
		return {
			templateUrl: 'modules/posts/public/views/post.directive.html'
		};
	});