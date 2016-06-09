/* Dependencies */
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  ids: [],
  meta: {
    page_number: 0,
    page_count: 1
  },
  fetching: false
});


export default function articles (state = initialState, action) {
  if (action.type == 'FETCH_ARTICLES_REQUEST') {
    return state.set('fetching', true);
  }

  if (action.type == 'FETCH_ARTICLES_SUCCESS') {
    let newState = state.withMutations(state => {
      let newIds = state.get('ids').concat(action.payload.result);

      state.set('fetching', false);
      state.set('ids', newIds);
      state.set('meta', Immutable.Map(action.meta));
    });

    return newState;
  }

  return state;
}
