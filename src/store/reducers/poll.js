import {
  SET_POLL_OPEN,
  SET_SELECTED_POLL,
  SET_POLL_ID,
  SET_POLL_TITLE,
  SET_ERR_POLL_TITLE,
} from '../actions/poll';

const initialState = {
  isOpen: false,
  selectedPoll: '',
  id: null,
  pollTitle: '',
  errPollTitle: '',
};

const coreReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POLL_OPEN:
      return { ...state, isOpen: action.bool };
    case SET_SELECTED_POLL:
      return { ...state, selectedPoll: action.input };
    case SET_POLL_ID:
      return { ...state, id: action.input };
    case SET_POLL_TITLE:
      return { ...state, pollTitle: action.input };
    case SET_ERR_POLL_TITLE:
      return { ...state, errPollTitle: action.err };
    default:
      return state;
  }
};

export default coreReducer;
