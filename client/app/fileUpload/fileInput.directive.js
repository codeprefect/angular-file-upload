(function () {
  'use strict';

  angular
    .module('FileUploader')
    .directive('fileInput', fileInput);

  fileInput.$inject = ['$parse'];

  function fileInput($parse) {
    // Usage:
    // enable binding input model to files
    // Creates:
    //
    var directive = {
      link: link,
      restrict: 'A',
    };
    return directive;

    function link(scope, element, attrs) {
      var model = $parse(attrs.fileInput),
        modelSetter = model.assign;
      var values = [];
      element.bind('change', function () {
        angular.forEach(element[0].files, function (item, index) {
          var value = {
            id: index,
            // File Name 
            name: item.name,
            //File Size 
            size: item.size,
            //File URL to view 
            url: URL.createObjectURL(item),
            type: GenerateFileType(name),
            // File Input Value 
            _file: item
          };
          values.push(value);
        });
        scope.$apply(function () {
          modelSetter(scope, values);
        });
      });
    }
  }

  function GenerateFileType(name) {
    return 'application/pdf';
  }
})();
