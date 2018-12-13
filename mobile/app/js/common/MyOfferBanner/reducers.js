import { HIDE_OFFERS_BANNER, SHOW_OFFERS_BANNER } from './constants';

export const myOffersBanner = (state = { show: false }, action) => {
  switch (action.type) {
    case SHOW_OFFERS_BANNER: {
      return Object.assign(state, { show: true });
    }
    case HIDE_OFFERS_BANNER: {
      return Object.assign(state, { show: false });
    }
    default: {
      return state;
    }
  }
};
