# Setups

Using: 
```
$ node --version
v10.15.1

$ npm --version
6.4.1
```

# Running stuff

Run one Test
```
./node_modules/.bin/mocha test/trieTest.js
```

Run all the Tests
```
npm test
```

## Trie it on the command line

```
node scripts/boggleSolver.js abcdefghijklmnop
```

## Trie it in the browser
```
node index.js
```

or in dev
```
npm run dev
```

Hit it at:
```
http://localhost:3000
```

# Boggle Stuff

Trie
```
https://www.youtube.com/watch?v=CX777rfuZtM
```

dictionary:
```
https://boardgames.stackexchange.com/questions/38366/latest-collins-scrabble-words-list-in-text-file
https://drive.google.com/file/d/0B9-WNydZzCHrdDVEc09CamJOZHc/view
```

Note: For this version of boggle 'Qu' is not one cube and we do print duplicates

## Debugging

Wanna see what the trie looks like for a small word sample?

To instal dot see: https://www.graphviz.org

Diamonds are possibly words, squares are necessarily words 
```
node scripts/printDot.js collins_scrabble_words_2015.500.txt > collins_scrabble_words_2015.500.dot && dot -Tpng collins_scrabble_words_2015.500.dot -o collins_scrabble_words_2015.500.png
```

