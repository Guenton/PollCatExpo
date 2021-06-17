import { TOGGLE_DARK, SET_LOADING, SET_KEYBOARD_OPEN, SET_ALERT, SET_ROUTE } from '../actions/core';

const initialState = {
  isDark: false,
  isLoading: false,
  isKeyboardOpen: false,
  route: 'login-biometric',
  alert: {
    text: '',
    severity: 'error',
  },
};

const coreReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARK:
      return { ...state, isDark: !state.isDark };
    case SET_ROUTE:
      return { ...state, route: action.route };
    case SET_LOADING:
      return { ...state, isLoading: action.bool };
    case SET_KEYBOARD_OPEN:
      return { ...state, isKeyboardOpen: action.bool };
    case SET_ALERT:
      return { ...state, alert: { ...state.alert, text: action.text, severity: action.severity } };
    default:
      return state;
  }
};

export default coreReducer;
