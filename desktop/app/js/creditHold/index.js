
import 'babel-polyfill';
import ReactDOM from 'react-dom';

import configureStore from './../store';
import createRoutes from './routes';
// import creditHoldErrorJSON from './../../json/creditHoldErrorJSON';
import provider from './../provider';

import '../../css/base/base.scss';
import '../../css/base/fonts.scss';
import '../../css/layout/grid.scss';
import '../../css/layout/layout.scss';
import '../../css/modules/buttons.scss';
import '../../css/modules/icons.scss';
import '../../css/modules/modules.scss';
import '../../css/modules/radioButtons.scss';
import '../../css/modules/singles.scss';
import '../../css/states/states.scss';
import './../../css/modules/checkbox.scss';
import './../../css/modules/gw.scss';
import './../../css/modules/menu.scss';
import './../../css/modules/modal.scss';
import './../../css/modules/notification.scss';
import './../../css/pages/creditHold/creditHold.scss';

// window.creditHoldErrorJSON = creditHoldErrorJSON;

__webpack_public_path__ = window.resourceBaseUrl;

const initialState = window.creditHoldErrorJSON;

const store = configureStore({ details: initialState });

const render = () => {
  ReactDOM.render(
    provider(store, createRoutes(store)),
    document.getElementById('app')
  );
};

render();
