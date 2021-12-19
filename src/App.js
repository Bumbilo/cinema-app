import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';

import './App.scss';
import store from './redux/store';
import Details from './components/content/details/Details';

function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:id/:name/details" element={<Details />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
