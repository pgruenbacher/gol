'use strict';

describe('Controller: ControlsctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('golApp'));

  var ControlsctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ControlsctrlCtrl = $controller('ControlsctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
