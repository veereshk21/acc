/**
 * Created by santhra  on 6/15/2017.
 */
/**
 *
 * This is the entry file for the application
 *
* */
import 'babel-polyfill';
import ReactDOM from 'react-dom';

import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';
import rtdOfferInfo, { asyncCallStatus } from './reducer';

import './../../css/modules/menu.css';
import './../../css/modules/swiper.css';
import './../../css/base/base.css';
import './../../css/base/fonts.css';
import './../../css/layout/layout.css';
import './../../css/modules/buttons.css';
import './../../css/modules/singles.css';
import './../../css/modules/icons.css';
import './../../css/pages/aalOffers/myOffers.css';

__webpack_public_path__ = window.resourceBaseUrl;

const initialState = {
  rtdOfferInfo: window.rtdOfferJSON.output,
};

const store = configureStore(initialState, { asyncCallStatus, rtdOfferInfo });

const render = () => {
  ReactDOM.render(
    provider(store, createRoutes(store)),
    document.getElementById('app')
  );
};

render();
