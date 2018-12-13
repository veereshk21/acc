/**
 * Created by santhra  on 6/19/2017.
 */
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
          page: () => import('./containers/index'),
          reducer: () => import('./reducer'),
          render(loaded, props) {
            const Component = loaded.page.default;
            injectReducer('preOrderPlanData', loaded.reducer.preOrderPlanData);
            return <Component {...props} />;
          },
        },
      }),
    },
    {
      path: '/planDetail/:planIndex',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/PlanFeatureDetailContainer'),
      }),
    },
    {
      path: '/taxesDetail',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/TaxesDetailContainer'),
          reducer: () => import('./reducer'),
          render(loaded, props) {
            const Component = loaded.page.default;
            injectReducer('comparePlanDetails', loaded.reducer.comparePlanDetails);
            return <Component {...props} />;
          },
        },
      }),
    },
    {
      path: '/comparePlanDetail',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/CompareplanDetailContainer'),
          reducer: () => import('./reducer'),
          render(loaded, props) {
            const Component = loaded.page.default;
            injectReducer('comparePlanDetails', loaded.reducer.comparePlanDetails);
            return <Component {...props} />;
          },
        },
      }),
    },
    {
      path: '/comparePlan/:planSkuID',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/ComparePlan'),
          reducer: () => import('./reducer'),
          render(loaded, props) {
            const Component = loaded.page.default;
            injectReducer('comparePlanDetails', loaded.reducer.comparePlanDetails);
            return <Component {...props} />;
          },
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
