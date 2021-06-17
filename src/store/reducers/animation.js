import { scale } from 'react-native-size-matters';
import { blue, grey, white } from '../../global/colors';

import {
  SET_CURTAIN_HEIGHT,
  SET_CURTAIN_COLOR,
  SET_GRADIENT_PAW_BUTTON_WIDTH,
  SET_GRADIENT_PAW_BUTTON_COLOR,
  SET_USER_ROUTE_ICON_COLOR,
  SET_ADMIN_ROUTE_ICON_COLOR,
  SET_UNDERSCORE_POSITION,
} from '../actions/animation';

const initialState = {
  curtain: {
    height: 0,
    color: white,
  },
  gradientPawButton: {
    width: 0,
    color: white,
    gradient: white,
  },
  userRouteIcon: {
    color: grey,
  },
  adminRouteIcon: {
    color: grey,
  },
  underscore: {
    color: blue,
    left: scale(77),
  },
};

const animationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURTAIN_HEIGHT:
      return { ...state, curtain: { ...state.curtain, height: action.height } };
    case SET_CURTAIN_COLOR:
      return { ...state, curtain: { ...state.curtain, color: action.color } };
    case SET_GRADIENT_PAW_BUTTON_WIDTH:
      return { ...state, gradientPawButton: { ...state.gradientPawButton, width: action.width } };
    case SET_GRADIENT_PAW_BUTTON_COLOR:
      return { ...state, gradientPawButton: { ...state.gradientPawButton, color: action.color } };
    case SET_USER_ROUTE_ICON_COLOR:
      return { ...state, userRouteIcon: { ...state.userRouteIcon, color: action.color } };
    case SET_ADMIN_ROUTE_ICON_COLOR:
      return { ...state, adminRouteIcon: { ...state.adminRouteIcon, color: action.color } };
    case SET_UNDERSCORE_POSITION:
      return { ...state, underscore: { ...state.underscore, left: action.left } };
    default:
      return state;
  }
};

export default animationReducer;
