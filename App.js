import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Main from './src/Main';
import store from './src/store';

const App = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <Main />
    </Provider>
  </SafeAreaProvider>
);

export default App;