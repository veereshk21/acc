/**
 * Created by hmahad on 2/16/2017.
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
          page: () => import('./containers'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('isFetching', loaded.reducer.isFetching);
          injectReducer('smartFamilyData', loaded.reducer.smartFamilyData);
          injectReducer('congratsData', loaded.reducer.congratsData);
          // injectReducer('selectedSmartFamilyData', loaded.reducer.selectedSmartFamilyData);
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/congrats',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/congrats'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('isFetching', loaded.reducer.isFetching);
          injectReducer('congratsData', loaded.reducer.congratsData);
          injectReducer('smartFamilyData', loaded.reducer.smartFamilyData);
          // injectReducer('selectedSmartFamilyData', loaded.reducer.selectedSmartFamilyData);
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
        loader: () => import('./../NotFoundPage/index'),
      }),
    },

  ];
}
