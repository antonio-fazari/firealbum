(function($) {
	'use strict';

	angular
		.module('firealbumCollection')
	  .controller('CollectionCtrl', ['$scope', '$location', '$firebaseArray', 'PhotoService', CollectionCtrl]);

	  function CollectionCtrl($scope, $location, $firebaseArray, PhotoService) {
	    var collection = this;
	    var ref = new Firebase("https://mrandmrscoletta.firebaseio.com/photos");

	    /**
     	 * Initialize our controller data.
     	 */
	    collection.init = function() {
	    	// Set page class.
	    	$scope.pageClass = 'page--collection';
	    	// Create a synchronized array.
		  	$scope.photos = $firebaseArray(ref);
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
					}

					reader.readAsDataURL(input.files[0]);
        }
    	}

	    collection.init();
	  }
})(jQuery)