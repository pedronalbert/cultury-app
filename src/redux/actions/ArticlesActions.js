import {CALL_API} from '../middlewares/apiMiddleware';
import {SCHEMAS} from '../../utils/Schemas';

export const loadArticles = () => {
  return {
    [CALL_API]: {
      type: 'FETCH_ARTICLES',
      url: '/articles',
      method: 'GET',
      schema: SCHEMAS.ARTICLES_ARRAY
    }
  };
};