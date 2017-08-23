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
      // var fd = new FormData();
      // fd.append('file', file);

      // var deffered = $q.defer();

      // $http.post(uploadUrl, fd, {
      //   transformRequest: angular.identity,
      //   headers: { 'Content-Type': undefined }
      // }).then(function (response) {
      //   deffered.resolve(response);
      // }, function (response) {
      //   deffered.reject(response);
      // });

      // return deffered.promise;

      // Create XMLHttpRequestObject
      var reqObj = new XMLHttpRequest();

      // Assign event handlers
      reqObj.upload.addEventListener("progress", uploadProgress, false);
      reqObj.addEventListener("load", "uploadComplete", false);
      reqObj.addEventListener("error", uploadFailed, false);
      reqObj.addEventListener("abort", uploadCanceled, false);

      // Open object and set method for call
      reqObj.open("POST", uploadUrl, true);

      //set Content-Type at request header.For file upload it's value must be multipart/form-data
      reqObj.setRequestHeader("Content-Type", "multipart/form-data");

      //Set Other header like file name,size and type
      reqObj.setRequestHeader('X-File-Name', file.name);
      reqObj.setRequestHeader('X-File-Type', file.type);
      reqObj.setRequestHeader('X-File-Size', file.size);

      reqObj.send(file._file);

      function uploadProgress(evt) {
        if (evt.lengthComputable) {
          var uploadProgressCount = Math.round(evt.loaded * 100 / evt.total);

          file.progress = uploadProgressCount;

          // if (uploadProgressCount == 100) {
          //   document.getElementById('P' + index).innerHTML =
          //     '<i class="fa fa-refresh fa-spin" style="color:maroon;"></i>';
          // }
        }
      }

      function uploadComplete(evt) {
        /* This event is raised when the server  back a response */
        file.status = 'Completed';
      }

      function uploadFailed(evt) {
        file.status = 'Failed';
      }

      function uploadCanceled(evt) {
        file.status = 'Failed';
      }
    }
  }
})();
