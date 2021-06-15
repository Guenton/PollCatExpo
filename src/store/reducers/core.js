import { SET_LOADING, SET_KEYBOARD_OPEN, SET_ALERT, TOGGLE_DARK } from '../actions/core';

const initialState = {
  isDark: false,
  isLoading: false,
  isKeyboardOpen: false,
  alert: {
    text: '',
    severity: 'error',
  },
};

const coreReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARK:
      return { ...state, isDark: !state.isDark };
    case SET_LOADING:
      return { ...state, isLoading: action.bool };
    case SET_KEYBOARD_OPEN:
      return { ...state, isKeyboardOpen: action.bool };
    case SET_ALERT:
      return { ...state, alert: { text: action.text, severity: action.severity } };
    default:
      return state;
  }
};

export default coreReducer;
