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
import cq from './../../cq/cq_npanxx.json';

__webpack_public_path__ = window.resourceBaseUrl;
// import npanxxJSON from './../../json/npanxxJSON';
// window.npanxxJSON = npanxxJSON;

axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = {
    npanxxDetails: {
      zipCode: typeof window.npanxxJSON.output.zipCode !== 'undefined' ? window.npanxxJSON.output.zipCode : null,
      mtns: typeof window.npanxxJSON.output.mtns !== 'undefined' ? window.npanxxJSON.output.mtns : [],
      orderId: typeof window.npanxxJSON.output.orderId !== 'undefined' ? window.npanxxJSON.output.orderId : null,
      commerceItemId: typeof window.npanxxJSON.output.commerceItemId !== 'undefined' ? window.npanxxJSON.output.commerceItemId : null,
      ajaxCallUrl: window.npanxxJSON.output.ajaxCallUrl,
      submitUrl: window.npanxxJSON.output.submitUrl,
    },
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
