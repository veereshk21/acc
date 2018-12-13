/**
 *
 * This is the entry file for the application
 *
 * */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import a11y from 'react-a11y';
import configureStore from './../store';
import provider from './../provider';
import { cqContent, byodPromptData } from './reducer';
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

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') a11y(React, ReactDOM);


// import byodPromptJSON from './../../json/byodPromptJSON';
/* Creating the initial state */
const initialState = { byodPromptData: window.byodPromptJSON.output || {}, cqContent: window.cqJSON };

/* Creating the store with initial state */
const store = configureStore(initialState, { cqContent, byodPromptData });

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

injectTapEventPlugin();// Instant TapEvents for React http://facebook.github.io/react/

render();

/** Exporting store to be used as a reference
 * TODO: Check if this can be removed */
export default store;
