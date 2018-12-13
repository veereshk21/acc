// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import React from 'react'; // required for loadable render method execution

import Loadable from 'react-loadable'; // required for code splitting

import Loader from './../common/Loader/Loader'; // required for loadable
import { getAsyncInjectors } from './../asyncInjectors';


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
          reducer: () => import('./reducer'),
          notificationsReducer: () => import('../common/NotificationBar/reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('notification', loaded.notificationsReducer.notification);
          injectReducer('additionalPlanDetails', loaded.reducer.additionalPlanDetailsReducer);
          injectReducer('asyncCallStatus', loaded.reducer.asyncCallStatus);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/planDetails',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/planDetails'),
      }),
    },
    {
      path: '/comparePlanCost/:plan',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/comparePlanCost'),
      }),
    },
    {
      path: '/comparePlan/:planSorId',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/ComparePlan'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('comparePlanDetails', loaded.reducer.comparePlans);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/taxesDetail/:planSorId',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/TaxDetails'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('comparePlanDetails', loaded.reducer.comparePlans);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/importantDataServiceInfo',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/importantDataServiceInfoContainer'),
      }),
    },
    {
      path: '/importantPlanInfo',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/importantPlanInfoContainer'),
      }),
    },
    {
      path: '/legacyPlanError',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/legacyPlanErrorContainer'),
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
