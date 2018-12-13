import React from 'react';
import Loadable from 'react-loadable';
import { reducer as reduxForm } from 'redux-form/immutable';
import { getAsyncInjectors } from './../asyncInjectors';

import Loader from './../common/Loader/Loader';

// const errorLoading = (err) => {
//   console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
// };

// const loadModule = (cb) => (componentModule) => {
//   cb(null, componentModule.default);
// };

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/index'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/shippingAddress',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/ShippingAddress'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/billingAddress',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/BillingAddress'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/shippingOptions',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/ShippingOptions'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/choosePaymentMethod/:type?',
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/PaymentMethods'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/digitalwallet/:type?',
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => {
            console.log('-- LOADING BAU PAYMENT METHOD --');
            return import('./containers/PaymentMethods/DigitalWallet');
          },
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/addNewCard/:type?',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/PaymentMethods/AddCard'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          injectReducer('cyberSourceData', loaded.reducer.cyberSourceData);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/giftCards',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/GiftCards'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/dueToday',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/DueToday'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/genericError',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./../common/GenericError/index'),
      }),
    },
    {
      path: '*',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./../NotFoundPage/index'),
      }),
    },
  ];
}
