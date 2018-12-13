import 'babel-polyfill';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';

import { asyncCallStatus } from './reducer';
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
import cq from './../../cq/cq_eNineEleven.json';

__webpack_public_path__ = window.resourceBaseUrl;

const e911fallback = {
  statusCode: '00',
  output: {
    states: ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'],
    redirectUrl: null,
    updateAddressUrl: '/digital/addE911Address',
    addressInfo: null,
  },
  errorMap: null,
  statusMessage: null,
};
// passing fallback to avoid flow break.
const pageJSON = typeof window.e911JSON !== 'undefined' ? window.e911JSON : e911fallback;

axios.get(__webpack_public_path__ + cq).then((result) => {
  const cqContentJson = result.data;

  const initialState = {
    cqContent: cqContentJson,
    pageJSON: pageJSON.output,
  };
  const store = configureStore(initialState, { asyncCallStatus });
  injectTapEventPlugin();

  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };

  render();
});
