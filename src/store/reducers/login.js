import { SET_LOGIN_TYPE, SET_GOOGLE_USER, SET_FACEBOOK_USER } from '../actions/login';

const initialState = {
  loginType: '',
  googleUser: {},
  facebookUser: {},
};

const loadReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_TYPE:
      return { ...state, logintype: action.loginType };
    case SET_GOOGLE_USER:
      return { ...state, googleUser: action.user };
    case SET_FACEBOOK_USER:
      return { ...state, facebookUser: action.user };
    default:
      return state;
  }
};

export default loadReducer;
