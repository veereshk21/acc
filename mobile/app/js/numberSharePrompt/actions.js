// import { hashHistory } from './../store';
import * as types from './constants';

/**
 * tradeInOptionsChange(goToUrl)
 * @param goToUrl
 * @returns {{type, goToUrl: *}}
 */
export function numberShareOptionsChange(goToUrl) {
  return {
    type: types.CHANGE_NUMBER_SHARE_OPTION,
    goToUrl,
  };
}
