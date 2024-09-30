// action.js
export const SET_COLORS_DATA = 'SET_COLORS_DATA';
export const SET_CURRENT_COLOR = 'SET_CURRENT_COLOR';

export const setColorsData = (payload) => ({
  type: SET_COLORS_DATA,
  payload,
});

export const setCurrentColor = (payload) => ({
  type: SET_CURRENT_COLOR,
  payload,
});
