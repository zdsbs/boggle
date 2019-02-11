const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const Trie = require(process.cwd() + '/lib/trie').Trie;
const BoggleBoard = require(process.cwd() + '/lib/boggleBoard').BoggleBoard;
const readline = require('readline');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/', function (req, res) {
	if(req.body.letters.length != 16) {
		res.send({err:'you must supply 16 letters'});
		return;
	}
	const letters = req.body.letters;
  const board = [];
  for(let i = 0; i < 4; i++) {
    board[i] = [];
    for(let j = 0; j < 4; j++) {
      board[i][j] = letters.charAt(4*i+j);
    }
  }
  const boggleBoard = new BoggleBoard(board,trie,3);
  const words = boggleBoard.findAllWords();
	
  res.send({words:words});
});

const trie = new Trie();
const readInterface = readline.createInterface({
  input: fs.createReadStream('collins_scrabble_words_2015.txt')
});

readInterface.on('line', function(line) {
  trie.insert(line.toLowerCase());
});

readInterface.on('close', function() {
	const server=app.listen(3000,function() {});
});
