/*
 * Created on Wed Aug 30 2017
 *
 * Copyright (c) 2017 Verizon Wireless
 * Author Srikrishna Gumma
 */
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
import { expressdata } from './reducer';
import './../../css/modules/menu.css';
import './../../css/base/base.css';
import './../../css/base/fonts.css';
import './../../css/layout/grid.css';
import './../../css/layout/layout.css';
import './../../css/modules/buttons.css';
import './../../css/modules/notification.css';
import './../../css/modules/singles.css';
import './../../css/modules/modules.css';
import './../../css/modules/loader.css';
import './../../css/states/states.css';
import cq from './../../cq/cq_expressrio.json';

__webpack_public_path__ = window.resourceBaseUrl;

let preOrderExpressConfigJSON = {};
let preOrderExpressConfigInventoryJSON = {};
let content = {};
const dataURL = typeof window.promoConfigJson !== 'undefined' ? window.promoConfigJson : (cq);
const _date = new Date();
axios.all([
  axios.get(window.expressconfig + '?ts=' + _date.getTime()),
  axios.get(window.expressconfiginventory + '?ts=' + _date.getTime()),
  axios.get(dataURL + '?ts=' + _date.getTime()),
]).then((result) => {
  // console.log(result[0].data, result[1].data, result[2].data);
  preOrderExpressConfigJSON = result[0].data;
  preOrderExpressConfigInventoryJSON = result[1].data;
  content = result[2].data;
  // document.getElementById('loader').className = 'is-hidden';
  if (process.env.NODE_ENV !== 'production') a11y(React, ReactDOM);
  /* Creating the initial state */
  const initialState = {
    offerConfigData: preOrderExpressConfigJSON.Page, inventoryData: preOrderExpressConfigInventoryJSON.output, defaultSkuId: window.defaultskuid, cqdata: content,
  };
  /* Creating the store with initial state */
  const store = configureStore(initialState, expressdata);
  injectTapEventPlugin();
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
}).catch((error) => console.log(error));

