import { scale } from 'react-native-size-matters';
import { grey, white } from '../../global/colors';

export const SET_CURTAIN_HEIGHT = 'SET_CURTAIN_HEIGHT';
export const SET_CURTAIN_COLOR = 'SET_CURTAIN_COLOR';

export const SET_GRADIENT_PAW_BUTTON_WIDTH = 'SET_GRADIENT_PAW_BUTTON_WIDTH';
export const SET_GRADIENT_PAW_BUTTON_COLOR = 'SET_GRADIENT_PAW_BUTTON_COLOR';
export const SET_GRADIENT_PAW_BUTTON_GRADIENT = 'SET_GRADIENT_PAW_BUTTON_GRADIENT';

export const SET_USER_ROUTE_ICON_COLOR = 'SET_USER_ROUTE_ICON_COLOR';
export const SET_ADMIN_ROUTE_ICON_COLOR = 'SET_ADMIN_ROUTE_ICON_COLOR';
export const SET_UNDERSCORE_POSITION = 'SET_UNDERSCORE_POSITION';

export const setCurtainHeight = (height = 0) => ({
  type: SET_CURTAIN_HEIGHT,
  height,
});
export const setCurtainColor = (color = white) => ({
  type: SET_CURTAIN_COLOR,
  color,
});

export const setGradientPawButtonWidth = (width = 0) => ({
  type: SET_GRADIENT_PAW_BUTTON_WIDTH,
  width,
});
export const setGradientPawButtonColor = (color = white) => ({
  type: SET_GRADIENT_PAW_BUTTON_COLOR,
  color,
});
export const setGradientPawButtonGradient = (color = white) => ({
  type: SET_GRADIENT_PAW_BUTTON_GRADIENT,
  color,
});

export const setUserRouteIconColor = (color = grey) => ({
  type: SET_ADMIN_ROUTE_ICON_COLOR,
  color,
});
export const setAdminRouteIconColor = (color = grey) => ({
  type: SET_ADMIN_ROUTE_ICON_COLOR,
  color,
});
export const setUnderscorePosition = (left = scale(77)) => ({
  type: SET_UNDERSCORE_POSITION,
  left,
});
