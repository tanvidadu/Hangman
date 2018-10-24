// By Simon Lydell 2015.
// This file is in the public domain.

var cheerio = require("cheerio")
var stdin   = require("get-stdin")
var tools   = require("text-frequencies-analysis")

stdin(function(text) {
  process.stdout.write(tools.jsonStringifyRow(extract(text)))
})

function extract(text) {
  var $ = cheerio.load(text)
  var bigrams = []
  $('table').first().find('td').each(function(index, element) {
    var $cell = $(element)
    bigrams.push([$cell.text().trim().toLowerCase(), parse($cell.attr('title'))])
  })
  return tools.sortTuples(bigrams)
}

function parse(title) {
  return Number(title.split(/\s+/)[2].replace(/,/g, ''))
}
