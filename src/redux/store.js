import { createStore, applyMiddleware } from 'redux';
import Immutable from 'immutable';
import reducer from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import apiMiddleware from './middlewares/apiMiddleware';

const logger = createLogger({
  stateTransformer: (state) => {
    let newState = {};

    for (var i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    };

    return newState;
  }
});

let store = createStore(
  reducer,
  applyMiddleware(
    thunk, 
    logger, 
    apiMiddleware
  )
);

export default store;