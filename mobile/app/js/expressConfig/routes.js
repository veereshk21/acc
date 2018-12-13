/**
 * Created by santhra  on 6/15/2017.
 */
import React from 'react'; // required for loadable render method execution
import { reducer as reduxForm } from 'redux-form/immutable';

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
          page: () => import('./containers/'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('expressConfigData', loaded.reducer.expressConfigData);
          injectReducer('moreDetailsInfo', loaded.reducer.getMoreInfoData);
          injectReducer('inventoryData', loaded.reducer.getPageInfoData);
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: 'appleCare',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/AppleCare'),
      }),
    },
    {
      path: 'moreDetails',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: import('./containers/MoreDetailsContainer'),
          reducer: import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('moreDetailsInfo', loaded.reducer.getMoreInfoData);
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/indentDecision/:modelIndex/:deviceId/:deviceSkuId/:deviceSorId/:contractTerm/:isTradeIn',
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/DecisionContainer'),
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
