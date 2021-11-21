import { COMMON_WORDS } from './constants';

const COMMON_WORDS_LOWER = COMMON_WORDS.map(word => word.toLowerCase());

export function getBookCharMap(bookData: string) {
  let lines: string[], charMap: Map<string, number>;
  charMap = new Map;
  lines = bookData.split('\n');
  for(let i = 0; i < lines.length; ++i) {
    let spaltLine: string[];
    spaltLine = lines[i].trim().split('');
    for(let k = 0, currChar: string; currChar = spaltLine[k], k < spaltLine.length; ++k) {
      if(!charMap.has(currChar)) {
        charMap.set(currChar, 0);
      }
      charMap.set(currChar, charMap.get(currChar) + 1);
    }
  }
  return charMap;
}

export function getBookWordMap(bookData: string) {
  let lines: string[], wordMap: Map<string, number>;
  wordMap = new Map;
  lines = bookData.split('\n');
  for(let i = 0; i < lines.length; ++i) {
    let spaltLine: string[];
    spaltLine = lines[i].trim().split(' ');
    for(let k = 0; k < spaltLine.length; ++k) {
      let currWord: string;
      currWord = spaltLine[k].trim();
      if(currWord.length > 0) {
        if(!wordMap.has(currWord)) {
          wordMap.set(currWord, 0);
        }
        wordMap.set(currWord, wordMap.get(currWord) + 1);
      }
    }
  }
  return wordMap;
}

export function filterCommonWords(wordTuples: [ string, number ][]): [ string, number ][] {
  let filteredWordTuples: [ string, number ][];
  filteredWordTuples = wordTuples.filter(wordTuple => {
    let word: string;
    word = wordTuple[0].toLowerCase();
    return !COMMON_WORDS_LOWER.includes(word);
  });
  return filteredWordTuples;
}

//The Project Gutenberg EBook
//www.gutenberg.org
export function removeGutenbergHeader(bookData: string) {
  const START_STR = 'The Project Gutenberg';
  let hasHeader: boolean;
  let startIdx: number, endIdx: number;
  hasHeader = /^\s*The Project Gutenberg [eE]Book/.test(bookData);
  if(!hasHeader) {
    return bookData;
  }
  startIdx = bookData.search(START_STR);
  const rxEndMatch = bookData.match(/\*{3}[ A-Z]*GUTENBERG[ A-Z]*\*{3}/);
  endIdx = rxEndMatch.index + rxEndMatch[0].length;
  return removeSubstring(bookData, startIdx, endIdx);
}

export function removeGutenbergFooter(bookData: string) {
  const START_STR_A = 'End of the Project Gutenberg';
  let hasFooter: boolean;
  let startIdx: number, endIdx: number;
  hasFooter = bookData.includes(START_STR_A)
    || /\*{3}[ A-Z]*END[ A-Z]*GUTENBERG[ A-Z]*\*{3}/.test(bookData);
  if(!hasFooter) {
    return bookData;
  }
  const rxEndMatch = bookData.match(/\*{3}[ A-Z]*END[ A-Z]*GUTENBERG[ A-Z]*\*{3}/);
  startIdx = bookData.search(START_STR_A);
  if(startIdx === -1) {
    startIdx = rxEndMatch.index;
  }
  console.log(startIdx);
  endIdx = bookData.length - 1;
  return removeSubstring(bookData, startIdx, endIdx);
}

function removeSubstring(str: string, fromIdx: number, toIdx: number) {
  return `${str.substring(0, fromIdx)}${str.substring(toIdx)}`;
}
