/**
 *
 * This is the entry file for the application
 *
 * */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';
import axios from 'axios';

import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';

import './../../css/modules/modules.scss';
import './../../css/modules/swiper.scss';
import './../../css/base/base.scss';
import './../../css/base/fonts.scss';
import './../../css/layout/grid.scss';
import './../../css/layout/layout.scss';
import './../../css/modules/buttons.scss';
import './../../css/modules/icons.scss';
import './../../css/modules/checkbox.scss';
import './../../css/modules/radioButtons.scss';
import './../../css/modules/singles.scss';
import './../../css/modules/arrows.scss';
import './../../css/modules/colorSelect.scss';
import './../../css/modules/menu.scss';
import './../../css/modules/modal.scss';
import './../../css/pages/aalOffers/myOffers.scss';
import cq from './../../cq/cq_aalOffers.json';


import {
  asyncCallStatus,
  myOffers,
} from './reducer';

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') {
  a11y(React, ReactDOM);
  window.myOffers = window.rtdOfferJSON;
}


axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = {
    cqContent: result.data,
    myOffers: window.rtdOfferJSON.output || {},

  };
  const store = configureStore(initialState, {
    myOffers,
    asyncCallStatus,
  });
  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };

  render();
});
