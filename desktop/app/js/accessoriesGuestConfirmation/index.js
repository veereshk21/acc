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

import { orderDetails, cqContent, asyncCallStatus } from './reducer';
import configureStore from './../store';
import createRoutes from './routes';
import provider from './../provider';
// import reviewOrderJSON from './../../json/confirmation/guestReviewOrderJSON';

import '../../css/base/base.scss';
import '../../css/base/fonts.scss';
import '../../css/layout/grid.scss';
import '../../css/layout/layout.scss';
import '../../css/modules/buttons.scss';
import '../../css/modules/icons.scss';
import '../../css/modules/modules.scss';
import '../../css/modules/radioButtons.scss';
import '../../css/modules/singles.scss';
import '../../css/states/states.scss';
import './../../css/modules/checkbox.scss';
import './../../css/modules/menu.scss';
import './../../css/modules/modal.scss';
import './../../css/modules/swiper.scss';
import './../../css/pages/accGuestConfirmation/accGuestConfirmation.scss';
import cq from './../../cq/cq_accGuestConfirmation.json';

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') {
  a11y(React, ReactDOM);
  // window.confirmationJSON = reviewOrderJSON;
}

axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = {
    cqContent: result.data,
    orderDetails: window.confirmationJSON.output || {},
  };
  const store = configureStore(initialState,
    { asyncCallStatus, orderDetails, cqContent }
  );

  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };

  render();
});
