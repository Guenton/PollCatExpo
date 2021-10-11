import {
  SET_POLL_OPEN,
  SET_SELECTED_POLL,
  SET_POLL_ID,
  SET_POLL_TITLE,
  SET_ERR_POLL_TITLE,
  SET_USER_EMAIL,
  SET_ERR_USER_EMAIL,
  SET_ALL_POLLS_OBJECT,
  SET_SELECTED_POLL_OBJECT,
  SET_RESPONSE_OPTIONS,
  SET_DEFAULT_RESPONSE_OPTION,
} from '../actions/poll';

const initialState = {
  isOpen: false,
  selectedPoll: '',
  id: null,
  pollTitle: '',
  errPollTitle: '',
  userEmail: '',
  errUserEmail: '',
  allPollsObject: {},
  selectedPollObject: {},
  responseOptions: [],
  defaultResponseOption: '',
  currentPollQuestion: {
    number: null,
    question: '',
    responseOption: '',
    responses: [],
  },
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
    case SET_USER_EMAIL:
      return { ...state, userEmail: action.input };
    case SET_ERR_USER_EMAIL:
      return { ...state, errUserEmail: action.err };
    case SET_ALL_POLLS_OBJECT:
      return { ...state, allPollsObject: action.object };
    case SET_SELECTED_POLL_OBJECT:
      return { ...state, selectedPollObject: action.object };
    case SET_RESPONSE_OPTIONS:
      return { ...state, responseOptions: action.array };
    case SET_DEFAULT_RESPONSE_OPTION:
      return { ...state, defaultResponseOption: action.input };
    default:
      return state;
  }
};

export default coreReducer;
