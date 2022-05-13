import {
  SET_POLL_OPEN,
  SET_SELECTED_POLL,
  SET_POLL_ID,
  SET_POLL_TITLE,
  SET_ERR_POLL_TITLE,
  SET_USER_EMAIL,
  SET_ERR_USER_EMAIL,
  SET_QUESTION_NUMBER,
  INCREMENT_QUESTION_NUMBER,
  DECREMENT_QUESTION_NUMBER,
  SET_ALL_POLLS_OBJECT,
  SET_SELECTED_POLL_OBJECT,
  SET_RESPONSE_OPTIONS,
  SET_SELECTABLE_POLL_USERS,
  SET_DEFAULT_RESPONSE_OPTION,
  SET_CURRENT_POLL_QUESTION,
  SET_CURRENT_POLL_QUESTION_ASK,
  SET_CURRENT_POLL_QUESTION_RESPONSES,
  SET_CURRENT_POLL_QUESTION_TOTAL,
  INCREMENT_CURRENT_POLL_QUESTION,
  DECREMENT_CURRENT_POLL_QUESTION,
} from '../actions/poll';

const initialState = {
  isOpen: false,
  selectedPoll: '',
  id: null,
  pollTitle: '',
  errPollTitle: '',
  userEmail: '',
  errUserEmail: '',
  questionNumber: '1',
  allPollsObject: {},
  selectedPollObject: {},
  responseOptions: [],
  selectablePollUsers: [],
  defaultResponseOption: '',
  currentPollQuestion: {
    number: '1',
    ask: '',
    responseOption: '',
    responses: [],
    answer: '',
  },
  currentPollQuestionTotal: null,
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
    case SET_QUESTION_NUMBER:
      return { ...state, questionNumber: action.input };
    case INCREMENT_QUESTION_NUMBER:
      return { ...state, questionNumber: (parseInt(state.questionNumber) + 1).toString() };
    case DECREMENT_QUESTION_NUMBER:
      return {
        ...state,
        questionNumber:
          parseInt(state.questionNumber) > 1
            ? (parseInt(state.questionNumber) - 1).toString()
            : '1',
      };
    case SET_ALL_POLLS_OBJECT:
      return { ...state, allPollsObject: action.object };
    case SET_SELECTED_POLL_OBJECT:
      return { ...state, selectedPollObject: action.object };
    case SET_RESPONSE_OPTIONS:
      return { ...state, responseOptions: action.array };
    case SET_SELECTABLE_POLL_USERS:
      return { ...state, selectablePollUsers: action.array };
    case SET_DEFAULT_RESPONSE_OPTION:
      return { ...state, defaultResponseOption: action.input };
    case SET_CURRENT_POLL_QUESTION:
      return { ...state, currentPollQuestion: action.object };
    case SET_CURRENT_POLL_QUESTION_ASK:
      return {
        ...state,
        currentPollQuestion: { ...state.currentPollQuestion, ask: action.input },
      };
    case SET_CURRENT_POLL_QUESTION_RESPONSES:
      return {
        ...state,
        currentPollQuestion: { ...state.currentPollQuestion, responses: action.array },
      };
    case SET_CURRENT_POLL_QUESTION_TOTAL:
      return { ...state, currentPollQuestionTotal: action.int };
    case INCREMENT_CURRENT_POLL_QUESTION:
      return {
        ...state,
        currentPollQuestion: {
          ...state.currentPollQuestion,
          number: (parseInt(state.currentPollQuestion.number) + 1).toString(),
        },
      };
    case DECREMENT_CURRENT_POLL_QUESTION:
      return {
        ...state,
        currentPollQuestion: {
          ...state.currentPollQuestion,
          number:
            parseInt(state.currentPollQuestion.number) > 1
              ? (parseInt(state.currentPollQuestion.number) - 1).toString()
              : '1',
        },
      };
    default:
      return state;
  }
};

export default coreReducer;
