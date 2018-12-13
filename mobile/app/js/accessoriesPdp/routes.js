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
  const { injectReducer } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          Page: () => import('./containers/index'),
          Reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.Page.default;
          injectReducer('tabs', loaded.Reducer.tabs);
          injectReducer('output', loaded.Reducer.output);
          injectReducer('cqKeys', loaded.Reducer.cqKeys);
          injectReducer('deviceRatingsReviews', loaded.Reducer.deviceRatingsReviewsReducer);
          injectReducer('asyncCallStatus', loaded.Reducer.asyncCallStatus);
          injectReducer('deviceConfig', loaded.Reducer.customizeDeviceReducer);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/chooseColor/skuId=:selectedSkuId',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          ColorPage: () => import('./containers/ChooseColor'),
          Reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.ColorPage.default;
          injectReducer('asyncCallStatus', loaded.Reducer.asyncCallStatus);
          injectReducer('deviceConfig', loaded.Reducer.customizeDeviceReducer);
          injectReducer('cqKeys', loaded.Reducer.cqKeys);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/chooseCapacity/skuId=:selectedSkuId',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          CapacityPage: () => import('./containers/ChooseCapacity'),
          Reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.CapacityPage.default;
          injectReducer('asyncCallStatus', loaded.Reducer.asyncCallStatus);
          injectReducer('deviceConfig', loaded.Reducer.customizeDeviceReducer);
          injectReducer('cqKeys', loaded.Reducer.cqKeys);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/fullDescription',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          DescriptionPage: () => import('./containers/ProductsFullDescription'),
          Reducer: () => import('./reducer'),
        },
        render(loaded, props) {
          const Component = loaded.DescriptionPage.default;
          injectReducer('output', loaded.Reducer.output);
          injectReducer('cqKeys', loaded.Reducer.cqKeys);
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '/reviewDetail',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./containers/ReviewDetailContainer'),
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
