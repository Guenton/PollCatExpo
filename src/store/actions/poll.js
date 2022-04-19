export const SET_POLL_OPEN = 'SET_POLL_OPEN';
export const SET_SELECTED_POLL = 'SET_SELECTED_POLL';
export const SET_POLL_ID = 'SET_POLL_ID';
export const SET_POLL_TITLE = 'SET_POLL_TITLE';
export const SET_ERR_POLL_TITLE = 'SET_ERR_POLL_TITLE';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_ERR_USER_EMAIL = 'SET_ERR_USER_EMAIL';
export const SET_QUESTION_NUMBER = 'SET_QUESTION_NUMBER';
export const INCREMENT_QUESTION_NUMBER = 'INCREMENT_QUESTION_NUMBER';
export const DECREMENT_QUESTION_NUMBER = 'DECREMENT_QUESTION_NUMBER';

export const SET_ALL_POLLS_OBJECT = 'SET_ALL_POLLS_OBJECT';
export const SET_SELECTED_POLL_OBJECT = 'SET_SELECTED_POLL_OBJECT';
export const SET_RESPONSE_OPTIONS = 'SET_RESPONSE_OPTIONS';
export const SET_SELECTABLE_POLL_USERS = 'SET_SELECTABLE_POLL_USERS';

export const SET_DEFAULT_RESPONSE_OPTION = 'SET_DEFAULT_RESPONSE_OPTION';
export const SET_CURRENT_POLL_QUESTION = 'SET_CURRENT_POLL_QUESTION';
export const SET_CURRENT_POLL_QUESTION_ASK = 'SET_CURRENT_POLL_QUESTION_ASK';
export const SET_CURRENT_POLL_QUESTION_RESPONSES = 'SET_CURRENT_POLL_QUESTION_RESPONSES';
export const SET_CURRENT_POLL_QUESTION_TOTAL = 'SET_CURRENT_POLL_QUESTION_TOTAL';
export const INCREMENT_CURRENT_POLL_QUESTION = 'INCREMENT_CURRENT_POLL_QUESTION';
export const DECREMENT_CURRENT_POLL_QUESTION = 'DECREMENT_CURRENT_POLL_QUESTION';

export const setPollOpen = (bool = true) => ({ type: SET_POLL_OPEN, bool });
export const setSelectedPoll = (input = '') => ({ type: SET_SELECTED_POLL, input });
export const setPollId = (input = null) => ({ type: SET_POLL_ID, input });
export const setPollTitle = (input = '') => ({ type: SET_POLL_TITLE, input });
export const setErrPollTitle = (err = '') => ({ type: SET_ERR_POLL_TITLE, err });
export const setUserEmail = (input = '') => ({ type: SET_USER_EMAIL, input });
export const setErrUserEmail = (err = '') => ({ type: SET_ERR_USER_EMAIL, err });
export const setQuestionNumber = (int = 1) => ({ type: SET_QUESTION_NUMBER, int });
export const incrementQuestionNumber = () => ({ type: INCREMENT_QUESTION_NUMBER });
export const decrementQuestionNumber = () => ({ type: DECREMENT_QUESTION_NUMBER });

export const setAllPollsObject = (object = {}) => ({ type: SET_ALL_POLLS_OBJECT, object });
export const setSelectedPollObject = (object = {}) => ({ type: SET_SELECTED_POLL_OBJECT, object });
export const setResponseOptions = (array = []) => ({ type: SET_RESPONSE_OPTIONS, array });
export const setSelectablePollUsers = (array = []) => ({ type: SET_SELECTABLE_POLL_USERS, array });

export const setDefaultResponseOption = (input = '') => ({
  type: SET_DEFAULT_RESPONSE_OPTION,
  input,
});
export const setCurrentPollQuestion = (
  object = {
    number: 1,
    ask: '',
    responseOption: '',
    responses: [],
    answer: '',
  },
) => ({
  type: SET_CURRENT_POLL_QUESTION,
  object,
});
export const setCurrentPollQuestionAsk = (input = '') => ({
  type: SET_CURRENT_POLL_QUESTION_ASK,
  input,
});
export const setCurrentPollQuestionResponses = (array = []) => ({
  type: SET_CURRENT_POLL_QUESTION_RESPONSES,
  array,
});
export const setCurrentPollQuestionTotal = (int = null) => ({
  type: SET_CURRENT_POLL_QUESTION_TOTAL,
  int,
});
export const incrementCurrentPollQuestion = () => ({ type: INCREMENT_CURRENT_POLL_QUESTION });
export const decrementCurrentPollQuestion = () => ({ type: DECREMENT_CURRENT_POLL_QUESTION });
