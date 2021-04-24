/*

---> TL;DR Redux Reducer for load State <---

*/

// import Actions
import { START_LOADING, STOP_LOADING } from '../actions/load';

// Set Initial State
const initialState = {
  isLoading: false,
};

// Receive Actions and Update State Accordingly
const loadReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default loadReducer;
