// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business

import Loadable from 'react-loadable'; // required for code splitting

import Loader from './../common/Loader/Loader';
// required for loadable


export default function createRoutes() {
  // Create reusable async injectors using getAsyncInjectors factory

  return [
    {
      path: '/',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/index'),
      }),
    },
    {
      path: '/decision/:discount?',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/PlanDecision'),
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
      path: '/promoModal/:promo/:id?',
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/PromoModalContainer'),
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
