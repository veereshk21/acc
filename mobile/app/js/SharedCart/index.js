
/* eslint-disable no-irregular-whitespace */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';
import axios from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';
import { cqContent, sharedCartData, asyncCallStatus } from './reducer';

import './../../css/base/base.css';
import './../../css/base/fonts.css';
import './../../css/layout/grid.css';
import './../../css/layout/layout.css';
import './../../css/states/states.css';
import './../../css/modules/buttons.css';
import './../../css/modules/colorSelect.css';
import './../../css/modules/radioButtons.css';
import './../../css/modules/singles.css';
import './../../css/modules/icons.css';
import './../../css/modules/menu.css';
import './../../css/modules/modules.css';
import cq from './../../cq/cq_sharedCart.json';

__webpack_public_path__ = window.resourceBaseUrl;

if (process.env.NODE_ENV !== 'production') a11y(React, ReactDOM);

axios.get(__webpack_public_path__ + cq).then((result) => {
  /* Creating the initial state */
  const initialState = { sharedCartData: window.sharedCartJSON, cqContent: result.data };

  /* Creating the store with initial state */
  const store = configureStore(initialState, {
    cqContent, sharedCartData, asyncCallStatus,
  });

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

  injectTapEventPlugin();// Instant TapEvents for React http://facebook.github.io/react/

  render();
});
