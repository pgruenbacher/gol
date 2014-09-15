'use strict';

describe('Directive: navigatorBox', function () {

  // load the directive's module
  beforeEach(module('golApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<navigator-box></navigator-box>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the navigatorBox directive');
  }));
});
