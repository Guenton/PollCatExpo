export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_PASSWORD_CONFIRM = 'SET_PASSWORD_CONFIRM';
export const SET_RESET_CODE = 'SET_RESET_CODE';

export const setEmail = (input = '') => ({ type: SET_EMAIL, input });
export const setPassword = (input = '') => ({ type: SET_PASSWORD, input });
export const setPasswordConfirm = (input = '') => ({ type: SET_PASSWORD_CONFIRM, input });
export const setResetCode = (input = '') => ({ type: SET_RESET_CODE, input });
