'use strict';

describe('Service: RLE', function () {

  // load the service's module
  beforeEach(module('golApp'));

  // instantiate service
  var RLE;
  beforeEach(inject(function (_RLE_) {
    RLE = _RLE_;
  }));

  it('should do something', function () {
    expect(!!RLE).toBe(true);
  });

});
