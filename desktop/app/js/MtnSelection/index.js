/*
 * This is the entry file for the this mdnSelection module and consists of high level configurations
 *
 * @babel-polyfill : ES6 conversion for browser renedering
 * @react-a11y : Shows avccessibility warnings and errors, should disable on prod environment to avoid slowness
 * @axios : lightweight httpClient for React. please refer axios response schema
 * @react : base class
 * @react-dom : takes care of updating virtual dom and rendering only changes dom elements
 * @configureStore: function call to create store which consist of state map of entire application
 * @provider : get access of store to all the components
 * @createRoutes : routing configuration
 *
 */
import 'babel-polyfill';
import a11y from 'react-a11y';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';

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
import './../../css/pages/mdnSelection/mdnSelection.scss';
import cq from '../../cq/cq_mdnSelection.json';
import * as reducers from './reducer';

// TODO: Remove once integrated with backend
/* testing start */
// import mdnJSON from './../../json//mdn/fiveGEligible';


/* testing end */

if (process.env.NODE_ENV !== 'production') {
  a11y(React, ReactDOM, { device: ['desktop'] });
  // window.mdnJSON = mdnJSON;
}

__webpack_public_path__ = window.resourceBaseUrl;

axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = { ...window.mdnJSON.output || {}, cqContent: result.data || { html: {}, label: {}, error: {} } };
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
