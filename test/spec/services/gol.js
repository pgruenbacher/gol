'use strict';

describe('Service: GOL', function () {

  // load the service's module
  beforeEach(module('golApp'));

  // instantiate service
  var GOL;
  beforeEach(inject(function (_GOL_) {
    GOL = _GOL_;
  }));

  it('should do something', function () {
    expect(!!GOL).toBe(true);
  });

});
