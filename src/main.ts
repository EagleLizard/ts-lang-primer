
import {
  BOOKS,
} from './lib/constants';
import { getBook } from './lib/book-service';
import {
  filterCommonWords,
  getBookCharMap,
  getBookWordMap,
} from './lib/parse-book';

const COUNT_PRINT_LEN = 50;

export async function main() {
  let book: BOOKS, bookData: string;
  let charMap: Map<string, number>, wordMap: Map<string, number>;
  let charTuples: [ string, number ][];
  let wordTuples: [ string, number ][];
  book = BOOKS.MANIFESTO;
  bookData = await getBook(book);
  charMap = getBookCharMap(bookData);
  wordMap = getBookWordMap(bookData);
  charTuples = [ ...charMap ];
  wordTuples = [ ...wordMap ];
  charTuples.sort(countTupleComparatorDesc);
  wordTuples.sort(countTupleComparatorDesc);

  console.log('words:');
  wordTuples.slice(0, COUNT_PRINT_LEN).forEach(wordTuple => {
    console.log(wordTuple);
  });
}

function countTupleComparatorDesc(a: [ string, number ], b: [ string, number ]): number {
  let aVal: number, bVal: number;
  [ , aVal ] = a;
  [ , bVal ] = b;
  if(aVal < bVal) {
    return 1;
  } else if(aVal > bVal) {
    return -1;
  } else {
    return 0;
  }
}
