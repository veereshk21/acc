/**
 *
 * This is the entry file for the application
 *
**/

import 'babel-polyfill';
import a11y from 'react-a11y';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import * as reducers from './reducer';
import configureStore from './../store';
// import cpcInterceptPromptJSON from './../../json/cpcPrompt/cpcInterceptPromptJSON';
import createRoutes from './routes';
import provider from './../provider';

import '../../css/layout/grid.scss';
import './../../css/base/base.scss';
import './../../css/base/fonts.scss';
import './../../css/layout/layout.scss';
import './../../css/modules/buttons.scss';
import './../../css/modules/icons.scss';
import './../../css/modules/menu.scss';
import './../../css/modules/modules.scss';
import './../../css/modules/singles.scss';
import './../../css/modules/swiper.scss';
import './../../css/modules/modal.scss';
import './../../css/pages/reviewPlan/reviewPlan.scss';
import cq from './../../cq/cq_cpcIntercept.json';

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') {
  a11y(React, ReactDOM);
  // window.cpcInterceptPromptJSON = cpcInterceptPromptJSON;
}


axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = {
    output: window.cpcInterceptPromptJSON.output,
    cq: result.data || { html: {}, label: {}, error: {} },
  };

  const store = configureStore(initialState, { ...reducers });

  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };

  render();
});
