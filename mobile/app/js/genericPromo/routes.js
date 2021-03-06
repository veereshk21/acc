import React from 'react';
import Loadable from 'react-loadable';
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
          injectReducer('myOfferReducer', loaded.reducer.default);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/more/:id?',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/more'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('myOfferReducer', loaded.reducer.default);
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
    }];
}
