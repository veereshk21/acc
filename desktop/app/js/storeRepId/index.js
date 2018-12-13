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

import * as reducers from './reducer';
import configureStore from './../store';
import createRoutes from './routes';
import provider from './../provider';

import '../../css/pages/storeRepId/storeRepId.scss';
import './../../css/base/base.scss';
import './../../css/base/fonts.scss';
import './../../css/layout/grid.scss';
import './../../css/layout/layout.scss';
import './../../css/modules/buttons.scss';
import './../../css/modules/colorSelect.scss';
import './../../css/modules/icons.scss';
import './../../css/modules/menu.scss';
import './../../css/modules/modal.scss';
import './../../css/modules/modules.scss';
import './../../css/modules/radioButtons.scss';
import './../../css/modules/singles.scss';
import './../../css/states/states.scss';
import cq from './../../cq/cq_storeRepId.json';

// import storeRepIdJSON from './../../json/storeRepId/storeRepIdJSON';
// window.storeRepJSON = storeRepIdJSON;

if (process.env.NODE_ENV !== 'production') a11y(React, ReactDOM);

__webpack_public_path__ = window.resourceBaseUrl; // eslint-disable-line

// TODO: should remove once configured and coming from backend
axios.get(__webpack_public_path__ + cq).then((result) => {
  /* Creating the store with initial state */
  const initialState = { storeRepData: window.storeRepJSON.output || {}, cqContent: result.data };
  const store = configureStore(initialState, { ...reducers });

  /**
 * Calling the render method of ReactDOM, with Providers
 *
 * */
  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };

  render();
});
