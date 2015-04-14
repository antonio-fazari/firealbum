(function () {
	'use strict';

	angular
		.module('firealbumPhoto')
		.factory('PhotoService', ['$location', PhotoService]);

	function PhotoService($location) {
		var uploadedPhoto;

		function Photo() {
			this.data = '';
			this.caption = '';
		}

		function newPhoto() {
			var photo = new Photo();

			return photo;
		}

		function setPhoto(photo) {
			uploadedPhoto = photo;
		}

		function getPhoto() {
			return uploadedPhoto;
		}

		function imageToDataUri(img, width, height) {
	    // create an off-screen canvas
	    var canvas = document.createElement('canvas'),
	        ctx = canvas.getContext('2d');

	    // set its dimension to target size
	    canvas.width = width;
	    canvas.height = height;

	    // draw source image into the off-screen canvas:
	    ctx.drawImage(img, 0, 0, width, height);

	    // encode image to data-uri with base64 version of compressed image
	    return canvas.toDataURL();
		}

		return {
			Photo: Photo,
			newPhoto: newPhoto,
			setPhoto: setPhoto,
			getPhoto: getPhoto,
			imageToDataUri: imageToDataUri
		};

	}

})();
