// Posts controller

angular.module('calocial.posts')
	.controller('PostController', [
		'$rootScope',
		'$scope',
		'$resource',
		'$location',
		'$mdToast', 
		function($rootScope, $scope, $resource, $location, $mdToast){
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
						$mdToast.show({
							template: '<md-toast><span flex>New post created!</span></md-toast>',
							hideDelay: 2000
						});
					} else{
						console.log('error in saving post: ' + res.message);
						console.log(res.json);
						$mdToast.show({
							template: '<md-toast><span flex>You will have to login again.</span></md-toast>',
							hideDelay: 2000
						})
					}
				});
			}


			$scope.getPosts();
		}
	]);
