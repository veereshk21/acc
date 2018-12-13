/**
 * Created by hmahad on 5/16/2017.
 */
import 'babel-polyfill';
import a11y from 'react-a11y';
import axios from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';

import { pastDueData } from './reducer';
import configureStore from './../store';
import provider from './../provider';

// Set up the router, wrapping all Routes in the App component which appends header & footer.
import createRoutes from './routes';

import './../../css/modules/menu.scss';
import './../../css/base/base.scss';
import './../../css/base/fonts.scss';
import './../../css/layout/grid.scss';
import './../../css/layout/layout.scss';
import './../../css/modules/buttons.scss';
import './../../css/modules/icons.scss';
import './../../css/modules/notification.scss';
import './../../css/modules/singles.scss';
import './../../css/modules/modules.scss';
import './../../css/states/states.scss';
import './../../css/modules/colorSelect.scss';
import './../../css/modules/modal.scss';
import '../../css/pages/pastDueBalance/pastDueBalance.scss';
import cq from './../../cq/cq_pastDue.json';

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') {
  a11y(React, ReactDOM);
}

/* create the initial store from the data on the landing pages */

// import pastDueJSON from './../../json/pastDueJSON';

axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = { pastDueData: window.pastDueJSON.output, cqContent: result.data };
  const store = configureStore(initialState, { pastDueData });


  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app'));
  };

  injectTapEventPlugin();// Instant TapEvents for React http://facebook.github.io/react/

  render();
});
