
# Usage

Takes a mapping of keys to streams and returns a stream of zipped values mapped to the original keys:

```javascript
const _ = require('highland');
const zipMap = require('highland-zip-map');

_([
  ['a', _([1,2])],
  ['b', _([3,4])]
]).through(zipMap);
// => [['a', 1], ['b', 3]], [['a', 2], ['b', 4]]

// using objects
_.pairs({
  a: _([1,2]),
  b: _([3,4])
}).through(zipMap)
.map(pairsToObject); // pairsToObject sold separately
// => {a: 1, b: 3}, {a: 2, b: 4}

// using Maps
_(new Map([
  ["a", _([1, 2])],
  ["b", _([3, 4])]
]))
.through(zipMap)
.map((pairs) => new Map(pairs));
// => Map { 'a' => 1, 'b' => 3 }, Map { 'a' => 2, 'b' => 4 }
```

