"use strict";
const _ = require('highland');
const zipMap = require('./');
const should = require('should');

function pair2obj (obj, pair) {
  obj[pair[0]] = pair[1];
  return obj;
}

describe('zipMap', function () {

  it('zips pairs', function (done) {

    _.pairs({
      a: _([1, 2]),
      b: _([3, 4])
    })
    .through(zipMap)
    .flatMap((pairs) => 
      _(pairs).reduce({}, pair2obj)
    )
    .toArray((arr) => {
      arr.should.eql([
        {a: 1, b: 3},
        {a: 2, b: 4}
      ]);
      done();
    });
  });

  it('zips maps', function (done) {
    
    _(new Map([
      ["a", _([1, 2])],
      ["b", _([3, 4])]
    ]))
    .through(zipMap)
    .map((pairs) => new Map(pairs))
    .toArray((arr) => {
      arr.should.eql([
        new Map([['a', 1], ['b', 3]]),
        new Map([['a', 2], ['b', 4]])
      ]);
      done();
    });
  });

});
