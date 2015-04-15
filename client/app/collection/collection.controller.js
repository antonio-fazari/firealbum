(function($) {
	'use strict';

	angular
		.module('firealbumCollection')
		.controller('CollectionCtrl', ['$rootScope', '$scope', '$location', '$firebaseArray', 'CollectionService', 'PhotoService', CollectionCtrl]);

		function CollectionCtrl($rootScope, $scope, $location, $firebaseArray, CollectionService, PhotoService) {
			var collection = this;

			/**
			 * Initialize our controller data.
			 */
			collection.init = function() {
				// Set page class.
				$scope.pageClass = 'page--collection';
				// Create a synchronized array.
				$scope.photos = CollectionService.getCollection();
				// Bind change events.
				collection.bindFileChangeEvent();
			}

			/**
			 * Bind File Change Event to Photo Button.
			 */
			collection.bindFileChangeEvent = function() {
				$("#photo").change(function (e) {
					collection.readURL(this);
				});
			}

			/**
			 * Read URL from file upload.
			 */
			collection.readURL = function(input) {
				if (input.files && input.files[0]) {
					var reader = new FileReader();

					reader.onload = function (e) {
						//TODO - Perform error checking.

						var photo = {
							data: e.target.result,
							caption: '',
							timestamp: new Date().getTime()
						};

						// Set current uploaded photo.
						PhotoService.setPhoto(photo);
						$rootScope.$apply($location.path('/post'));
					}

					reader.readAsDataURL(input.files[0]);
				}
			}

			collection.init();
		}
})(jQuery)
