import React from 'react';
import Loadable from 'react-loadable';
import Loader from './../common/Loader/Loader';


export default function createRoutes() {
  return [
    {
      path: '/',
      exact: true,
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/index'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          return <Component {...props} />;
        },
      }),
    },
    {
      path: '*',
      exact: true,
      component: Loadable({
        loading: Loader,
        loader: () => import('./../common/NotFoundPage/index'),
      }),
    },
  ];
}
