/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';


/**
 * notification reducers
 *
 * This reducer makes it possible to show and hide web app notifications.
 * */
import { notification } from './common/NotificationBar/reducer';
import { sessionExtension } from './common/SessionOut/reducers';
// import { cartCount } from './common/GlobalNav/reducers';
// import * as feedbackReducer from './common/Feedback/reducer';

/**
 * Creates the main reducer with the asynchronously loaded ones
 * @param asyncReducers
 * @returns {*}
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routerReducer,
    notification,
    sessionExtension,
    // cartCount,
    // ...feedbackReducer,
    ...asyncReducers,
  });
}
