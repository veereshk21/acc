import { reducer as reduxForm } from 'redux-form/immutable';
import Loadable from 'react-loadable'; // required for code splitting
import React from 'react'; // required for loadable render method execution

import { getAsyncInjectors } from './../asyncInjectors';
import Loader from './../common/Loader/Loader'; // required for loadable

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer } = getAsyncInjectors(store);
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
          injectReducer('main', loaded.reducer.main);
          injectReducer('form', reduxForm);
          injectReducer('iMEIResponse', loaded.reducer.iMEIResponse);
          injectReducer('showCheckedDevices', loaded.reducer.checkedDevicesResponse);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/sim',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/Sim'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          injectReducer('main', loaded.reducer.main);
          injectReducer('iMEIResponse', loaded.reducer.iMEIResponse);
          injectReducer('simValidationResponse', loaded.reducer.simValidationResponse);
          injectReducer('showCheckedDevices', loaded.reducer.checkedDevicesResponse);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/simStatus',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/SimStatus'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          injectReducer('main', loaded.reducer.main);
          injectReducer('showCheckedDevices', loaded.reducer.checkedDevicesResponse);
          injectReducer('simValidationResponse', loaded.reducer.simValidationResponse);
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
