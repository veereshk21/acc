/**
 *
 * This is the entry file for the application
 *
* */
import 'babel-polyfill';
import 'classlist-polyfill';
import axios from 'axios';
import ReactDOM from 'react-dom';

import configureStore from './../store';
import createRoutes from './routes';
import provider from './../provider';

import './../../css/modules/swiper.scss';
import '../../css/base/base.scss';
import '../../css/base/fonts.scss';
import '../../css/layout/grid.scss';
import '../../css/layout/layout.scss';
import '../../css/modules/buttons.scss';
import '../../css/modules/icons.scss';
import '../../css/modules/modules.scss';
import './../../css/modules/modal.scss';
import '../../css/modules/radioButtons.scss';
import '../../css/modules/singles.scss';
import '../../css/states/states.scss';
import './../../css/modules/menu.scss';
import './../../css/modules/checkbox.scss';
import './../../css/modules/notification.scss';
import './../../css/modules/accordion.scss';
import './../../css/pages/compatiblePlansChoice/compatiblePlansChoice.scss';

import cq from './../../cq/cq_compatiblePlansChoice.json';
import cqModal from './../../json/compatiblePlansChoice/cq_selectPlans';
// import compatiblePlansJSON from './../../json/compatiblePlansChoice/compatiblePlansJSON';


__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') {
  // window.compatiblePlansJSON = compatiblePlansJSON;
}


axios.get(__webpack_public_path__ + cq).then((result) => {
  /* Creating the initial state */
  const initialState = {
    output: window.compatiblePlansJSON.output,
    cqModal: cqModal.output,
    cq: typeof result.data !== typeof undefined && Object.keys(result.data).length > 0
      ? result.data
      : { html: {}, label: {}, error: {} },
  };

  /* Creating the store with initial state */
  const store = configureStore(initialState);
  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };
  render();
});
