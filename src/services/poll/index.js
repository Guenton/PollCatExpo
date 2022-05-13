import fetchAllAsync from './fetchAllAsync';
import createAsync from './createAsync';
import fetchResponseOptionsAsync from './fetchResponseOptionsAsync';
import fetchQuestionAsync from './fetchQuestionAsync';
import fetchTotalQuestionAmountAsync from './fetchTotalQuestionAmountAsync';
import fetchSelectableUsersAsync from './fetchSelectableUsersAsync';

const pollService = {
  fetchAllAsync,
  createAsync,
  fetchResponseOptionsAsync,
  fetchQuestionAsync,
  fetchTotalQuestionAmountAsync,
  fetchSelectableUsersAsync,
};

export default pollService;
