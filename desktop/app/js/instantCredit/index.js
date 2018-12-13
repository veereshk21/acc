/**
 * Created on 7/6/2017.
 */
/**
 *
 * This is the entry file for the application
 *
 * */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import a11y from 'react-a11y';
import configureStore from './../store';
import provider from './../provider';

// Set up the router, wrapping all Routes in the App component which appends header & footer.
import createRoutes from './routes';

import '../../css/base/base.scss';
import '../../css/base/fonts.scss';
import '../../css/layout/grid.scss';
import '../../css/layout/layout.scss';
import '../../css/modules/buttons.scss';
import '../../css/modules/icons.scss';
import '../../css/modules/modules.scss';
import './../../css/modules/modal.scss';
import '../../css/modules/radioButtons.scss';
import '../../css/modules/singles.scss';
import '../../css/states/states.scss';
import './../../css/modules/menu.scss';
import './../../css/modules/checkbox.scss';
import './../../css/modules/swiper.scss';
import './../../css/pages/instantCredit/instantCredit.scss';
import cq from './../../cq/cq_instantCredit.json';

// import JSON from './../../json/instantCredit/instantCreditJson';
// window.instantCreditJson = JSON;

__webpack_public_path__ = window.resourceBaseUrl;


if (process.env.NODE_ENV !== 'production') a11y(React, ReactDOM);

axios.get(__webpack_public_path__ + cq).then((result) => {
  const cqContent = result.data;
  /* Creating the initial state */
  const initialState = { instantCreditData: window.instantCreditJson.output, cqContent };

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
