import { SET_LOADING } from '../actions/core';

const initialState = {
  isLoading: false,
};

const coreReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.bool };
    default:
      return state;
  }
};

export default coreReducer;
