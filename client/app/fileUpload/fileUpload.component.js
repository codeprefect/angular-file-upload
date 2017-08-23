(function () {
  'use strict';

  angular
    .module('FileUploader')
    .component('fileUpload', {
      template: require('./fileUpload.component.html'),
      controller: FileUploadController,
      controllerAs: 'vm'
    });

  FileUploadController.$inject = ['fileUploadService'];

  function FileUploadController(fileUploadService) {
    var vm = this;
    vm.uploadFiles = uploadFiles;
    vm.dropFile = dropFile;

    activate();

    ////////////////
    function activate() {
      vm.files = [];
    }

    function uploadFiles() {
      var uploadUrl = "http://localhost:59810/api/File/Upload";
      angular.forEach(vm.files, function (fil) {
        var file = fil._file,
          promise = fileUploadService.uploadFileToUrl(file, uploadUrl);

        promise.then(function (response) {
          fil.status = response.xhrStatus.toUpperCase();
        }, function () {
          fil.status = 'Failed';
        });
      });
    }

    function dropFile(id) {
      alert("dropping file" + id);
      vm.files.splice(id, 1);
    }
  }
})();
