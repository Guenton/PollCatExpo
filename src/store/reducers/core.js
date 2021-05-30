import { SET_LOADING, SET_KEYBOARD_OPEN } from '../actions/core';

const initialState = {
  isLoading: false,
  isKeyboardOpen: false,
};

const coreReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.bool };
    case SET_KEYBOARD_OPEN:
      return { ...state, isKeyboardOpen: action.bool };
    default:
      return state;
  }
};

export default coreReducer;
