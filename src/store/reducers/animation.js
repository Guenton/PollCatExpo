import { SET_CURTAIN_HEIGHT, SET_CURTAIN_COLOR } from '../actions/animation';
import { white } from '../../global/colors';

const initialState = {
  curtain: {
    height: 0,
    color: white,
  },
};

const animationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURTAIN_HEIGHT:
      return { ...state, curtain: { ...state.curtain, height: action.height } };
    case SET_CURTAIN_COLOR:
      return { ...state, curtain: { ...state.curtain, color: action.color } };
    default:
      return state;
  }
};

export default animationReducer;
