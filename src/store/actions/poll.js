export const SET_POLL_OPEN = 'SET_POLL_OPEN';
export const SET_SELECTED_POLL = 'SET_SELECTED_POLL';
export const SET_POLL_ID = 'SET_POLL_ID';
export const SET_POLL_TITLE = 'SET_POLL_TITLE';
export const SET_ERR_POLL_TITLE = 'SET_ERR_POLL_TITLE';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_ERR_USER_EMAIL = 'SET_ERR_USER_EMAIL';
export const SET_ALL_POLLS_OBJECT = 'SET_ALL_POLLS_OBJECT';
export const SET_SELECTED_POLL_OBJECT = 'SET_SELECTED_POLL_OBJECT';

export const setPollOpen = (bool = true) => ({ type: SET_POLL_OPEN, bool });
export const setSelectedPoll = (input = '') => ({ type: SET_SELECTED_POLL, input });
export const setPollId = (input = null) => ({ type: SET_POLL_ID, input });
export const setPollTitle = (input = '') => ({ type: SET_POLL_TITLE, input });
export const setErrPollTitle = (err = '') => ({ type: SET_ERR_POLL_TITLE, err });
export const setUserEmail = (input = '') => ({ type: SET_USER_EMAIL, input });
export const setErrUserEmail = (err = '') => ({ type: SET_ERR_USER_EMAIL, err });
export const setAllPollsObject = (object = {}) => ({ type: SET_ALL_POLLS_OBJECT, object });
export const setSelectedPollObject = (object = {}) => ({ type: SET_SELECTED_POLL_OBJECT, object });
