// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import React from 'react'; // required for loadable render method execution
import Loadable from 'react-loadable'; // required for code splitting
import { getAsyncInjectors } from './../asyncInjectors';
import Loader from './../common/Loader/Loader'; // required for loadable


const createRoutes = (store) => {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars
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
          injectReducer('mdnSelectionView', loaded.reducer.changeMDNSelectionView);
          injectReducer('asyncCallStatus', loaded.reducer.asyncCallStatus);
          injectReducer('selectedMDN', loaded.reducer.selectedMDN);
          injectReducer('submitAgreementResponse', loaded.reducer.submitAgreementResponse);
          injectReducer('accountLevelInEligibleDetails', loaded.reducer.accountLevelInEligibleDetails);
          injectReducer('cancelPendingOrderResponse', loaded.reducer.cancelPendingOrderResponse);
          injectReducer('preOrderPostResponse', loaded.reducer.preOrderResponse);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/earlyTwoYear',
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
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/dppAgreement',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/dppAgreement'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('mdnSelectionView', loaded.reducer.changeMDNSelectionView);
          injectReducer('selectedMDN', loaded.reducer.selectedMDN);
          injectReducer('submitAgreementResponse', loaded.reducer.submitAgreementResponse);
          injectReducer('loaderFlag', loaded.reducer.loaderFlag);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/dppAppraisal',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/dppAppraisal'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('mdnSelectionView', loaded.reducer.changeMDNSelectionView);
          injectReducer('selectedMDN', loaded.reducer.selectedMDN);
          injectReducer('submitAgreementResponse', loaded.reducer.submitAgreementResponse);
          injectReducer('loaderFlag', loaded.reducer.loaderFlag);
          return <Component {...props} />;
        },
      }),
    }, {
      path: '/dppAppraisalQualification',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/dppQualifications'),
      }),
    },
    {
      path: '/pendingOrder',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/displayPendingOrder'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('selectedMDN', loaded.reducer.selectedMDN);
          injectReducer('loaderFlag', loaded.reducer.loaderFlag);
          injectReducer('cancelPendingOrderResponse', loaded.reducer.cancelPendingOrderResponse);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/pastDue',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/pastDueContainer'),
      }),
    },
    {
      path: '/alwaysEligible',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/alwaysEligible'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('mdnSelectionView', loaded.reducer.changeMDNSelectionView);
          injectReducer('selectedMDN', loaded.reducer.selectedMDN);
          injectReducer('submitAgreementResponse', loaded.reducer.submitAgreementResponse);
          injectReducer('loaderFlag', loaded.reducer.loaderFlag);
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
          page: () => import('./containers/cancelFail'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('cancelPendingOrderResponse', loaded.reducer.cancelPendingOrderResponse);
          return <Component {...props} />;
        },
      }),
    },
    {
      // to do
      path: '/annualUpgrade',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/annualUpgrade'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('selectedMDN', loaded.reducer.selectedMDN);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/limitExceeded',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/LimitExceededContainer'),
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
};
export default createRoutes;
