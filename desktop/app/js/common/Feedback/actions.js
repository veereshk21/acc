/**
 * Created by mambig on 6/21/17.
 */
import { HIDE_FEEDBACK, SHOW_FEEDBACK } from 'constants';


export function showFeedback() {
  return {
    type: SHOW_FEEDBACK,
  };
}

export function hideFeedback() {
  return {
    type: HIDE_FEEDBACK,
  };
}
