import { SET_PREVIOUS_PATHNAME, SET_CURRENT_PATHNAME } from '../actions/route.js';
const initialState = {
  previous: '/',
  current: '/',
  root: '/',
  test: '/test',
};

export const route = (state = initialState, action) => {
  switch (action.type) {
    case SET_PREVIOUS_PATHNAME:
      return Object.assign({}, state, {
        previous: action.pathname,
      });
    case SET_CURRENT_PATHNAME:
      return Object.assign({}, state, {
        current: action.pathname,
      });
    default:
      return state;
  }
};
