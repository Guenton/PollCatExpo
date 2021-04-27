import { white } from '../../global/colors';

import {
  SET_CURTAIN_HEIGHT,
  SET_CURTAIN_COLOR,
  SET_GRADIENT_PAW_BUTTON_WIDTH,
  SET_GRADIENT_PAW_BUTTON_FAB_COLOR,
} from '../actions/animation';

const initialState = {
  curtain: {
    height: 0,
    color: white,
  },
  gradientPawButton: {
    width: 0,
    fabColor: white,
  },
};

const animationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURTAIN_HEIGHT:
      return { ...state, curtain: { ...state.curtain, height: action.height } };
    case SET_CURTAIN_COLOR:
      return { ...state, curtain: { ...state.curtain, color: action.color } };
    case SET_GRADIENT_PAW_BUTTON_WIDTH:
      return {
        ...state,
        gradientPawButton: { ...state.gradientPawButton, width: action.width },
      };
    case SET_GRADIENT_PAW_BUTTON_FAB_COLOR:
      return {
        ...state,
        gradientPawButton: { ...state.gradientPawButton, fabColor: action.color },
      };
    default:
      return state;
  }
};

export default animationReducer;
