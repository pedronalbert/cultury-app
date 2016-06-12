/* Dependencies */
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  ids: [],
  searchText: '',
  meta: {
    page_number: 0,
    page_count: 0
  },
  errorMessage: '',
  fetching: false
});


export default function articles (state = initialState, action) {
  if (action.type == 'FETCH_ARTICLES_REQUEST') {
    return state.set('fetching', true);
  }

  if (action.type == 'FETCH_ARTICLES_SUCCESS') {
    let newState = state.withMutations(state => {
      let newIds = state.get('ids').concat(action.payload.result);

      state.set('errorMessage', '');
      state.set('fetching', false);
      state.set('ids', newIds);
      state.set('meta', Immutable.Map(action.meta));
    });

    return newState;
  }

  if (action.type == 'FETCH_ARTICLES_FAIL') {
    let newState = state.withMutations(state => {
      state.set('fetching', false);
      state.set('errorMessage', action.payload.message);
    });

    return newState;
  }

  if (action.type == 'ARTICLES_RESET_ERROR') {
    return state.set('errorMessage', '');
  }

  if (action.type == 'ARTICLES_RESET_LIST') {
    return state.withMutations(state => {
      state.set('ids', Immutable.List([]));
      state.setIn(['meta', 'page_count'], 0);
    });
  }

  if (action.type == 'ARTICLES_SET_SEARCH_TEXT') {
    return state.set('searchText', action.payload.searchText);
  }

  return state;
}
