import React from 'react'; // required for loadable render method execution
import Loadable from 'react-loadable'; // required for code splitting
import { getAsyncInjectors } from './../asyncInjectors';
import Loader from './../common/Loader/Loader'; // required for loadable

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
          Page: () => import('./containers'),
          Reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.Page.default;
          injectReducer('accessories', loaded.Reducer.accessoriesReducer);
          injectReducer('asyncCallStatus', loaded.Reducer.asyncCallStatus);
          injectReducer('cqContent', loaded.Reducer.cqContent);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/bundleView/:selectedSkuID?',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          BundleView: () => import('./containers/BundleAccessoryList'),
          Reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.BundleView.default;
          injectReducer('accessories', loaded.Reducer.accessoriesReducer);
          injectReducer('asyncCallStatus', loaded.Reducer.asyncCallStatus);
          injectReducer('cqContent', loaded.Reducer.cqContent);
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
