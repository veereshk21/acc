// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
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
          offerPage: () => import('./containers/'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.offerPage.default;
          injectReducer('form', reduxForm);
          injectReducer('asyncCallStatus', loaded.reducer.asyncCallStatus);
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
