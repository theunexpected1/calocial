angular.module('calocial.posts')
	.directive('appPost', function(){
		return {
			templateUrl: 'modules/posts/public/views/post.directive.html'
		};
	})
	//auto-focus=isCreatingPost
	.directive('autoFocus', ['$parse', '$timeout', function($parse, $timeout){
		return {
			restrict: 'A',
			link: function link(scope, element, attrs){
				var model = $parse(attrs.autoFocus);
				scope.$watch(model, function(value){
					if(value === true){
						$timeout(function(){
							element[0].focus();
						});
					}
				});
			}
		}
	}]);
