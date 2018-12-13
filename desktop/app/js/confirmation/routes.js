import React from 'react';
import Loadable from 'react-loadable';
import { reducer as reduxForm } from 'redux-form/immutable';
import { getAsyncInjectors } from './../asyncInjectors';
import Loader from './../common/Loader/Loader';


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
}
