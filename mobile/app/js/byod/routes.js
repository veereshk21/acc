import React from 'react'; // required for loadable render method execution

import Loadable from 'react-loadable'; // required for code splitting
import { reducer as reduxForm } from 'redux-form/immutable';

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
          page: () => import('./containers'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('main', loaded.reducer.main);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/deviceBrand',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/DeviceBrand'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          injectReducer('main', loaded.reducer.main);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/deviceBrandList',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/DeviceBrandList'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          injectReducer('main', loaded.reducer.main);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/deviceModel',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/DeviceModel'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          injectReducer('main', loaded.reducer.main);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/imei/:mydevices?',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/IMEIContainer'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          injectReducer('main', loaded.reducer.main);
          injectReducer('iMEIResponse', loaded.reducer.iMEIResponse);
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
          page: () => import('./containers/SIMContainer'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          injectReducer('main', loaded.reducer.main);
          injectReducer('iMEIResponse', loaded.reducer.iMEIResponse);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/byodStatus',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/IMEIStatusContainer'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          injectReducer('main', loaded.reducer.main);
          injectReducer('iMEIResponse', loaded.reducer.iMEIResponse);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/simPrompt',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/SIMPromptContainer'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('form', reduxForm);
          injectReducer('main', loaded.reducer.main);
          injectReducer('iMEIResponse', loaded.reducer.iMEIResponse);
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
