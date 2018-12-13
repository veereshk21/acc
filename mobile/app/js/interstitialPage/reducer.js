/**
 * Created by santhra  on 6/15/2017.
 */
/*
 *
 * Homepage reducer
 *
 */

import { fromJS } from 'immutable';

const initialState = fromJS({});

function interstitialPageReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default interstitialPageReducer;
