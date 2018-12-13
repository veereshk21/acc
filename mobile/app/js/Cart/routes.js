

import React from 'react'; // required for loadable render method execution
import { reducer as reduxForm } from 'redux-form/immutable';

import Loadable from 'react-loadable'; // required for code splitting
import Loader from './../common/Loader/Loader'; // required for loadable

import { getAsyncInjectors } from './../asyncInjectors';


export default function createRoutes(store) {
  const { injectReducer } = getAsyncInjectors(store);
  return [
    {
      path: '/',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/cart'),
      }),
    },
    {
      path: '/duetoday',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/DueToday'),
      }),
    },
    {
      path: '/duemonthly',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          DueMonthly: () => import('./containers/DueMonthly'),
          reducer: () => import('../common/DeviceProtection/reducer'),
        },
        render(loaded, props) {
          const Component = loaded.DueMonthly.default;
          injectReducer('deviceProtectionList', loaded.reducer.deviceProtectionList);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/planmonthly',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/CartPlanDueMonthly'),
      }),
    },
    {
      path: '/maininrebate',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/CartMainInRebate'),
      }),
    },
    {
      path: '/applecare',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/AppleCare'),
      }),
    },
    {
      path: '/activationFee',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/CartActivationFee'),
      }),
    },
    {
      path: '/instantCredit',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/InstantCredit'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/deviceProtection',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          DueMonthly: () => import('./containers/CartDueMonthly'),
          reducer: () => import('../common/DeviceProtection/reducer'),
        },
        render(loaded, props) {
          const Component = loaded.DueMonthly.default;
          injectReducer('deviceProtectionList', loaded.reducer.deviceProtectionList);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/cartPastDueMessage',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/PastDueMsgOverlay'),
      }),
    },
    {
      path: '/enterpromo',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/CartPromoCode'),
        render(loaded, props) {
          const Component = loaded.default;
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/enterZip',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/CartZipCode'),
      }),
    },
    {
      path: '/tradeindetails',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/TradeInDetails'),
      }),
    },
    {
      path: '/protection',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/CartDeviceProtection'),
      }),
    },
    {
      path: '/emailCart',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/EmailCartContainer'),
      }),
    },
    {
      path: '/shipByModal/:skuid',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/ShipByModalContainer'),
      }),
    },
    {
      path: '/bicOfferDetails/:skuid',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/BicOfferDetailsModalContainer'),
      }),
    },
    {
      path: '/promoModal/:promo/:id?',
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/PromoModalContainer'),
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
