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
import { currentPlan } from './reducer';

import './../../css/modules/menu.css';
import './../../css/base/base.css';
import './../../css/base/fonts.css';
import './../../css/layout/layout.css';
import './../../css/modules/buttons.css';
import './../../css/modules/singles.css';
import './../../css/modules/icons.css';
import './../../css/modules/modules.css';
import './../../css/modules/swiper.css';
// import compatiblePlansJSON from '../../json/compatiblePlansJSON';
import cq from './../../cq/cq_compatiblePlansChoice.json';

__webpack_public_path__ = window.resourceBaseUrl;
axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = {
    compatiblePlans: window.compatiblePlansJSON.output,
    cqContent: result.data,
  };

  const store = configureStore(initialState, { currentPlan });

  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };

  render();
});
