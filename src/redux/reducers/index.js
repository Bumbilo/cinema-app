import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import moveReducer from './moveReducer';

const rootReducers = combineReducers({
  errors: errorReducer,
  movies: moveReducer,
  loaders: ''
});

export default rootReducers;
