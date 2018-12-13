import React from 'react';
import Loadable from 'react-loadable';
import { reducer as reduxForm } from 'redux-form/immutable';
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
          page: () => import('./containers/index'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('userInfo', loaded.reducer.userInfo);
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/storeSuccess',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/storeSuccessContainer'),
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
    }];
}
