// By Simon Lydell 2015.
// This file is in the public domain.

var stdin   = require("get-stdin")
var tools   = require("text-frequencies-analysis")
var helpers = require("text-frequencies-analysis/lib/helpers")

stdin(function(text) {
  process.stdout.write(tools.jsonStringifyRow(convert(JSON.parse(text))))
})

function convert(bigrams) {
  var pairMap = Object.create(null)
  bigrams.forEach(function(tuple) {
    var bigram    = tuple[0]
    var frequency = tuple[1]
    var pair = bigram.split("").sort().join("")
    if (pair in pairMap) {
      pairMap[pair] += frequency
    } else {
      pairMap[pair] = frequency
    }
  })
  return tools.sortTuples(helpers.objectToArray(pairMap))
}
