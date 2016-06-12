import {CALL_API} from '../middlewares/apiMiddleware';
import {SCHEMAS} from '../../utils/Schemas';

const fetch = (params) => {
  return (dispatch, getState) => {
    let searchText = getState().articles.get('searchText');

    if (searchText) {
      params.search = searchText;
    }

    return dispatch({
      [CALL_API]: {
        type: 'FETCH_ARTICLES',
        url: '/articles',
        params: params,
        method: 'GET',
        schema: SCHEMAS.ARTICLES_ARRAY
      }
    });
  };
};

const resetError = () => {
  return {
    type: 'ARTICLES_RESET_ERROR'
  };
};

const resetList = () => {
  return {
    type: 'ARTICLES_RESET_LIST'
  }
};

const setSearchText = (searchText) => {
  return {
    type: 'ARTICLES_SET_SEARCH_TEXT',
    payload: {
      searchText: searchText
    }
  }
}

export default {
  fetch: fetch,
  resetError: resetError,
  resetList: resetList,
  setSearchText: setSearchText
};