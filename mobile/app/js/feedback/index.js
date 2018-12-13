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

const cqJson = {
  html: {},
  label: {
    OD_FEEDBACK_TITLE: 'Rate your experience.',
    OD_FEEDBACK_SUBTITLE: 'Your feedback means a lot to us, good or bad.',
    OD_FEEDBACK_COMMENT_TEXT: 'Tell us how great we are or how we can improve.',
    OD_FEEDBACK_CANCEL_CTA: 'Cancel',
    OD_FEEDBACK_SUBMIT_CTA: 'Submit',
    OD_FEEDBACK_BACK_CTA: 'Back',
  },
  error: {},
};

let cqContentJson = null;

if (typeof window.cqJson !== typeof undefined && Object.keys(window.cqJson).length > 0) {
  cqContentJson = window.cqJson;
} else {
  cqContentJson = cqJson;
}

const initialState = { cqContent: cqContentJson };

const store = configureStore(initialState);

const render = () => {
  ReactDOM.render(
    provider(store, createRoutes(store)),
    document.getElementById('app')
  );
};

render();
