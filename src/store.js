import { createStore, combineReducers } from 'redux';

import coreReducer from './store/reducers/core';
import authReducer from './store/reducers/auth';
import animationReducer from './store/reducers/animation';

const rootReducer = combineReducers({
  core: coreReducer,
  auth: authReducer,
  animation: animationReducer,
});

const store = createStore(rootReducer);

export default store;
