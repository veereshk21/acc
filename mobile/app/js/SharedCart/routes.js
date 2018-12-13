
// eslint-disable-next-line
import React from 'react'; // required for loadable render method execution

import Loadable from 'react-loadable'; // required for code splitting
import Loader from './../common/Loader/Loader'; // required for loadable

// import { getAsyncInjectors } from './../asyncInjectors';


export default function createRoutes() {
  // const { injectReducer } = getAsyncInjectors(store);
  return [
    {
      path: '/',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers'),
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
