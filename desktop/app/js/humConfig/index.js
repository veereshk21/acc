import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import a11y from 'react-a11y';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './../store';
import provider from './../provider';
// Set up the router, wrapping all Routes in the App component which appends header & footer.
import createRoutes from './routes';

import '../../css/layout/grid.scss';
import './../../css/modules/menu.scss';
import './../../css/modules/modules.scss';
import './../../css/base/base.scss';
import './../../css/base/fonts.scss';
import './../../css/layout/layout.scss';
import './../../css/modules/buttons.scss';
import './../../css/modules/singles.scss';
import './../../css/modules/icons.scss';
import '../../css/modules/radioButtons.scss';
import '../../css/pages/humConfig/humConfig.scss';
import './../../css/modules/modal.scss';

import cq from './../../cq/cq_humConfig.json';
// import humConfigJSON from './../../json/humConfig/humConfig_pgLoad'; //eslint-disable-line

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') {
  a11y(React, ReactDOM);
  // window.humConfigJSON = humConfigJSON; //eslint-disable-line
}
axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = {
    humConfigData: window.humConfigJSON.output || {},
    cqContent: result.data,
  };

  /* Creating the store with initial state */
  const store = configureStore(initialState);

  /**
   * Calling the render method of ReactDOM, with Providers
   *
   * */
  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app'),
    );
  };

  injectTapEventPlugin();// Instant TapEvents for React http://facebook.github.io/react/

  render();
});
