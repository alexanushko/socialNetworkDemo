import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/reduxStore';
import {Provider} from 'react-redux';
import {BrowserRouter, HashRouter} from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();

//basename={process.env.PUBLIC_URL} - для BrowserRouter

