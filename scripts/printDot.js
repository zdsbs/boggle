/*eslint no-console: "off"*/

'use strict';
const fs = require('fs');
const readline = require('readline');
const argv = require('yargs')
  .usage('Usage: $0 [filename]\n Caution this is slow, use for debugging small files')
  .demand(1).argv;

const Trie = require(process.cwd() + '/lib/trie').Trie;
const trie = new Trie();

const readInterface = readline.createInterface({
  input: fs.createReadStream(argv._[0])
});

readInterface.on('line', function(line) {
  trie.insert(line);
});

readInterface.on('close', function() {
  const dot = trie.getDotGraph();
  console.log(dot);
});

