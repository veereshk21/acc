// import { hashHistory } from './../../store';
import * as types from './constants';

/**
 * tradeInOptionsChange(goToUrl)
 * @param goToUrl
 * @returns {{type, goToUrl: *}}
 */
export function tradeInOptionsChange(goToUrl) {
  return {
    type: types.CHANGE_TRADEIN_OPTION,
    goToUrl,
  };
}
