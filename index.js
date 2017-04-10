'use strict'
var _ = require('highland')
module.exports = function (pairs) {
  // zip all keys together and all streams together and collect
  return pairs.map(function (pair) { return _(pair) }).zipAll().collect()
  .flatMap(function (keysStreams) {
    // zip all streams to create stream of zipped vals
    return _(keysStreams[1]).zipAll()
    .flatMap(function (vals) {
      // zip keys with every zipped vals and collect
      return _(keysStreams[0]).zip(vals).collect()
    })
  })
}
