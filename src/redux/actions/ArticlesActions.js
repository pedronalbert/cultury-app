import {CALL_API} from '../middlewares/apiMiddleware';
import {SCHEMAS} from '../../utils/Schemas';

export const loadArticles = (page_number) => {
  return {
    [CALL_API]: {
      type: 'FETCH_ARTICLES',
      url: '/articles',
      params: {page_number: page_number},
      method: 'GET',
      schema: SCHEMAS.ARTICLES_ARRAY
    }
  };
};

export const resetArticlesError = () => {
  return {
    type: 'ARTICLES_RESET_ERROR'
  };
};