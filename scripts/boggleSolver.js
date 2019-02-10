/*eslint no-console: "off"*/

'use strict';
const fs = require('fs');
const Trie = require(process.cwd() + '/lib/trie').Trie;
const BoggleBoard = require(process.cwd() + '/lib/boggleBoard').BoggleBoard;
const readline = require('readline');
const argv = require('yargs')
  .usage('Usage: $0 [boggle string 16 chars!]')
  .demand(1).argv;

const letters = argv._[0];
if(letters.length !== 16) {
  console.log('I need 16 chars to run not: ' + letters.length + ' try again: ' + letters);
  process.exit(1);
}

const trie = new Trie();
const readInterface = readline.createInterface({
  input: fs.createReadStream('collins_scrabble_words_2015.txt')
});

readInterface.on('line', function(line) {
  trie.insert(line.toLowerCase());
});

readInterface.on('close', function() {
  const board = [];
  for(let i = 0; i < 4; i++) {
    board[i] = [];
    for(let j = 0; j < 4; j++) {
      board[i][j] = letters.charAt(4*i+j);
    }
  }
  const boggleBoard = new BoggleBoard(board,trie,3);
  const words = boggleBoard.findAllWords();

  console.log(board);
  console.log(words);
  
});

