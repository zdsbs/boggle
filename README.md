# Running stuff

Run one Test
```
./node_modules/.bin/mocha test/trieTest.js
```

Run all the Tests
```
npm test
```

eslint
```
./node_modules/.bin/eslint test/
./node_modules/.bin/eslint lib/
```

## Trie it on the command line

```
node scripts/boggleSolver.js abcdefghijklmnop
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
## Debugging

Wanna see what the trie looks like for a small word sample?

Diamonds are possibly words, squares are necessarily words 
```
node scripts/printDot.js collins_scrabble_words_2015.500.txt > collins_scrabble_words_2015.500.dot && dot -Tpng collins_scrabble_words_2015.500.dot -o collins_scrabble_words_2015.500.png
```

