const fs = require("fs");

const wordListPath = require("word-list");
const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');

let threeLetterWords = [], fourLetterWords = [], fiveLetterWords = [], sixLetterWords = [];

const SpellChecker = require('simple-spellchecker');
SpellChecker.getDictionary("en-US", "./node_modules/simple-spellchecker/dict", async function(err, dictionary) {
  if(!err) {
    const list = await wordArray.map(word => {
      const spellCheck = dictionary.spellCheck(word);
      if(spellCheck) {
        if(word.length === 3) {
          threeLetterWords.push(word);
        } else if(word.length === 4) {
          fourLetterWords.push(word);
        } else if(word.length === 5) {
          fiveLetterWords.push(word);
        } else if(word.length === 6) {
          sixLetterWords.push(word);
        }
      }
      return 1;
    });

    await Promise.all(list);
    fs.writeFileSync('filteredWords/threeLetterWords.txt', threeLetterWords.toString().split(',').join('\n'));
    fs.writeFileSync('filteredWords/fourLetterWords.txt', fourLetterWords.toString().split(',').join('\n'));
    fs.writeFileSync('filteredWords/fiveLetterWords.txt', fiveLetterWords.toString().split(',').join('\n'));
    fs.writeFileSync('filteredWords/sixLetterWords.txt', sixLetterWords.toString().split(',').join('\n'));
  }
});
