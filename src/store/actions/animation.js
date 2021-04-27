import { white } from '../../global/colors';

export const SET_CURTAIN_HEIGHT = 'SET_CURTAIN_HEIGHT';
export const SET_CURTAIN_COLOR = 'SET_CURTAIN_COLOR';

export const SET_GRADIENT_PAW_BUTTON_WIDTH = 'SET_GRADIENT_PAW_BUTTON_WIDTH';
export const SET_GRADIENT_PAW_BUTTON_COLOR = 'SET_GRADIENT_PAW_BUTTON_COLOR';
export const SET_GRADIENT_PAW_BUTTON_GRADIENT = 'SET_GRADIENT_PAW_BUTTON_GRADIENT';

export const setCurtainHeight = (height = 0) => ({ type: SET_CURTAIN_HEIGHT, height });
export const setCurtainColor = (color = white) => ({ type: SET_CURTAIN_COLOR, color });

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
