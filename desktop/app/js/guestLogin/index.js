import 'babel-polyfill';
import a11y from 'react-a11y';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';
import * as reducers from './reducer';

import './../../css/modules/swiper.scss';
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
import './../../css/modules/notification.scss';
import './../../css/modules/accordion.scss';
import './../../css/pages/guestLogin/guestLogin.scss';
import cq from '../../cq/cq_guestLogin.json';
// import guestLoginJSON from './../../json/loginJSON';

if (process.env.NODE_ENV !== 'production') {
  a11y(React, ReactDOM, {
    device: ['desktop'],
  });
  // window.guestLoginJSON = guestLoginJSON;
}

__webpack_public_path__ = window.resourceBaseUrl;

axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = {
    guestLoginDetails: window.guestLoginJSON.output || {},
    cqContent: result.data || {
      html: {},
      label: {},
      error: {},
    },
  };
  const store = configureStore(initialState, { ...reducers });

  /* Calling the render method of ReactDOM, with Providers */
  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };

  render();
});
