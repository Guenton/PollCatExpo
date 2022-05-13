import fetchAllAsync from './fetchAllAsync';
import createAsync from './createAsync';
import fetchResponseOptionsAsync from './fetchResponseOptionsAsync';
import fetchQuestionAsync from './fetchQuestionAsync';
import fetchTotalQuestionAmountAsync from './fetchTotalQuestionAmountAsync';
import fetchSelectableUsersAsync from './fetchSelectableUsersAsync';
import setQuestionAsync from './setQuestionAsync';

const pollService = {
  fetchAllAsync,
  createAsync,
  fetchResponseOptionsAsync,
  fetchQuestionAsync,
  fetchTotalQuestionAmountAsync,
  fetchSelectableUsersAsync,
  setQuestionAsync,
};

export default pollService;
