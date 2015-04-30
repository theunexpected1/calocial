// Posts controller

angular.module('calocial.posts')
	.controller('PostController', [
		'$rootScope',
		'$scope',
		'$resource',
		'$location',
		function($rootScope, $scope, $resource, $location){
			$scope.posts = {};
			$resource('/meetings').get(function(res){
				if(res.status){
					$scope.posts = res.json;
				}
			});
		}
	]);
