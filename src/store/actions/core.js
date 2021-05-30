export const SET_LOADING = 'SET_LOADING';
export const SET_KEYBOARD_OPEN = 'SET_KEYBOARD_OPEN';

export const setLoading = (bool = true) => ({ type: SET_LOADING, bool });
export const setKeyboardOpen = (bool = true) => ({ type: SET_KEYBOARD_OPEN, bool });
