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

    return {
      Photo: Photo,
      newPhoto: newPhoto,
      setPhoto: setPhoto,
      getPhoto: getPhoto
    };

  }

})();
