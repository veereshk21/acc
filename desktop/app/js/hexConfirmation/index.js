import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import a11y from 'react-a11y';
import axios from 'axios';
import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';

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
import '../../css/pages/confirmation/confirmation.scss';

import cq from './../../cq/cq_confirmation.json';
import './../../json/confirmation/confirmation'; // eslint-disable-line


// __webpack_public_path__ = window.resourceBaseUrl;

if (process.env.NODE_ENV !== 'production') {
  a11y(React, ReactDOM);
  // window.confirmationJSON = confirmation;
}

axios.get(__webpack_public_path__ + cq).then((result) => {
  const confirmationJSON = (window.confirmationJSON && window.confirmationJSON.output) ? window.confirmationJSON.output : {};
  const cqKeys = result.data;

  const confirmationView = {
    ...confirmationJSON,
    cqKeys,
  };

  /* Creating the store with initial state */
  const store = configureStore({ confirmationView });
  injectTapEventPlugin(); // Instant TapEvents for React http://facebook.github.io/react/
  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };
  render();
});
