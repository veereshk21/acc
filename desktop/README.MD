# Module upgrades
### Changes in referencing `hashHistory`
Prior to this upgrades we were using ```hashHistory``` from ```react-router```. This is no longer valied with new `react-router` or `react-router-dom`

So to use the existing, Now the ``hashHistory`` being created from ``createHashHistory`` from ``history`` module under `store.js`

```js

import { hashHistory } from './../../store';

```
### Using `Link` from `react-router`

`Link` is also no longer part of `react-router`,  this ref should be now from `react-router-dom`

```js
import { Link } from 'react-router-dom'

```

### Changes in referencing `react-id-swiper pagination class`
With latest ```react-id-swiper @1.5.7``` the way we declare pagination class has changed to

```js

pagination: {
  el: '.swiper-pagination',
  clickable: true
}

```

### Using react-router v4

React-Router v4 was a complete re-write and doesn't have backward compatibility.  view documentation [React Training](https://reacttraining.com/react-router/).

Changes in Routes from V3 to V4

#### What is changed in our application level
The below code is added as part of common/App/index.js, the primary app container.

```html
 <section>
    <Switch>
        {this.props.routemap.map((route, i) =>
        (<Route key={i} path={route.path} component={route.component} exact={route.exact}/>)
        )}
    </Switch>
</section>
```

## Changes in routes.js
### React-Router V4 Routes (After module upgrade)
React-Router V4 upgrade lost ``getComponent()`` mehtod which was taking major portion on dynamic imports and code-splitting and lazy loading of chunks.

To replace the method now we have used `react-loadable` plugin to do the same.

Syntax of react-loadable
```js
export const myComponent =  Loadable({
    // loading option is required for Loadable, a component must be passed to loading property
    loading: Loader,
    // your custom component
    loader: () => import('./containers/component'),
    // render method is optional if we use only continer and no other custimization required.
    render(loaded, props){
        // to execute customized code.
        // if render method is used, the compoent should be returned.
        const Component = loaded.default;
        return <Component {...props} />
    }
})
```


```js
import React from 'react'
import Loadable from 'react-loadable';
import Loader from './../common/Loader/Loader';
import {getAsyncInjectors} from './../asyncInjectors';

export default function createRoutes(store) {
  const { injectReducer } = getAsyncInjectors(store);
  return [
    {
        path: '/',
        exact: true,
        component: Loadable({
        loading: Loader,
        loader: () => import('./containers/cart'),
        })
    },
  ]
}
```
### How to load dynamic reducers

```js
...
{
    path: '/duemonthly',
    exact: true,
    component: Loadable.Map({
    // loading option is required for Loadable, a component must be passed to loading property
    loading: Loader,
    // your custom component
    loader: {
       page: () => import('./containers/CartDueMonthly'),
       reducer: () => import('../common/DeviceProtection/reducer'),
    },
    render(loaded, props) {
        const Component = loaded.page.default;
        injectReducer('deviceProtectionList', loaded.reducer.deviceProtectionList);
        return <Component {...props}/>;
    }
    })
},
...
```
### loading reduxForm

```js
...
{
    path: '/enterpromo',
    exact: true,
    component:  Loadable({
    loading: Loader,
    loader: () => import('./containers/CartPromoCode'),
    render(loaded, props) {
        const Component = loaded.default;
        injectReducer('form', reduxForm);
        return <Component {...props}/>;
    }
    }),
},
...

```


##### React-Router V3 Routes (Before module upgrade)

```js
{
    path: '/',
    getComponent(nextState, cb) {
    const importModules = Promise.all([

        System.import('./containers/cart'),

    ]);

    const renderRoute = loadModule(cb);

    importModules.then(([component]) => {
        renderRoute(component);
    });

    importModules.catch(errorLoading);
    },
},
```

## CSS
  SASS
    SMACSS
  Minimal to no new custom CSS, please attempt to use existing classes to meet the design guidelines

## Steps for setting up code

##### Setup
     npm run setup

Or if you have yarn installed, the setup can be done by just running ``yarn``

This command will run inital setup and install all the dependencies and dev-dependencies installed.

#### Running Dev build

     npm run bundle:dev

This is developer version bundle, to be used while integrating with backend. All the bundles will be generated as non-minified version and the files are huge. These can't be copied to production
<hr />

#### Runnung production build
<hr>
To Generate the bundle for production use the below command needs to be executed

     npm run bundle:prod

This will generate bundles for production with minified version of javascript files compiled.

##### Page only Bundle

In this project Webpack has been configured to bundle pages, to make sure if there is any specific need to modify only one page of the application, we can just generate only that specific page and deploy it.
The below command will generate page level bundle


     node ./internals/webpack/bundle_page.js -b <pagename>


## List of pages Configured
    getStarted: - app/js/getStarted/
    homepage: - app/js/HomePage/
    accessories: - app/js/accessories/,
    pdp: - /js/pdp/,
    tradein: - /js/tradein/,
    gridwall: - /js/gw/,
    mdnSelection: - /js/mdnSelection/,
    cart: - /js/Cart/,
    configurator: - /js/configurator/,
    tradeInPrompt: - /js/tradeInPrompt/,
    checkout: - /js/checkout/,
    securePin: - /js/securePIN/,
    confirmation: - /js/confirmation/,
    accountDeposit: - /js/accountDeposit/,
    downPayment: - /js/downPayment/,
    protection: - /js/protection/,
    npanxx: - /js/npanxx/,
    orderFail: - /js/orderFail/,
    error: - /js/ErrorPage/,
    cpcPrompt: - /js/cpcPrompt/,
    numberSharePrompt: - /js/numberSharePrompt/,
    numShareSelectDevice: - /js/numShareSelectDevice/,
    myOffers: - /js/myOffers/,
    genericPromo: - /js/genericPromo/,
    accessoriesPdp: - /js/accessoriesPdp/,
    pastDueBalance:path.join(cwd,'app/js/pastDueBalance/,
    byodPrompt: - /js/byodPrompt/,
    byod: - /js/byod/,
    rtdOffers:path.join(cwd,'app/js/rtdOffers/,
    letsShop: - /js/returnExchange/letsShop/
<hr />

Development
npm run start
Starts the node development server running on http://localhost:3000

Bundle for play akka dev-server
npm run bundle:dev
Preps your app for deployment. Optimizes and creates source-maps for all files, piping them to the build folder.

Bundle for production server
npm run bundle:prod
The app is built for optimal performance: assets are minified and source maps are not included.

Linting
npm run lint
Lints your JavaScript.

Dependency size test
npm run analyze
This command will generate a stats.json file from your production build, which you can upload to the webpack analyzer. This analyzer will visualize your dependencies and chunks with detailed statistics about the bundle size.

Remove node_modules
npm run clean:modules
Removes node_modules folder and prepares your application for fresh installation.
