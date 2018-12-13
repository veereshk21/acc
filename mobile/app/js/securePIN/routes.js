// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import React from 'react';
import Loadable from 'react-loadable';
import { push } from 'react-router-redux';
import { getAsyncInjectors } from './../asyncInjectors';
import Loader from './../common/Loader/Loader';

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
          page: () => import('./containers'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('securePIN', loaded.reducer.securePIN);
          injectReducer('asyncCallStatus', loaded.reducer.asyncCallStatus);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/other',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('securePIN', loaded.reducer.securePIN);
          injectReducer('asyncCallStatus', loaded.reducer.asyncCallStatus);
          if (!store.getState().get('securePIN').currentDevice) {
            store.dispatch(push('/'));
          }
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/learnMore',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/inactiveMethodsLearnMore'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/limitError',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/limitError'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/code',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/codeEntry'),
          reducer: () => import('./reducer'),
          notificationsReducer: () => import('../common/NotificationBar/reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('securePIN', loaded.reducer.securePIN);
          injectReducer('notification', loaded.notificationsReducer.notification);
          if (!store.getState().get('securePIN').currentDevice) {
            store.dispatch(push('/'));
          }
          return <Component {...props} />;
        },
      }),
    },
  ];
}
