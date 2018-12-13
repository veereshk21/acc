/**
 * Created by sgumma on 22-02-2017.
 */
import 'babel-polyfill';
import ReactDOM from 'react-dom';

import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';

import './../../css/base/base.scss';
import './../../css/base/fonts.scss';
import './../../css/layout/layout.scss';
import './../../css/modules/buttons.scss';
import './../../css/modules/singles.scss';
import './../../css/modules/icons.scss';
import '../../css/layout/grid.scss';
import './../../css/modules/modal.scss';

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

