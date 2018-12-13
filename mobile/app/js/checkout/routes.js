import React from 'react';
import Loadable from 'react-loadable';
import { reducer as reduxForm } from 'redux-form/immutable';
import { getAsyncInjectors, injectAsyncReducer } from './../asyncInjectors';
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
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/customerAgreement',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/CustomerAgreement'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/eppAgreement',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/TermsAndConditions'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/tradeInAgreement',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/TradeInAgreementContainer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/estimatedTradeIn',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/EstimatedTradeInCredit'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    }, {
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
      path: '/activationFee',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/ActivationFeeContainer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/choosePaymentMethod/:type?',
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => {
            if (window.reviewOrderJSON.output.paymentMethodRedesign) {
              console.log('-- LOADING REDESIGNED PAYMENT METHOD --');
              // return import('./containers/ChoosePaymentMethod_RD');

              return import('./containers/PaymentMethods');
            }
            console.log('-- LOADING BAU PAYMENT METHOD --');
            return import('./containers/ChoosePaymentMethod');
          },
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/savedPayments/:type?',
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/PaymentMethods/SavedPayments'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
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
      path: '/shippingMethod/:type?',
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/ShippingMethodContainer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/vendorAccessory/:type?',
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/VendorAccessoryContainer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/deliveryInformation',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/DeliveryInformationContainer'),
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
          page: () => import('./containers/DueTodayContainer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/dueMonthly',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/DueMonthlyContainer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/planMonthly',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/PlanDueMonthlyContainer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/addPaymentPastDue',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/AddPaymentMethod'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/addPaymentMethod/:type?',
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/AddPaymentMethod'),
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
      path: '/entercvc',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/MissingCVC'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/pickuplocation',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/PickupLocation'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('storeDetails', loaded.reducer.storeDetails);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/ispu',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/InStorePickUpContainer'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('storeDetails', loaded.reducer.storeDetails);
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/storeDetailPage',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/ISPUStoreDetailContainer'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('storeDetails', loaded.reducer.storeDetails);
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/ISPUContactInfo',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/ISPUContactInfoContainer'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('storeDetails', loaded.reducer.storeDetails);
          injectReducer('form', reduxForm);
          injectReducer('orderDetails', loaded.reducer.orderDetails);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/bicOfferDetails/:deviceId',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/BicOfferDetailsModalContainer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/serviceAddress/:deviceId',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/ServiceAddress'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
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
      path: '/tradeInAddress',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/CustomerAgreement'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectAsyncReducer('form', reduxForm);
          injectReducer('storeDetails', loaded.reducer.storeDetails);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/promoModal',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/CustomerAgreement'),
          reducer: () => import('./reducer'),
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
