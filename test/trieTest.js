/*eslint-env mocha */

const assert = require('assert');
const Trie = require(process.cwd() + '/lib/trie').Trie;

describe('Trie', function() {
  it('Insert and find prefix not word', function() {
    const trie = new Trie();
    trie.insert('hi');
    assert.deepEqual(trie.find('h'),{isPrefix: true, isWord: false});
  });

  it('Insert and find word', function() {
    const trie = new Trie();
    trie.insert('hi');
    assert.deepEqual(trie.find('hi'),{isPrefix: true, isWord: true});
  });

  it('Insert and find out its not even a prefix', function() {
    const trie = new Trie();
    trie.insert('hi');
    assert.deepEqual(trie.find('a'),{isPrefix: false, isWord: false});
  });

  it('Doesnt blow up if you havent inserted anything yet', function() {
    const trie = new Trie();
    assert.deepEqual(trie.find('a'),{isPrefix: false, isWord: false});
  });

  it('Doesnt blow up if you search for nothing', function() {
    const trie = new Trie();
    assert.deepEqual(trie.find(''),{isPrefix: false, isWord: false});
  });
  
  it('If you insert nothing and search for nothing it shouldnt be a word', function() {
    const trie = new Trie();
    trie.insert('');
    assert.deepEqual(trie.find(''),{isPrefix: false, isWord: false});
  });
});
