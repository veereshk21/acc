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
import { data, cqContent, asyncCallStatus } from './reducer';
import { notification } from '../common/NotificationBar/reducer';

import '../../css/base/base.scss';
import '../../css/base/fonts.scss';
import '../../css/layout/grid.scss';
import '../../css/layout/layout.scss';
import '../../css/modules/arrows.scss';
import '../../css/modules/buttons.scss';
import '../../css/modules/icons.scss';
import '../../css/modules/modules.scss';
import './../../css/modules/modal.scss';
import '../../css/modules/singles.scss';
import '../../css/states/states.scss';
import './../../css/modules/menu.scss';
import cq from './../../cq/cq_availabilityTimer.json';

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') {
  a11y(React, ReactDOM);
  // window.pageJSON = pageJSON;
}
// window.pageJSON = {
//   "statusCode": "00",
//   "output": {
//     "availableDate": 1533141233,
//     "deviceName": "Apple iPhone® X",
//     "initiateCheckoutURL": "/od/cust/checkout/initiateCheckout",
//     "cartDetailURL": "/od/cust/auth/cart/getCartDetails"
//   }
// };

const render = (result) => {
  /* Creating the initial state */
  const initialState = {
    data: window.pageJSON.output || {},
    cqContent: result.data,
  };
  const store = configureStore(initialState, {
    data, cqContent, asyncCallStatus, notification,
  });

  injectTapEventPlugin(); // Instant TapEvents for React http://facebook.github.io/react/

  ReactDOM.render(
    provider(store, createRoutes(store)),
    document.getElementById('app')
  );
};

if (window.CQContentJson) {
  render(window.CQContentJson);
} else {
  axios.get(__webpack_public_path__ + cq).then((result) => {
    render(result);
  });
}
