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
import setPollQuestionAnswer from './setPollQuestionAnswer';
import fetchPollQuestionAnswer from './fetchPollQuestionAnswer';

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
  setPollQuestionAnswer,
  fetchPollQuestionAnswer,
};

export default pollService;
