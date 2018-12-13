/**
 *
 * This is the entry file for the application
 *
 * */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';
import axios from 'axios';

import configureStore from './../store';
import provider from './../provider';
// Set up the router, wrapping all Routes in the App component which appends header & footer.
import createRoutes from './routes';

import '../../css/base/base.css';
import '../../css/base/fonts.css';
import '../../css/layout/grid.css';
import '../../css/layout/layout.css';
import '../../css/modules/buttons.css';
import '../../css/modules/icons.css';
import '../../css/modules/modules.css';
import '../../css/modules/radioButtons.css';
import '../../css/modules/singles.css';
import '../../css/states/states.css';
import './../../css/modules/menu.css';
import cq from './../../cq/cq_numShareSelectDevice.json';

__webpack_public_path__ = window.resourceBaseUrl;

if (process.env.NODE_ENV !== 'production') a11y(React, ReactDOM);
axios.get(__webpack_public_path__ + cq).then((result) => {
  /* Creating the initial state */
  const cqContentJson = result.data;
  const initialState = {
    output: window.mdnJSON.output,
    statusCode: window.mdnJSON.statusCode,
    cqJSON: cqContentJson,
  };

  /* Creating the store with initial state */
  const store = configureStore(initialState);

  /**
   * Calling the render method of ReactDOM, with Providers
   *
   * */
  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };

  render();
});
