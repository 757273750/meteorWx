export const SET_PREVIOUS_PATHNAME = 'SET_PREVIOUS_PATHNAME';
export const SET_CURRENT_PATHNAME = 'SET_CURRENT_PATHNAME';

export const setPreviousPathname = (pathname) => ({
  type: SET_PREVIOUS_PATHNAME,
  pathname,
});

export const setCurrentPathname = (pathname) => ({
  type: SET_CURRENT_PATHNAME,
  pathname,
});
