/**
 *
 * This is the entry file for the application
 *
 * */
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';

import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';

import './../../css/base/base.css';
import './../../css/base/fonts.css';
import './../../css/layout/grid.css';
import './../../css/layout/layout.css';
import './../../css/states/states.css';
import './../../css/modules/buttons.css';
import './../../css/modules/singles.css';
import './../../css/modules/icons.css';
import './../../css/modules/menu.css';
import './../../css/modules/modules.css';
import cq from './../../cq/cq_newOrTransfer.json';

// const newOrTransfer = require('../../json/newOrTransfer');
// window.portInJSON = newOrTransfer.portInJSON;
// window.cqJSON = newOrTransfer.cqJSON;

__webpack_public_path__ = window.resourceBaseUrl;

axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = {
    output: window.portInJSON.output,
    cqContent: result.data,
  };

  const store = configureStore(initialState);

  injectTapEventPlugin();// Instant TapEvents for React http://facebook.github.io/react/

  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };

  render();
});
