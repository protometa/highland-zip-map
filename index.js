"use strict";
var _ = require('highland');
module.exports = function(pairs) {
  return pairs.map(function (pair) {return _(pair);}) // convert pairs to streams for zipAll0
    .zipAll0().collect() // group all keys together and all streams together and collect
    .flatMap(function (keysStreams) { // keysStreams == [keys, streams]
      return _(keysStreams[1]).zipAll0() // zip all streams to create stream of zipped vals
        .flatMap(function (vals) {
          return _(keysStreams[0]).zip(vals) // zip keys with every zipped vals
            .collect(); // collect pairs for every result
        });
    });
};
