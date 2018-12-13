import { HIDE_OFFERS_BANNER, SHOW_OFFERS_BANNER } from './constants';

export const showOffersBanner = () => ({
  type: SHOW_OFFERS_BANNER,
});

export const hideOffersBanner = () => ({
  type: HIDE_OFFERS_BANNER,
});
