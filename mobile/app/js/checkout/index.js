/**
 *
 * This is the entry file for the application
 *
* */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import a11y from 'react-a11y';
import axios from 'axios';
import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';
import { orderDetails, cqContent, customerAgreement, asyncCallStatus, applePayAvailable, instantCreditAllocationsChanged } from './reducer';
import { notification } from '../common/NotificationBar/reducer';

import './../../css/modules/menu.css';
import './../../css/modules/swiper.css';
import './../../css/base/base.css';
import './../../css/base/fonts.css';
import './../../css/layout/grid.css';
import './../../css/layout/layout.css';
import './../../css/modules/buttons.css';
import './../../css/pages/checkout/checkout.css';
import './../../css/modules/singles.css';
import './../../css/modules/modules.css';
import './../../css/states/states.css';
import './../../css/modules/icons.css';
import './applePay/assests/applepay.css';
import cq from './../../cq/cq_checkout.json';

/* import reviewOrderJSON from './../../json/checkout/up_ispu_bta_r';
window.reviewOrderJSON = reviewOrderJSON; */
/* eslint-disable */

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') a11y(React, ReactDOM);

axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = { orderDetails: window.reviewOrderJSON.output || {}, cqContent: result.data };
  const store = configureStore(initialState, {
    orderDetails, cqContent, customerAgreement, asyncCallStatus, applePayAvailable, notification, instantCreditAllocationsChanged,
  });

  injectTapEventPlugin();// Instant TapEvents for React http://facebook.github.io/react/

  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };

  render();
});
