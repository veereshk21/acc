/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createReducer from './combineReducers';

export const history = createHistory();
export const hashHistory = createHistory();
export default function configureStore(initialState = {}, reducers = {}) {
  // Create the store with two middlewares
  // 1. thunk.default: Makes redux-thunk work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    thunk,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */
  /**
   *
   */
  const store = createStore(
    createReducer(reducers),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  store.asyncReducers = Object.assign({}, reducers); // Async reducer registry
  /* holds all reducers to remember initial ones so that reducers can be replaced */

  // Make reducers hot reloadable

  /* if (module.hot) {
    module.hot.accept('./checkout/reducer', () => {
      System.import('./checkout/reducer').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  } */

  return store;
}

