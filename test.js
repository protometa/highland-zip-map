"use strict";
var _ = require('highland');
var zipMap = require('./index');

var timeout = setTimeout(function () {
  done('timeout');
}, 10);

_.pairs({
  a: _([1,2]),
  b: _([3,4])
})
// .doto((x) => console.log('IN:', x))
.through(zipMap)
// .doto((x) => console.log('OUT:', x))
.toArray((arr) => {
  console.assert(
    arr[0][0][0] == 'a' &&
    arr[0][0][1] == 1 &&
    arr[0][1][0] == 'b' &&
    arr[0][1][1] == 3 &&
    arr[1][0][0] == 'a' &&
    arr[1][0][1] == 2 &&
    arr[1][1][0] == 'b' &&
    arr[1][1][1] == 4
  );
  done();
});

function done(err) {
  if (err) throw err;
  clearTimeout(timeout);
}