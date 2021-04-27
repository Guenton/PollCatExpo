import { createStore, combineReducers } from 'redux';

import coreReducer from './store/reducers/core';
import animationReducer from './store/reducers/animation';

const rootReducer = combineReducers({
  core: coreReducer,
  animation: animationReducer,
});

const store = createStore(rootReducer);

export default store;
