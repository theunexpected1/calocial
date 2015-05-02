// Posts controller

angular.module('calocial.posts')
	.controller('PostController', [
		'$rootScope',
		'$scope',
		'$resource',
		'$location',
		function($rootScope, $scope, $resource, $location){
			$scope.posts = {};
			$scope.post = {};
			$scope.isCreatingPost = false;

			$scope.createOrCancelPost = function(){
				$scope.isCreatingPost = !$scope.isCreatingPost;
			}

			$scope.getPosts = function(){
				$resource('/meetings').get(function(res){
					if(res.status){
						$scope.posts = res.json;
					}
				});
			}

			$scope.create = function(){
				$resource('/meetings').save($scope.post, function(res){
					if(res.status){
						console.log('post saved');
						console.log(res.json);
					} else{
						console.log('error in saving post: ' + res.message);
						console.log(res.json);
					}
				});
			}


			$scope.getPosts();
		}
	]);
