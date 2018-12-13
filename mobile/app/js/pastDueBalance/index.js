/**
 * Created by hmahad on 5/16/2017.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import a11y from 'react-a11y';
import axios from 'axios';

import configureStore from './../store';
import provider from './../provider';
import { pastDueData } from './reducer';
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
import cq from './../../cq/cq_pastDue.json';

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') a11y(React, ReactDOM);

/* create the initial store from the data on the landing pages */
axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = { pastDueData: window.pastDueJSON.output, cqContent: result.data };
  const store = configureStore(initialState, { pastDueData });


  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };

  injectTapEventPlugin();// Instant TapEvents for React http://facebook.github.io/react/

  render();
});
