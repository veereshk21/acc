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
// import devicePromos from '../../json/promoInterceptor/devicePromos';
import provider from '../provider';

import './../../css/base/base.scss';
import './../../css/base/fonts.scss';
import './../../css/layout/grid.scss';
import './../../css/layout/layout.scss';
import './../../css/modules/arrows.scss';
import './../../css/modules/buttons.scss';
import './../../css/modules/checkbox.scss';
import './../../css/modules/colorSelect.scss';
import './../../css/modules/icons.scss';
import './../../css/modules/menu.scss';
import './../../css/modules/modal.scss';
import './../../css/modules/modules.scss';
import './../../css/modules/radioButtons.scss';
import './../../css/modules/singles.scss';
import cq from '../../cq/cq_promoInterceptor.json';

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') {
  a11y(React, ReactDOM);
  // window.promoInterceptorJSON = promoInterceptor;
  // window.devicePromos = devicePromos;
}

axios.get(__webpack_public_path__ + cq).then((result) => {
  /* Creating the initial state */
  const _output = (window.promoInterceptorJSON && window.promoInterceptorJSON.output) || {};
  // console.log(result);
  const initialState = {
    data: _output,
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

