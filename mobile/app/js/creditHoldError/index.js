
import 'babel-polyfill';
import ReactDOM from 'react-dom';

import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';

import './../../css/modules/menu.css';
import './../../css/base/base.css';
import './../../css/base/fonts.css';
import './../../css/layout/layout.css';
import './../../css/modules/buttons.css';
import './../../css/modules/singles.css';
import './../../css/modules/icons.css';
import './../../css/modules/modules.css';

__webpack_public_path__ = window.resourceBaseUrl;

// import initialState from './../../json/orderFailJSON';
const initialState = window.creditHoldErrorJSON;

const store = configureStore({ details: initialState });

const render = () => {
  ReactDOM.render(
    provider(store, createRoutes(store)),
    document.getElementById('app')
  );
};

render();
