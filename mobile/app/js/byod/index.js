/**
 *
 * This is the entry file for the application
 *
 * */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';

import a11y from 'react-a11y';
import configureStore from './../store';
import provider from './../provider';
import { asyncCallStatus } from './reducer';
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
import './../../css/modules/singles.css';
import './../../css/modules/modules.css';
import './../../css/pages/gw/gw.css';
import './../../css/states/states.css';
import cq from './../../cq/cq_byod.json';

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') a11y(React, ReactDOM);

const deviceOptions = [{
  name: 'Smartphone',
  key: 'Smart Phone',
  imageUrl: 'https://ss7.vzw.com/is/image/VerizonWireless/calc-gen-smartphone-2x-31617?&bgc=f6f6f6&scl=2',
}, {
  name: 'Tablet',
  key: 'Tablet',
  imageUrl: 'https://ss7.vzw.com/is/image/VerizonWireless/calc-gen-tablet-2x-31617?&bgc=f6f6f6&scl=2',
}, {
  name: 'Basic phone',
  key: 'Basic Phone',
  imageUrl: 'https://ss7.vzw.com/is/image/VerizonWireless/calc-gen-basicphone-2x-31617?&bgc=f6f6f6&scl=2',
}, {
  name: 'Wearable',
  key: 'Smartwatch',
  imageUrl: 'https://ss7.vzw.com/is/image/VerizonWireless/calc-gen-watch-2x-31617?&bgc=f6f6f6&scl=2',
},
{
  name: 'Connected Car',
  key: 'connectedcar',
  imageUrl: 'https://ss7.vzw.com/is/image/VerizonWireless/hum-productlockup-humplus-gtm-lp-d-082417?&scl=1',
},
];

axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = { pageJSON: window.byodJSON.output, deviceOptions, cqJSON: result.data };
  /* Creating the store with initial state */
  const store = configureStore(initialState, {
    asyncCallStatus,
  });
  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };
  injectTapEventPlugin();// Instant TapEvents for React http://facebook.github.io/react/

  render();
});
