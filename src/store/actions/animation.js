import { white } from '../../global/colors';

export const SET_CURTAIN_HEIGHT = 'SET_CURTAIN_HEIGHT';
export const SET_CURTAIN_COLOR = 'SET_CURTAIN_COLOR';

export const setCurtainHeight = (height = 0) => ({ type: SET_CURTAIN_HEIGHT, height });
export const setCurtainColor = (color = white) => ({ type: SET_CURTAIN_COLOR, color });
