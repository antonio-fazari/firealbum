(function() {
	'use strict';

	angular
		.module('firealbumPost')
		.controller('PostCtrl', ['$scope', '$http', '$location', 'CollectionService', 'PhotoService',
		function ($scope, $http, $location, CollectionService, PhotoService) {
			var post = this;
			var targetWidth = '612';
			var targetHeight = '612';
			var S3URL = 'https://s3-ap-southeast-2.amazonaws.com/firealbum/';

			/**
			 * Initialise the post controller.
			 */
			post.init = function() {
				if (!PhotoService.getPhoto()) {
					$location.path('/collection');
				} else {
					// Create new image object.
					// var img = new Image;
					// img.onload = post.resizeImage;
					// img.src = PhotoService.getPhoto().data;

					$scope.pageClass = 'page--post';
					$scope.photo = PhotoService.getPhoto().data;
					$scope.collection = CollectionService.getCollection();
				}
			};

			post.resizeImage = function() {
		    // Create new data uri.
		    var newDataUri = PhotoService.imageToDataUri(this, targetWidth, targetHeight);

		    $scope.$apply(function() {
		    	// Update and apply new src.
					$scope.photo = newDataUri;
		    });
			};

			/**
			 * Add photo to firebase.
			 */
			$scope.addPhoto = function() {
				var photo = {
					data: $scope.photo,
					caption: 'Testing',
					timestamp: new Date().getTime()
				};

				// Simple POST request example (passing data) :
				$http.post('/api/photo', photo)
				  .success(function(data, status, headers, config) {
				    // Successfully uploaded the image to S3.
				    delete photo.data;
				    photo.url = S3URL + photo.timestamp;
				    // Add to Firebase!
				    $scope.collection.$add(photo);
				    // Redirect to collection page.
				    $location.path('/collection');
				  })
				  .error(function(data, status, headers, config) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				  });
			};

			post.init();

		}]);
})();
