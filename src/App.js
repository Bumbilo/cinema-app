import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/header/Header';

import './App.scss';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <div className="App">
        <h1> Redux</h1>
      </div>
    </Provider>
  );
}

export default App;
