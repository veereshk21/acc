/**
 * Created by santhra  on 6/15/2017.
 */
import { reducer as reduxForm } from 'redux-form/immutable';
import React from 'react'; // required for loadable render method execution

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
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/ChooseCar'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('humConfigData', loaded.reducer.humConfigData);
          injectReducer('isCarDetailsValid', loaded.reducer.isCarDetailsValid);
          injectReducer('isFetching', loaded.reducer.isFetching);
          injectReducer('makeData', loaded.reducer.makeData);
          injectReducer('modelAndColorData', loaded.reducer.modelAndColorData);
          injectReducer('selectedData', loaded.reducer.selectedData);
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/chooseCar',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/ChooseCar'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('humConfigData', loaded.reducer.humConfigData);
          injectReducer('isCarDetailsValid', loaded.reducer.isCarDetailsValid);
          injectReducer('isFetching', loaded.reducer.isFetching);
          injectReducer('makeData', loaded.reducer.makeData);
          injectReducer('modelAndColorData', loaded.reducer.modelAndColorData);
          injectReducer('selectedData', loaded.reducer.selectedData);
          injectReducer('onEmailError', loaded.reducer.onEmailError);
          injectReducer('enteredEmailDetails', loaded.reducer.enteredEmailDetails);
          injectReducer('form', reduxForm);
          return <Component {...props} />;
        },
      }),
    },

    {
      path: '/chooseEmail',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/ChooseEmail'),
          reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('selectedData', loaded.reducer.selectedData);
          injectReducer('onEmailError', loaded.reducer.onEmailError);
          injectReducer('isFetching', loaded.reducer.isFetching);
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
