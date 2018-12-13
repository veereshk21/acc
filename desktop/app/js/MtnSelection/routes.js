import Loadable from 'react-loadable';
import React from 'react';
import { reducer as reduxForm } from 'redux-form/immutable';


import { getAsyncInjectors } from './../asyncInjectors';
import Loader from './../common/Loader/Loader';
// import Logger from './../../../server/logger';

const createRoutes = (store) => {
  // Logger.debug('Inside mdnSelection Routes');
  console.debug('Inside mdnSelection Routes'); // eslint-disable-line
  const { injectReducer } = getAsyncInjectors(store);
  return [
    {
      path: '/',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/mdnSelection'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('selectedMDN', loaded.reducer.selectedMDN);
          injectReducer('selectedMdnDetails', loaded.reducer.selectedMdnDetails);
          injectReducer('submitAgreementResponse', loaded.reducer.submitAgreementResponse);
          injectReducer('transferUpgrade', loaded.reducer.transferUpgrade);
          injectReducer('preOrderPostResponse', loaded.reducer.preOrderResponse);
          injectReducer('form', reduxForm);
          injectReducer('userAction', loaded.reducer.userAction);
          injectReducer('showModal', loaded.reducer.showModal);
          injectReducer('showEUPPendingConfirmation', loaded.reducer.showEUPPendingConfirmation);
          injectReducer('asyncCallStatus', loaded.reducer.asyncCallStatus);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/pendingOrder',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/PendingOrder'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('selectedMDN', loaded.reducer.selectedMDN);
          injectReducer('loaderFlag', loaded.reducer.loaderFlag);
          injectReducer('cancelPendingOrderResponse', loaded.reducer.cancelPendingOrderResponse);
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/limitExceeded',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/LimitExceededContainer'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('selectedMDN', loaded.reducer.selectedMDN);
          injectReducer('loaderFlag', loaded.reducer.loaderFlag);
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/dppAgreement',
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/DppAgreement'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('mdnSelectionView', loaded.reducer.changeMDNSelectionView);
          injectReducer('selectedMDN', loaded.reducer.selectedMDN);
          injectReducer('submitAgreementResponse', loaded.reducer.submitAgreementResponse);
          injectReducer('loaderFlag', loaded.reducer.loaderFlag);
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/dppAppraisal',
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/DppAppraisal'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('mdnSelectionView', loaded.reducer.changeMDNSelectionView);
          injectReducer('selectedMDN', loaded.reducer.selectedMDN);
          injectReducer('submitAgreementResponse', loaded.reducer.submitAgreementResponse);
          injectReducer('loaderFlag', loaded.reducer.loaderFlag);
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/dppAppraisalQualification',
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/DppAppraisalQualification'),
      }),
    },
    {
      path: '/inEligibleError',
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/InEligibleError'),
      }),
    },
    {
      path: '/pastDue',
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/PastDue'),
      }),
    },
    {
      path: '/alwaysEligible',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/AlwaysEligible'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('selectedMDN', loaded.reducer.selectedMDN);
          injectReducer('submitAgreementResponse', loaded.reducer.submitAgreementResponse);
          injectReducer('loaderFlag', loaded.reducer.loaderFlag);
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/annualUpgrade',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/AnnualUpgrade'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('selectedMDN', loaded.reducer.selectedMDN);
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/requestFailed',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/CancelOrderFailure'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('cancelPendingOrderResponse', loaded.reducer.cancelPendingOrderResponse);
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/earlyTwoYear/:mdn?',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/EarlyTwoYearAgreement'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('mdnSelectionView', loaded.reducer.changeMDNSelectionView);
          injectReducer('selectedMDN', loaded.reducer.selectedMDN);
          injectReducer('submitAgreementResponse', loaded.reducer.submitAgreementResponse);
          injectReducer('loaderFlag', loaded.reducer.loaderFlag);
          injectReducer('form', reduxForm);
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
        loader: () => import('./../common/NotFoundPage/index'),
      }),
    },
  ];
};

export default createRoutes;
