import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { route } from './route.js';

const reducers = combineReducers({
  routing: routerReducer,
  route,
});

export default reducers;
