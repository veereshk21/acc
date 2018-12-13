/**
 *
 * This is the entry file for the application
 *
 * */


import 'babel-polyfill';
import a11y from 'react-a11y';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import * as PromoReducers from './reducer';
import configureStore from '../store';
import createRoutes from './routes';

// import promoInterceptor from '../../json/promoInterceptor/promoInterceptorJSON';
import provider from '../provider';

import './../../css/modules/menu.css';
import './../../css/base/base.css';
import './../../css/base/fonts.css';
import './../../css/layout/grid.css';
import './../../css/layout/layout.css';
import './../../css/modules/buttons.css';
import './../../css/modules/icons.css';
import './../../css/modules/notification.css';
import './../../css/modules/rating.css';
import './../../css/modules/singles.css';
import './../../css/modules/modules.css';
import './../../css/states/states.css';
import cq from '../../cq/cq_promoInterceptor.json';

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') {
  a11y(React, ReactDOM);
  // window.promoInterceptorJSON = promoInterceptor;
}

axios.get(__webpack_public_path__ + cq).then((result) => {
  /* Creating the initial state */
  const initialState = {
    data: window.promoInterceptorJSON.output || {},
    cqContent: typeof result.data !== typeof undefined && Object.keys(result.data).length > 0 ? result.data : { html: {}, label: {}, error: {} },
  };
  /* Creating the store with initial state */
  const store = configureStore(initialState, PromoReducers);

  /* Calling the render method of ReactDOM, with Providers */
  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };
  render();
});
