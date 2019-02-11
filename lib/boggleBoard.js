'use strict';

function BoggleSquare(letter, x,y) {
  this.letter = letter;
  this.x = x;
  this.y = y;
  this.id = x + ' ' + y;
}

function CheckableWord(square) {
  const _this = this;
  this.seenSquares = {};
  this.seenSquares[square.id] = square;
  this.word = square.letter;
  this.curSquare = square;
  this.unseenIds = function(ids) {
    return ids.filter(function(id) {
      return !_this.seenSquares[id];
    });
  };
  this.nextCheckableWord = function(square) {
    //this is pretty hacky :(
    const next = new CheckableWord(square);
    for (let i in this.seenSquares) {
      next.seenSquares[i] = this.seenSquares[i];
    }
    next.word = this.word + square.letter;
    return next;
  };
}

//We just assume a board "regular" dimesions 
function BoggleBoard(boardArray, trie, lengthLimit = 1) {
  const _this = this;
  this.board = boardArray;
  this.height = boardArray.length;
  this.width = boardArray[0].length;
  this.lengthLimit = lengthLimit;

  this.get = function(x,y) {
    return this.board[y][x];
  };

  //oh so hacky
  this.getSquare = function(id) {
    //duplication :(
    const xy = id.split(' ');
    const x = parseInt(xy[0]);
    const y = parseInt(xy[1]);
    return new BoggleSquare(this.get(x,y),x,y);
  };

  this.getNeighborIds = function(x,y) {
    let xMin = x - 1 < 0 ? 0 : x - 1;
    let yMin = y - 1 < 0 ? 0 : y - 1;
    let xMax = x + 1 >= this.width ? x : x + 1;
    let yMax = y + 1 >= this.height ? y : y + 1;
    const neighbors = [];
    for (let i = xMin; i <= xMax; i++) {
      for (let j = yMin; j <= yMax; j++) {
        if (!(i === x && j === y)) {
          neighbors.push(i + ' ' + j);
        }
      }
    }
    return neighbors;
  };

  this.getNextCheckableWords = function(checkableWord) {
    const neighborIds = this.getNeighborIds(checkableWord.curSquare.x, checkableWord.curSquare.y);
    const nextIds = checkableWord.unseenIds(neighborIds);
    const nextWords = nextIds.map(function(id) {
      const nextSquare = _this.getSquare(id); 
      return checkableWord.nextCheckableWord(nextSquare);
    });
    return nextWords;
  };

  this.walk = function(x,y) {
    const startingSquare = this.getSquare(x + ' ' + y);
    const startingWord = new CheckableWord(startingSquare);
    let toCheck = [startingWord];
    const words = [];
    while(toCheck.length > 0) {
      const curCheckableWord = toCheck.shift();
      const checkedWord = trie.find(curCheckableWord.word);
      if(checkedWord.isWord && curCheckableWord.word.length >= lengthLimit) {
        words.push(curCheckableWord.word);
      }
      if(checkedWord.isPrefix) {
        const next = this.getNextCheckableWords(curCheckableWord);
        toCheck = toCheck.concat(next);
      }
    }
    return words;
  };

  this.findAllWords = function() {
    let words = [];
    for(let i = 0; i < this.width; i++) {
      for(let j = 0; j < this.height; j++) {
        words = words.concat(this.walk(i,j)); 
      }
    }
    return words;
  };
}

module.exports.BoggleBoard = BoggleBoard;
module.exports.CheckableWord = CheckableWord;
module.exports.BoggleSquare = BoggleSquare;
