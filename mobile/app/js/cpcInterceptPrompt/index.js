/**
 *
 * This is the entry file for the application
 *
* */

import 'babel-polyfill';
import ReactDOM from 'react-dom';
import axios from 'axios';

import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';
import { asyncCallStatus, cqContent } from './reducer';

import './../../css/modules/menu.css';
import './../../css/base/base.css';
import './../../css/base/fonts.css';
import './../../css/layout/layout.css';
import './../../css/modules/buttons.css';
import './../../css/modules/singles.css';
import './../../css/modules/icons.css';
import './../../css/modules/modules.css';
import cq from './../../cq/cq_cpcInterceptPrompt.json';
// import cpcInterceptPromptJSON from './../../json/cpc_intercept/pageJson';

__webpack_public_path__ = window.resourceBaseUrl;

axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = {
    cpcIntercept: window.cpcInterceptPromptJSON.output,
    cqContent: result.data,
  };

  const store = configureStore(initialState, { asyncCallStatus, cqContent });

  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };

  render();
});
