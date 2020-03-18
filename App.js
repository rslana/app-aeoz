import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
console.disableYellowBox = true;

import Routes from './app/routes/routes';
import reducers from './app/reducers/reducers';

const App = () => {
  return (
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <Routes />
    </Provider>
  );
};

export default App;
