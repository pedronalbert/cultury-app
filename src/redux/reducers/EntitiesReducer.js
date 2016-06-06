/* Dependencies */
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  articles: {},
  users: {}
});


export default function entities (state = initialState, action) {

  if(action.payload && action.payload.entities) {
    let entities = action.payload.entities;

    return state.merge(Immutable.fromJS(entities));
  }

  return state;
}
