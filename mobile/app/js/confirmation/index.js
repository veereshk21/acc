/**
 *
 * This is the entry file for the application
 *
* */
/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import axios from 'axios';

import configureStore from './../store';
import provider from './../provider';

// Set up the router, wrapping all Routes in the App component which appends
// header & footer.
import createRoutes from './routes';

/* Common CSS */
import '../../css/modules/menu.css';
import '../../css/base/base.css';
import '../../css/base/fonts.css';
import '../../css/layout/grid.css';
import '../../css/layout/layout.css';
import '../../css/modules/buttons.css';
import '../../css/modules/icons.css';
import '../../css/modules/singles.css';
import '../../css/states/states.css';
import '../../css/pages/confirmation/confirmation.css';
import cq from './../../cq/cq_confirmation.json';

__webpack_public_path__ = window.resourceBaseUrl;

axios.get(__webpack_public_path__ + cq).then((result) => {
  /* Creating the initial state */
  const confirmationJSON = window.confirmationJSON && window.confirmationJSON.output ? window.confirmationJSON.output : {};
  const cqJSON = result.data;

  const confirmationView = {
    ...confirmationJSON,
    cqJSON,
  };

  /* Creating the store with initial state */
  const store = configureStore({ confirmationView });

  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };
  render();
});
