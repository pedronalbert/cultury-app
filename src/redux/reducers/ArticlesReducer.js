/* Dependencies */
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  ids: [],
  fetching: false
});


export default function articles (state = initialState, action) {
  if (action.type == 'FETCH_ARTICLES_REQUEST') {
    return state.set('fetching', true);
  }

  if (action.type == 'FETCH_ARTICLES_SUCCESS') {
    let newIds = action.payload.result;

    state = state.set('fetching', false);
    state = state.mergeIn(['ids'], Immutable.List(newIds));
    
    return state;
  }

  return state;
}
