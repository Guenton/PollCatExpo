import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Router from './src/Router';
import store from './src/store';

const App = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <Router />
    </Provider>
  </SafeAreaProvider>
);

export default App;
