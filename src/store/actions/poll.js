export const SET_POLL_OPEN = 'SET_POLL_OPEN';
export const SET_SELECTED_POLL = 'SET_SELECTED_POLL';
export const SET_POLL_ID = 'SET_POLL_ID';
export const SET_POLL_TITLE = 'SET_POLL_TITLE';

export const setPollOpen = (bool = true) => ({ type: SET_POLL_OPEN, bool });
export const setSelectedPoll = (input = '') => ({ type: SET_SELECTED_POLL, input });
export const setPollId = (input = null) => ({ type: SET_POLL_ID, input });
export const setPollTitle = (input = '') => ({ type: SET_POLL_TITLE, input });
