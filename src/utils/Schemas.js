import {arrayOf, Schema} from 'normalizr';

const article = new Schema('articles');

export const SCHEMAS = {
  ARTICLES_ARRAY: arrayOf(article)
}