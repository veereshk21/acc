
import Loadable from 'react-loadable'; // required for code splitting
import Loader from './../common/Loader/Loader'; // required for loadable
import { getAsyncInjectors } from './../asyncInjectors';

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars
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
      path: '/deviceList',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/DeviceListContainer'),
      }),
    },
    {
      path: '/reActivateDevice',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/ReActivateContainer'),
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
