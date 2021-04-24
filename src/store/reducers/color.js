import { SET_DARK, SET_LIGHT, TOGGLE_DARK } from '../actions/color';

const initialState = { isDark: false };

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
