(function () {
  'use strict';

  angular
    .module('FileUploader')
    .component('appComponent', {
      template: require('./app.component.html'), controller: AppController,
      controllerAs: '$ctrl'
    });

  function AppController() {
    var $ctrl = this;

    ////////////////

    $ctrl.$onInit = function () {
      $ctrl.title = "This is AngularJS 1.6";
      $ctrl.picture = '../assets/images/dp.jpg';
    };

    $ctrl.$onChanges = function (changesObj) { };
    $ctrl.$onDestroy = function () { };
  }
})();
