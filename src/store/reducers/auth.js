import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_PASSWORD_CONFIRM,
  SET_RESET_CODE,
  SET_ERR_EMAIL,
  SET_ERR_PASSWORD,
  SET_ERR_PASSWORD_CONFIRM,
  SET_ERR_RESET_CODE,
} from '../actions/auth';

const initialState = {
  email: '',
  password: '',
  passwordConfirm: '',
  resetCode: '',
  errEmail: '',
  errPassword: '',
  errPasswordConfirm: '',
  errResetCode: '',
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
    case SET_ERR_EMAIL:
      return { ...state, errEmail: action.err };
    case SET_ERR_PASSWORD:
      return { ...state, errPassword: action.err };
    case SET_ERR_PASSWORD_CONFIRM:
      return { ...state, errPasswordConfirm: action.err };
    case SET_ERR_RESET_CODE:
      return { ...state, errResetCode: action.err };
    default:
      return state;
  }
};

export default authReducer;
