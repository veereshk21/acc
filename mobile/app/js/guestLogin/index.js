/**
 *
 * This is the entry file for the application
 *
 * */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';

import a11y from 'react-a11y';
import configureStore from './../store';
import provider from './../provider';
import { asyncCallStatus } from './reducer';
// Set up the router, wrapping all Routes in the App component which appends header & footer.
import createRoutes from './routes';

import './../../css/base/base.css';
import './../../css/base/fonts.css';
import './../../css/layout/grid.css';
import './../../css/layout/layout.css';
import './../../css/modules/buttons.css';
import './../../css/modules/singles.css';
import './../../css/modules/menu.css';
import './../../css/modules/modules.css';
import './../../css/states/states.css';

import cq from './../../cq/cq_guestlogin.json';

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') a11y(React, ReactDOM);


axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = { pageJSON: window.guestLoginJSON.output, cqJSON: result.data };
  /* Creating the store with initial state */
  const store = configureStore(initialState, {
    asyncCallStatus,
  });
  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };
  injectTapEventPlugin();// Instant TapEvents for React http://facebook.github.io/react/

  render();
});
