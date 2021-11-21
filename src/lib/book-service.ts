
import { readFile, writeFile } from 'fs/promises';
import fetch, { Response } from 'node-fetch';
import path from 'path';
import { checkFileExists, initDataDir } from '../util/files';

import { BOOKS, DATA_DIR } from './constants';
import { removeGutenbergFooter, removeGutenbergHeader } from './parse-book';

const BOOK_URIS: Record<BOOKS, string> = {
  [BOOKS.HAMLET]: 'https://www.gutenberg.org/ebooks/1524.txt.utf-8',
  [BOOKS.MANIFESTO]: 'https://www.gutenberg.org/ebooks/61.txt.utf-8',
  [BOOKS.THE_PRINCE]: 'https://www.gutenberg.org/files/1232/1232-0.txt',
  [BOOKS.ART_OF_WAR]: 'https://www.gutenberg.org/ebooks/132.txt.utf-8',
};

export const BOOK_NAMES: Record<Partial<BOOKS>, string> = {
  [BOOKS.HAMLET]: 'hamlet',
  [BOOKS.MANIFESTO]: 'communist_manifesto',
  [BOOKS.THE_PRINCE]: 'the_prince',
  [BOOKS.ART_OF_WAR]: 'art_of_war',
};

export async function getBook(book: BOOKS) {
  let bookUri: string, bookResp: Response, bookData: string;
  let bookExists: boolean, bookFilePath: string;

  await initDataDir();
  bookFilePath = getBookPath(book);
  bookExists = await checkFileExists(bookFilePath);
  if(bookExists) {
    bookData = (await readFile(bookFilePath)).toString();
  } else {
    bookUri = BOOK_URIS[book];
    bookResp = await fetch(bookUri);
    bookData = await bookResp.text();
    bookData = removeGutenbergFooter(removeGutenbergHeader(bookData));
    await writeFile(bookFilePath, bookData);
  }
  bookData = removeGutenbergFooter(removeGutenbergHeader(bookData));
  return bookData;
}

export function getBookPath(book: BOOKS): string {
  let bookFileName: string;
  bookFileName = `${BOOK_NAMES[book]}.txt`;
  return path.join(DATA_DIR, bookFileName);
}
