'use strict';

describe('Controller: FrontpagectrlCtrl', function () {

  // load the controller's module
  beforeEach(module('golApp'));

  var FrontpagectrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FrontpagectrlCtrl = $controller('FrontpagectrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
