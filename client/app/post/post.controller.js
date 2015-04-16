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
					// Init Booleans scope variables
					$scope.required = false;
					$scope.completed = false;
					$scope.uploading = false;
					$scope.error = false;
					// Get photo and collection data.
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
			$scope.uploadPhoto = function(photoInfo) {
				if (photoInfo === undefined ||
						photoInfo.title === undefined ||
						photoInfo.caption === undefined) {
					$scope.error = true;
					$scope.message = "Please fill in all fields";
				} else if ($scope.uploading) {
					// Return early since we are uploading.
					return false;
				} else {
					$scope.error = false;
					$scope.uploading = true;

					var photo = {
						data: $scope.photo,
						title: photoInfo.title,
						caption: photoInfo.caption,
						timestamp: new Date().getTime()
					};

					// Simple POST request
					$http.post('/api/photo', photo)
					  .success(function(data, status, headers, config) {
					  	$scope.uploading = false;
					  	$scope.completed = true;
					  	Materialize.toast('Yay, upload successful!', 4000);
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
				}
			};

			/**
			 * Cancel post action.
			 */
			$scope.cancelPost = function() {
				console.log('Im over here');
				// Reset photo in service to an empty object.
				PhotoService.setPhoto({});
				// Redirect back to collection view.
				$location.path('/collection');
			};

			post.init();

		}]);
})();
