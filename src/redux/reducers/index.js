import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import moveReducer from './moveReducer';
import routesReducer from './routesReducer';

const rootReducers = combineReducers({
  errors: errorReducer,
  movies: moveReducer,
  routes: routesReducer,
  loaders: ''
});

export default rootReducers;
