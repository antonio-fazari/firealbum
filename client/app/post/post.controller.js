(function() {
	'use strict';

	angular
		.module('firealbumPost')
		.controller('PostCtrl', ['$scope', 'CollectionService', 'PhotoService', PostCtrl]);

		function PostCtrl($scope, CollectionService, PhotoService) {
			var post = this;

			/**
			 * Initialise the post controller.
			 */
			post.init = function() {
				$scope.pageClass = 'page--post';
				$scope.photo = PhotoService.getPhoto().data;
				$scope.collection = CollectionService.getCollection();
			}

			/**
			 * Add photo to firebase.
			 */
			$scope.addPhoto = function() {
				var photo = {
					data: $scope.photo,
					caption: 'Testing',
					timestamp: new Date().getTime()
				};
				console.log(photo);

				$scope.collection.$add(photo);
			}

			post.init();

		}
})()
