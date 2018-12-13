import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`

import App from './common/App';

setTimeout(() => {
  const spinner = document.querySelector('.spinner');
  if (typeof spinner !== 'undefined' && spinner !== null) spinner.removeAttribute('class');
}, 200);

export default function provider(store, routeConfig) {
  // Sync history and store, as the react-router-redux reducer
  // is under the non-default key ("routing"), selectLocationState
  // must be provided for resolving how to retrieve the "route" in the state

  /**
   *
   */
  /*  const history = syncHistoryWithStore(hashHistory, store, {
      selectLocationState: selectLocationState(),
    }); */
  return (
    <Provider store={store}>
      <HashRouter>
        <App routemap={routeConfig} />
      </HashRouter>
    </Provider>
  );
}
