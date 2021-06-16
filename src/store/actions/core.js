export const TOGGLE_DARK = 'TOGGLE_DARK';
export const SET_ROUTE = 'SET_ROUTE';
export const SET_LOADING = 'SET_LOADING';
export const SET_KEYBOARD_OPEN = 'SET_KEYBOARD_OPEN';
export const SET_ALERT = 'SET_ALERT';

export const toggleDark = () => ({ type: TOGGLE_DARK });
export const setRoute = (route = 'login-biometric') => ({ type: SET_ROUTE, route });
export const setLoading = (bool = true) => ({ type: SET_LOADING, bool });
export const setKeyboardOpen = (bool = true) => ({ type: SET_KEYBOARD_OPEN, bool });
export const setAlert = (text = '', severity = 'error') => ({ type: SET_ALERT, text, severity });
