import { createStore, combineReducers } from 'redux';

import loadReducer from './store/reducers/load';
import langReducer from './store/reducers/lang';
import colorReducer from './store/reducers/color';
import loginReducer from './store/reducers/login';

const rootReducer = combineReducers({
  load: loadReducer,
  lang: langReducer,
  color: colorReducer,
  login: loginReducer,
});

const store = createStore(rootReducer);

export default store;
