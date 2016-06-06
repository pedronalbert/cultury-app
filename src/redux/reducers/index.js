import {combineReducers} from 'redux';
import articles from './ArticlesReducer';
import entities from './EntitiesReducer';

const mainReducer = combineReducers({
  articles,
  entities
});

export default mainReducer;