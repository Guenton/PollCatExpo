export const SET_LOGIN_TYPE = 'SET_LOGIN_TYPE';
export const SET_GOOGLE_USER = 'SET_GOOGLE_USER';
export const SET_FACEBOOK_USER = 'SET_FACEBOOK_USER';

export const setLoginType = (loginType = '') => ({ type: SET_LOGIN_TYPE, loginType });
export const setGoogleUser = (user = {}) => ({ type: SET_GOOGLE_USER, user });
export const setFacebookUser = (user = {}) => ({ type: SET_FACEBOOK_USER, user });
