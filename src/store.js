import { createStore, combineReducers } from 'redux';

import animationReducer from './store/reducers/animation';
import authReducer from './store/reducers/auth';
import coreReducer from './store/reducers/core';
import userReducer from './store/reducers/user';
import pollReducer from './store/reducers/poll';

const rootReducer = combineReducers({
  animation: animationReducer,
  auth: authReducer,
  core: coreReducer,
  user: userReducer,
  poll: pollReducer,
});

const store = createStore(rootReducer);

export default store;
