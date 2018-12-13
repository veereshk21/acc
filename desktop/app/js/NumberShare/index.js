/**
 *
 * This is the entry file for the application
 *
 * */
import 'babel-polyfill';
import axios from 'axios';
import ReactDOM from 'react-dom';

import {
  asyncCallStatus, cqContent, deviceDetails, numberShare, emergencyContactInfo, selectedMtn,
} from './reducer';
import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';

import '../../css/layout/grid.scss';
import './../../css/modules/menu.scss';
import './../../css/modules/modules.scss';
import './../../css/base/base.scss';
import './../../css/base/fonts.scss';
import './../../css/layout/layout.scss';
import './../../css/modules/buttons.scss';
import './../../css/modules/singles.scss';
import './../../css/modules/icons.scss';
import './../../css/pages/noShare/noShare.scss';
import '../../css/pages/numberShare/numberShare.scss';
import cq from './../../cq/cq_numberShare.json';

// import mdnJSON from './../../json/numberShare/noShare';

__webpack_public_path__ = window.resourceBaseUrl;
if (process.env.NODE_ENV !== 'production') {
  // window.mdnJSON = mdnJSON;
}

const agentSiteId = window.siteId;
let cqFilePath = cq;
if (agentSiteId) {
  cqFilePath = cq.replace('jsons/', `jsons/${agentSiteId}/`);
}

const render = (result) => {
  // Creating the initial state
  const initialState = {
    numberShare: (window.mdnJSON && window.mdnJSON.output) || (result.data && result.data.data.output),
    statusCode: window.mdnJSON.statusCode,
    cqContent: typeof result.data !== typeof undefined && Object.keys(result.data).length > 0 ? result.data : { html: {}, label: {}, error: {} },
  };

  // Creating the store with initial state
  const store = configureStore(initialState, {
    cqContent, asyncCallStatus, deviceDetails, numberShare, emergencyContactInfo, selectedMtn,
  });


  // Calling the render method of ReactDOM, with Providers
  ReactDOM.render(
    provider(store, createRoutes(store)),
    document.getElementById('app')
  );
};

if (window.CQContentJson) {
  render(window.CQContentJson);
} else {
  axios.get(__webpack_public_path__ + cqFilePath).then((result) => {
    render(result);
  });
}
