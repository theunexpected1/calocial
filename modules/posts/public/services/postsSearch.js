// Posts Search service

angular.module('calocial.posts')
	.service('postsSearch', [
		'posts', 
		'$q', 
		function(posts, $q){
			var service = {};

			/**
			 * Search method to find posts that match provided keyword
			 * @param  {String} keyword keyword to search for
			 * @return {null}
			 */
			service.searchByKeyword = function(keyword){
				return $q(function(resolve, reject){
					posts.search.get({keyword: keyword}, function(res){
						resolve(res);
					});
				});
			};
			return service;
		}
	]);