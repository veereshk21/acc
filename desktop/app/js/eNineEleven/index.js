import 'babel-polyfill';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';

import { asyncCallStatus } from './reducer';
import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';


import '../../css/base/base.scss';
import '../../css/base/fonts.scss';
import '../../css/layout/grid.scss';
import '../../css/layout/layout.scss';
import '../../css/modules/arrows.scss';
import '../../css/modules/buttons.scss';
import '../../css/modules/icons.scss';
import '../../css/modules/modules.scss';
import './../../css/modules/modal.scss';
import './../../css/pages/noShare/noShare.scss';
import '../../css/modules/singles.scss';
import '../../css/states/states.scss';
import './../../css/modules/menu.scss';
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
