/**
 * Created by sgumma on 22-02-2017.
 */
import 'babel-polyfill';
import ReactDOM from 'react-dom';

import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';

import './../../css/modules/menu.css';
import './../../css/base/base.css';
import './../../css/base/fonts.css';
import './../../css/layout/grid.css';
import './../../css/layout/layout.css';
import './../../css/modules/buttons.css';
import './../../css/modules/singles.css';
import './../../css/modules/icons.css';

__webpack_public_path__ = window.resourceBaseUrl;
const errorJson = typeof window.errorJSON.response !== 'undefined' ? window.errorJSON.response : window.errorJSON;
const initialState = {
  output: errorJson,
};

const store = configureStore(initialState);

const render = () => {
  ReactDOM.render(
    provider(store, createRoutes(store)),
    document.getElementById('app')
  );
};

render();
