/**
 * Created by sgumma on 22-02-2017.
 */
import React from 'react'; // required for loadable render method execution

import Loadable from 'react-loadable'; // required for code splitting
import Loader from './../common/Loader/Loader'; // required for loadable
import { getAsyncInjectors } from './../asyncInjectors';

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/index'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('asyncCallStatus', loaded.reducer.asyncCallStatus);
          injectReducer('onAjaxResponse', loaded.reducer.onAjaxResponse);
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
