
import path from 'path';

/*
  Sourced from: https://en.wikipedia.org/wiki/Most_common_words_in_English
*/
const WIKI_COMMON_WORDS = [ 'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us' ];

const COMMON_WORDS_OTHER = [
  'is',
  'are',
  'has',
];
export const COMMON_WORDS = [
  ...WIKI_COMMON_WORDS,
  ...COMMON_WORDS_OTHER,
];

export const DATA_DIR_NAME = 'test-data';

export const PROJECT_ROOT = path.resolve(__dirname, '../../..');
export const DATA_DIR = path.join(PROJECT_ROOT, DATA_DIR_NAME);

export enum BOOKS {
  MANIFESTO = 'MANIFESTO',
  THE_PRINCE = 'THE_PRINCE',
  HAMLET = 'HAMLET',
  ART_OF_WAR = 'ART_OF_WAR',
}
