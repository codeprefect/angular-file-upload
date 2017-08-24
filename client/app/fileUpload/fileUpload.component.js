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
      if (vm.files.length < 1) {
        console.log("No file(s) selected");
        return null;
      }
      var uploadUrl = "http://localhost:59810/api/File/Upload";
      angular.forEach(vm.files, function (file) {
        fileUploadService.uploadFileToUrl(file, uploadUrl);
      });
    }

    function dropFile(file) {
      vm.files.splice(vm.files.indexOf(file), 1);
    }
  }
})();
