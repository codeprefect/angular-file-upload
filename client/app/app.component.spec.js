
describe('AppComponent', () => {
  var $controller, scope, element;
  beforeEach(angular.mock.module('FileUploader'));

  beforeEach(inject((_$rootScope_, _$compile_) => {
    scope = _$rootScope_.$new();
    element = angular.element('<app-component></app-component>');
    element = _$compile_(element)(scope);
    $controller = element.controller('appComponent');
  }));

  describe('AppController', function () {
    it('has a title', () => {
      expect($controller.title).toEqual('This is AngularJS 1.6');
    });
    it('picture is defined', () => {
      expect($controller.picture).toBeDefined();
    });
  });
});
