import { fromJS } from 'immutable';

export const cqContent = (state = {}, action) => {
  const immutableCQContent = fromJS({ label: {}, error: {}, html: {} });
  switch (action.type) {
    default:
      return immutableCQContent.mergeDeep(state);
  }
};

export const billingInfo = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export const devices = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export const plans = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export const selectedShippingType = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export const shippingInfo = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export const orderDetails = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
