// Posts controller

angular.module('calocial.posts')
	.controller('PostController', [
		'$rootScope',
		'$scope',
		'$timeout',
		'$mdToast',
		'postsSearch',
		'posts',
		function($rootScope, $scope, $timeout, $mdToast, postsSearch, posts){
			$scope.posts = {};
			$scope.post = {};
			$scope.searchKeyword = '';
			$scope.isCreatingPost = false;
			$scope.isSearchingPosts = false;

			/**
			 * Search for posts on changing keywords
			 * @return {null}
			 */
			$scope.keywordChanged = function(){
				$scope.isSearchingPosts = true;

				// Clear search in case of no keywords
				if(!$scope.searchKeyword){
					$scope.getPosts();
					$scope.isSearchingPosts = false;
					return;
				}

				// Search by keyword service call
				postsSearch
					.searchByKeyword($scope.searchKeyword)
					.then(
						function(res){
							if(res.status){
								$scope.posts = res.json;
							}
							// Delay to show searching loader for a minimum duration
							$timeout(function(){
								$scope.isSearchingPosts = false;
							}, 100);
						},
						function(res){
							console.log('fail:');
							console.log(res);
						}
					);
			};

			/**
			 * Show the create post dialog or cancel it
			 * @return {null}
			 */
			$scope.createOrCancelPost = function(){
				$scope.isCreatingPost = !$scope.isCreatingPost;
			}

			/**
			 * Show all posts available
			 * @return {null}
			 */
			$scope.getPosts = function(){
				$scope.clearFilters();
				posts.feed.get(function(res){
					if(res.status){
						$scope.posts = res.json;
					}
				});
			}

			/**
			 * Request to create a new post
			 * @return {null}
			 */
			$scope.create = function(){
				var post = new posts.single($scope.post);
				post.$save(function(res){
					if(res.status){
						console.log('post saved');
						$mdToast.show({
							template: '<md-toast><span flex>New post created!</span></md-toast>',
							hideDelay: 2000
						});
						$scope.isCreatingPost = false;
						$scope.postForm.$setPristine();
						$scope.postForm.$setUntouched();
						
						// Refresh list
						$scope.getPosts();

					} else{
						console.log('error in saving post: ' + res.message);
						$mdToast.show({
							template: '<md-toast><span flex>You will have to login again.</span></md-toast>',
							hideDelay: 2000
						})
					}
				});
			}

			/**
			 * Clear search filters
			 * @return {null}
			 */
			$scope.clearFilters = function(){
				$scope.searchKeyword = '';
			};

			// Initial call to show all posts
			$scope.getPosts();
		}
	]);
