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

import { data, cqContent } from './reducer';
import configureStore from './../store';
import createRoutes from './routes';
import provider from './../provider';

import '../../css/base/base.scss';
import '../../css/base/fonts.scss';
import '../../css/layout/grid.scss';
import '../../css/layout/layout.scss';
import '../../css/modules/buttons.scss';
import '../../css/modules/icons.scss';
import '../../css/modules/modules.scss';
import '../../css/modules/radioButtons.scss';
import '../../css/modules/singles.scss';
import '../../css/pages/downPayment/downPayment.scss';
import '../../css/states/states.scss';
import './../../css/modules/accordion.scss';
import './../../css/modules/checkbox.scss';
import './../../css/modules/menu.scss';
import './../../css/modules/modal.scss';
import cq from './../../cq/cq_downPayment.json';

// import downPaymentJSON from './../../json/checkout/downPayment'; // eslint-disable-line

// import './applePay/assests/applepay.css';

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') {
  a11y(React, ReactDOM);
  // window.downPaymentJSON = downPaymentJSON;
}

axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = {
    data: window.downPaymentJSON.output || {},
    cqContent: result.data,
  };
  const store = configureStore(initialState, {
    data, cqContent,
  });

  injectTapEventPlugin(); // Instant TapEvents for React http://facebook.github.io/react/

  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };

  render();
});
