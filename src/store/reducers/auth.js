import { SET_EMAIL, SET_PASSWORD, SET_PASSWORD_CONFIRM, SET_RESET_CODE } from '../actions/auth';

const initialState = {
  email: '',
  password: '',
  passwordConfirm: '',
  resetCode: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.input };
    case SET_PASSWORD:
      return { ...state, password: action.input };
    case SET_PASSWORD_CONFIRM:
      return { ...state, passwordConfirm: action.input };
    case SET_RESET_CODE:
      return { ...state, resetCode: action.input };
    default:
      return state;
  }
};

export default authReducer;
