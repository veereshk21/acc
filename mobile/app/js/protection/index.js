/**
 * Created by hmahad on 2/16/2017.
 */
/**
 *
 * This is the entry file for the application
 *
 * */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import a11y from 'react-a11y';
import configureStore from './../store';
import provider from './../provider';

// Set up the router, wrapping all Routes in the App component which appends header & footer.
import createRoutes from './routes';

import './../../css/modules/menu.css';
import './../../css/base/base.css';
import './../../css/base/fonts.css';
import './../../css/layout/grid.css';
import './../../css/layout/layout.css';
import './../../css/modules/buttons.css';
import './../../css/modules/icons.css';
import './../../css/modules/notification.css';
import './../../css/modules/rating.css';
import './../../css/modules/singles.css';
import './../../css/modules/modules.css';
import './../../css/states/states.css';
import './../../css/modules/cart.css';
import './../../css/pages/protection/protection.css';
import cq from './../../cq/cq_protection.json';


__webpack_public_path__ = window.resourceBaseUrl;
// import protectionJSON from './../../json/protection/tmp_md_opted';

if (process.env.NODE_ENV !== 'production') a11y(React, ReactDOM);

const agentSiteId = window.siteId;
let cqFilePath = cq;
if (agentSiteId) {
  cqFilePath = cq.replace('jsons/', `jsons/${agentSiteId}/`);
}

/**
   * Calling the render method of ReactDOM, with Providers
   *
   * */
const render = (cqContent) => {
  /* Creating the initial state */
  const initialState = { protectionData: window.protectionJSON.output, cqContent, accessoryData: window.accessoryJSON };
  /* Creating the store with initial state */
  const store = configureStore(initialState);
  ReactDOM.render(
    provider(store, createRoutes(store)),
    document.getElementById('app')
  );
};

if (window.CQContentJson) {
  render(window.CQContentJson);
} else {
  axios.get(__webpack_public_path__ + cqFilePath).then((result) => {
    render(result.data);
  });
}
