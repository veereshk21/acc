import React from 'react'; // required for loadable render method execution
import Loadable from 'react-loadable'; // required for code splitting
import Loader from './../common/Loader/Loader'; // required for loadable
import { getAsyncInjectors } from './../asyncInjectors';

export default function createRoutes(store) {
  const { injectReducer } = getAsyncInjectors(store);
  return [
    {
      path: '/',
      component: Loadable.Map({
        loading: Loader,
        loader: {
          page: () => import('./containers/index'),
          reducer: () => import('./reducer'),
          notificationsReducer: () => import('../common/NotificationBar/reducer'),
        },
        render(loaded, props) {
          const Component = loaded.page.default;
          injectReducer('asyncCallStatus', loaded.reducer.asyncCallStatus);
          injectReducer('notification', loaded.notificationsReducer.notification);
          injectReducer('additionalPlanDetails', loaded.reducer.additionalPlanDetailsReducer);
          return <Component {...props} />;
        },
      }),
    },
  ];
}
