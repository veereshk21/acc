/**
 * Created by santhra  on 6/15/2017.
 */
// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import React from 'react'; // required for loadable render method execution
import Loadable from 'react-loadable'; // required for code splitting
import { getAsyncInjectors } from './../asyncInjectors';
import Loader from './../common/Loader/Loader'; // required for loadable

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
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('rtdOfferReducer', loaded.reducer.default);
          return <Component {...props} />;
        },
      }),
    },

    {
      path: '/selectedOffer/:offerId?',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/OfferDetailContainer'),
      }),
    },
    {
      path: '/termsConditions',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/TermsConditionsContainer'),
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
