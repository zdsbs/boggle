'use strict';

let id = 0;
function nextId() {
  return id++;
}

function TrieNode(letter = '') {
  this.letter = letter;
  this.id = nextId();
  this.isWord = false;
  this.children = {};
}

function Trie() {
  this.root = new TrieNode();

  this.insert = function(word) {
    let curNode = this.root;
    for(let i = 0; i < word.length; i++) {
      const letter = word[i];
      if(curNode.children[letter]) {
        curNode = curNode.children[letter];
      } else {
        const child = new TrieNode(letter);
        curNode.children[letter] = child;
        curNode = child;
      }
    }
    curNode.isWord = true;
  };

  this.find = function(word) {
    if(!word) {
      return {isPrefix: false, isWord: false};
    }

    let curNode = this.root;
    for(let i = 0; i < word.length; i++) {
      const letter = word[i];
      if(curNode.children[letter]) {
        curNode = curNode.children[letter];
      } else {
        return {isPrefix: false, isWord: false};
      }
    }
    return {isPrefix: true, isWord: curNode.isWord};
  };

  /*
   * for visualization fun - real slow, hacked together
   */
  this.getDotGraph = function() {
    function getChildren(parent) {
      return Object.keys(parent).map(function(k) {
        return parent[k];
      });
    }
    let dotGraph = 'digraph {\n';

    let queue = getChildren(this.root.children);
    while(queue.length > 0) {
      const node = queue.shift();
      const children = getChildren(node.children);
      children.forEach(function (c) {
        dotGraph = dotGraph + node.letter+node.id +'->'+c.letter+c.id + '\n';
      });
      dotGraph = dotGraph + node.letter+node.id + ' [label='+node.letter+']\n';
      if(node.isWord) {
        dotGraph = dotGraph + node.letter+node.id + ' [shape=box]\n';
      } else {
        dotGraph = dotGraph + node.letter+node.id + ' [shape=diamond]\n';
      }
      id++;
      queue = queue.concat(children);
    }
    dotGraph = dotGraph + '}';
    return dotGraph;
  };

}

module.exports.Trie = Trie;
