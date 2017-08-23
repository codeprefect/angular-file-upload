(function () {
  'use strict';

  angular
    .module('FileUploader')
    .service('fileUploadService', FileUploadService);

  FileUploadService.$inject = ['$http', '$q'];

  function FileUploadService($http, $q) {
    this.uploadFileToUrl = uploadFileToUrl;

    ////////////////

    function uploadFileToUrl(file, uploadUrl) {
      var fd = new FormData();
      fd.append('file', file);

      var deffered = $q.defer();

      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      }).then(function (response) {
        deffered.resolve(response);
      }, function (response) {
        deffered.reject(response);
      });

      return deffered.promise;
    }
  }
})();
