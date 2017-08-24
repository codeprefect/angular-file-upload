(function () {
  'use strict';

  angular
    .module('FileUploader')
    .service('fileUploadService', FileUploadService);

  FileUploadService.$inject = ['$rootScope', '$q'];

  function FileUploadService($rootScope, $q) {
    this.uploadFileToUrl = uploadFileToUrl;

    ////////////////

    function uploadFileToUrl(file, uploadUrl) {
      var deffered = $q.defer();

      // Create XMLHttpRequestObject
      var reqObj = new XMLHttpRequest(),
        data = new FormData();

      data.append("file", file._file);

      // Assign event handlers
      reqObj.upload.addEventListener("progress", uploadProgress, false);
      reqObj.addEventListener("load", uploadComplete, false);
      reqObj.addEventListener("error", uploadFailed, false);
      reqObj.addEventListener("abort", uploadCanceled, false);

      // Open object and set method for call
      reqObj.open("POST", uploadUrl, true);

      //set Content-Type at request header.For file upload it's value must be multipart/form-data
      //reqObj.setRequestHeader("Content-Type", "multipart/form-data");

      //Set Other header like file name,size and type
      reqObj.setRequestHeader('X-File-Name', file.name);
      reqObj.setRequestHeader('X-File-Type', file.type);
      reqObj.setRequestHeader('X-File-Size', file.size);

      reqObj.send(data);

      return deffered.promise;

      function uploadProgress(evt) {
        if (evt.lengthComputable) {
          var uploadProgressCount = Math.round(evt.loaded * 100 / evt.total);
          $rootScope.$apply(function () {
            file.progress = uploadProgressCount;
          });
          // if (uploadProgressCount == 100) {
          //   document.getElementById('P' + index).innerHTML =
          //     '<i class="fa fa-refresh fa-spin" style="color:maroon;"></i>';
          // }
        }
      }

      function uploadComplete(evt) {
        /* This event is raised when the server  back a response */
        $rootScope.$apply(function () {
          file.status = 'Completed';
        });
      }

      function uploadFailed(evt) {
        $rootScope.$apply(function () {
          file.status = 'Failed';
        });
      }

      function uploadCanceled(evt) {
        $rootScope.$apply(function () {
          file.status = 'Canceled';
        });
      }
    }
  }
})();
