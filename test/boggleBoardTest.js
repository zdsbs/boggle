/*eslint-env mocha */
/*eslint-disable indent */

const assert = require('assert');
const BoggleBoard = require(process.cwd() + '/lib/boggleBoard').BoggleBoard;
const CheckableWord = require(process.cwd() + '/lib/boggleBoard').CheckableWord;
const BoggleSquare = require(process.cwd() + '/lib/boggleBoard').BoggleSquare;
const Trie = require(process.cwd() + '/lib/trie').Trie;

describe('BoggleBoard', function() {
  it('Create a board get letter at index', function() {
    const boggleBoard = new BoggleBoard([['a','b','c'],['d','e','f']]);
    assert.equal(boggleBoard.get(0,0),'a');
    assert.equal(boggleBoard.get(2,1),'f');
  });

  it('height and width are calculated right', function () {
    assert.equal(new BoggleBoard([['a','b','c'],['d','e','f']]).height, 2);
    assert.equal(new BoggleBoard([['a','b','c'],['d','e','f']]).width, 3);
  });

  it('Get neighboorIds', function() {
    const boggleBoard = new BoggleBoard([['a','b','c'],
                                         ['d','e','f'],
                                         ['g','h','i']]);
    assert.deepEqual(boggleBoard.getNeighborIds(0,0),['0 1','1 0','1 1']);
    assert.deepEqual(boggleBoard.getNeighborIds(1,0),['0 0','0 1','1 1','2 0','2 1']);
    assert.deepEqual(boggleBoard.getNeighborIds(2,0),['1 0', '1 1', '2 1']);
    assert.deepEqual(boggleBoard.getNeighborIds(1,1),['0 0','0 1','0 2','1 0','1 2','2 0','2 1','2 2']);
    assert.deepEqual(boggleBoard.getNeighborIds(2,2),['1 1','1 2','2 1']);
  });

  it('Get square', function() {
    const boggleBoard = new BoggleBoard([['a','b','c'],
                                         ['d','e','f'],
                                         ['g','h','i']]);
    const s = boggleBoard.getSquare('1 1');
    assert.deepEqual(s,new BoggleSquare('e',1,1));
  });

  it('Get next CheckableWords', function() {
    const boggleBoard = new BoggleBoard([['a','b','c'],
                                         ['d','e','f'],
                                         ['g','h','i']]);
    
    const a = new CheckableWord(new BoggleSquare('a',0,0));
    const next = boggleBoard.getNextCheckableWords(a);
    assert.equal(next.length,3);
    const d = a.nextCheckableWord(new BoggleSquare('d',0,1));
    const b = a.nextCheckableWord(new BoggleSquare('b',1,0));
    const e = a.nextCheckableWord(new BoggleSquare('e',1,1));
    compareWords(next[0],d);
    compareWords(next[1],b);
    compareWords(next[2],e);
  });

  it('the whole shebang from a point',function() {
    const trie = new Trie();
    trie.insert('ant');
    trie.insert('an');
    trie.insert('apple');
    const boggleBoard = new BoggleBoard([['a','n','c'],
                                         ['d','t','f'],
                                         ['g','h','i']],trie);
    const words = boggleBoard.walk(0,0);
    assert.deepEqual(words,['an','ant']);
  });

  it('the whole shebang',function() {
    const trie = new Trie();
    trie.insert('ant');
    trie.insert('an');
    trie.insert('apple');
    trie.insert('cnt');
    trie.insert('ifhtgdna');
    trie.insert('nthfi');
    trie.insert('nthf');
    trie.insert('ana');
    const boggleBoard = new BoggleBoard([['a','n','c'],
                                         ['d','t','f'],
                                         ['g','h','i']],trie);
    const words = boggleBoard.findAllWords();
    assert.deepEqual(words,[ 'an', 'ant', 'nthf', 'nthfi', 'cnt', 'ifhtgdna' ]);
  });
});

function compareWords(w1,w2) {
  assert.equal(w1.word,w2.word);
  assert.deepEqual(w1.seenSquares,w2.seenSquares);
  assert.deepEqual(w1.curSquare,w2.curSquare);
}

describe('CheckableWord', function() {
  it('checks unseenids',function() {
    const checkableWord = new CheckableWord(new BoggleSquare('a',1,1));
    checkableWord.seenSquares['0 0'] = 'something';
    const unseenIds = checkableWord.unseenIds(['0 0','1 1','1 2','1 3']);
    assert.deepEqual(unseenIds, ['1 2','1 3']);
  });

  it('next checkable word', function() {
    const square1 = new BoggleSquare('a',1,1);
    const square2 = new BoggleSquare('b',2,2);
    const firstWord = new CheckableWord(square1);
    const nextWord = firstWord.nextCheckableWord(square2);
    assert.equal(nextWord.word,'ab');
    assert.deepEqual(nextWord.seenSquares,{'1 1':square1,'2 2':square2});
    assert.deepEqual(nextWord.curSquare, square2);
  });
}); 
