import fetchAllAsync from './fetchAllAsync';
import fetchByIdAsync from './fetchByIdAsync';
import fetchAllOpenAsync from './fetchAllOpenAsync';
import createAsync from './createAsync';
import fetchResponseOptionsAsync from './fetchResponseOptionsAsync';
import fetchQuestionAsync from './fetchQuestionAsync';
import fetchTotalQuestionAmountAsync from './fetchTotalQuestionAmountAsync';
import fetchSelectableUsersAsync from './fetchSelectableUsersAsync';
import setQuestionAsync from './setQuestionAsync';
import openByIdAsync from './openByIdAsync';
import closeByIdAsync from './closeByIdAsync';

const pollService = {
  fetchAllAsync,
  fetchByIdAsync,
  fetchAllOpenAsync,
  createAsync,
  fetchResponseOptionsAsync,
  fetchQuestionAsync,
  fetchTotalQuestionAmountAsync,
  fetchSelectableUsersAsync,
  setQuestionAsync,
  openByIdAsync,
  closeByIdAsync,
};

export default pollService;
