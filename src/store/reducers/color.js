/*

---> TL;DR Redux Reducer for Color State <---

*/

// import Actions
import { SET_DARK, SET_LIGHT, TOGGLE_DARK } from '../actions/color';

// Set Initial State
const initialState = {
  isDark: false,
  primary: '#A60A0A',
  primaryTint: '#A60A0A17',
  primaryOpacity: '#A60A0AD0',
  accent: '#FFCC01',
  success: '#AACF39',
  warning: '#F58319',
  error: '#EE161F',
  grey: '#1E1E1E',
  white: '#FFFFFF',
  black: '#000000',
  // Below Not used yet
  secondary: '#43b14a',
  info: '#4f67af',
  secondaryTint: '#43B14A17',
  secondaryOpacity: '#43B14AF0',
};

// Receive Actions and Update State Accordingly
const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DARK:
      return { ...state, isDark: true };
    case SET_LIGHT:
      return { ...state, isDark: false };
    case TOGGLE_DARK:
      return { ...state, isDark: !state.isDark };
    default:
      return state;
  }
};

export default colorReducer;
