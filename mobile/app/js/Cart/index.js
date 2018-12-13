/**
 *
 * This is the entry file for the application
 *
 * */
import 'babel-polyfill';
import a11y from 'react-a11y';
import axios from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';

import { cqContent, cartData, asyncCallStatus, selectedProtectionFeature, accountEmailFeature } from './reducer';
import configureStore from './../store';
import provider from './../provider';

// Set up the router, wrapping all Routes in the App component which appends header & footer.
import createRoutes from './routes';


import './../../css/modules/menu.css';
import './../../css/modules/swiper.css';
import './../../css/base/base.css';
import './../../css/base/fonts.css';
import './../../css/layout/grid.css';
import './../../css/layout/layout.css';
import './../../css/modules/buttons.css';
import './../../css/modules/icons.css';
import './../../css/modules/cart.css';
import './../../css/modules/notification.css';
import './../../css/modules/radioButtons.css';
import './../../css/modules/rating.css';
import './../../css/modules/singles.css';
import './../../css/modules/modules.css';
import './../../css/states/states.css';
import cq from './../../cq/cq_cart.json';
// import cartJSON from './../../json/cart/instantCredit';

__webpack_public_path__ = window.resourceBaseUrl;

// window.cartJSON = cartJSON;

if (process.env.NODE_ENV !== 'production') a11y(React, ReactDOM);

const agentSiteId = window.siteId;
let cqFilePath = cq;
if (agentSiteId) {
  cqFilePath = cq.replace('jsons/', `jsons/${agentSiteId}/`);
}


const render = (data) => {
  /* Creating the initial state */
  const initialState = { cartData: { ...window.cartJSON.output, cpc: window.cartJSON.output.cpcSucessful } || {}, cqContent: data };
  /* Creating the store with initial state */
  const store = configureStore(initialState, {
    cqContent, cartData, asyncCallStatus, selectedProtectionFeature, accountEmailFeature,
  });
  /**
   * Calling the render method of ReactDOM, with Providers
   *
   * */
  ReactDOM.render(
    provider(store, createRoutes(store)),
    document.getElementById('app')
  );
  injectTapEventPlugin();// Instant TapEvents for React http://facebook.github.io/react/
};

if (window.CQContentJson) {
  render(window.CQContentJson);
} else {
  axios.get(__webpack_public_path__ + cqFilePath).then((result) => {
    render(result.data);
  });
}
