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
import { orderDetails, cqContent, asyncCallStatus } from './reducer';
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
import '../../css/modules/radioButtons.scss';
import '../../css/modules/singles.scss';
import '../../css/states/states.scss';
import './../../css/modules/menu.scss';
import './../../css/modules/checkbox.scss';
import './../../css/modules/accordion.scss';
import './../../css/pages/aiExpress/aiExpressConfirmation.scss';
import cq from './../../cq/cq_aiExpressConfirmation.json';
// import confirmationJSON from './../../json/confirmation/abcConfirmation'; // eslint-disable-line

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') {
  a11y(React, ReactDOM);
  // window.confirmationJSON = confirmationJSON;
}
axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = {
    orderDetails: window.confirmationJSON.output || {},
    cqContent: result.data,
  };
  const store = configureStore(initialState, {
    orderDetails, cqContent, asyncCallStatus, notification,
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
