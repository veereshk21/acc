/**
 *
 * This is the entry file for the application
 *
 * */

import 'babel-polyfill'; //eslint-disable-line
import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';

import configureStore from './../store';
import provider from './../provider';
// Set up the router, wrapping all Routes in the App component which appends header & footer.
import createRoutes from './routes';

require('./../../css/base/base.css');
require('./../../css/base/fonts.css');
require('./../../css/layout/grid.css');
require('./../../css/layout/layout.css');
require('./../../css/states/states.css');
require('./../../css/modules/buttons.css');
require('./../../css/modules/singles.css');
require('./../../css/modules/icons.css');
require('./../../css/modules/menu.css');

if (process.env.NODE_ENV !== 'production')a11y(React, ReactDOM);
__webpack_public_path__ = window.resourceBaseUrl;

/* Creating the initial state */

const initialState = {
  goToUrl: window.pageJSON.output.goToUrl,
  cqContent: typeof window.cqJSON !== typeof undefined && Object.keys(window.cqJSON).length > 0 ? window.cqJSON : { html: {}, label: {}, error: {} },
};

const store = configureStore(initialState);

const render = () => {
  ReactDOM.render(
    provider(store, createRoutes(store)),
    document.getElementById('app')
  );
};

render();
