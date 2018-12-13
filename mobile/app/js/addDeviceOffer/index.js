import 'babel-polyfill';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { asyncCallStatus } from './reducer';
import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';


import './../../css/base/base.css';
import './../../css/base/fonts.css';
import './../../css/layout/grid.css';
import './../../css/layout/layout.css';
import './../../css/states/states.css';
import './../../css/modules/buttons.css';
import './../../css/modules/radioButtons.css';
import './../../css/modules/singles.css';
import './../../css/modules/icons.css';
import './../../css/modules/menu.css';
import './../../css/modules/modules.css';

__webpack_public_path__ = window.resourceBaseUrl;

const fallback = {
  statusCode: '00',
  output: {
    offerTitle: 'Nice Choice. Here is an offer that will make it even better',
    offerDescription: '..................',
    legalCopy: '........................',
    productId: '',
    commerceItemId: '',
    selectedSkuId: '',
    deviceId: 'dev6640012',
    displayName: 'Ay Device',
    brandName: 'Apple',
    displayImageURL: 'https://ss7.vzw.com/is/image/VerizonWireless/Quanta_Wear_24_Silver_Rev?fmt=png&qlt=80,1&wid=210&hei=330',
    addDeviceUrl: '/digital/addDeviceUrl',
    skipOfferUrl: '/digital/skipOfferUrl',
    skus: [
      {
        deviceType: 'Smart',
        deviceSorId: 'ABCDEFGFHH',
        skuId: 'sku12345',
        colorName: 'Black',
        colorCode: '#000000',
        displayName: 'Apple Black',
        size: '38mm',
        inventoryStatus: '1001',
        inventoryAvaliableDate: '12/23/2017',
        isPreOrderDevice: true,
        preSelected: false,
        deviceImage: 'https://ss7.vzw.com/is/image/VerizonWireless/Quanta_Wear_24_Silver_Rev?fmt=png&qlt=80,1&wid=210&hei=330',
        paymentOptions: [
          {
            price: '27.08',
            description: '$0 Down (for qualified customers) $27.08/mo for 24 months; 0% APR Retail Price: $649.99',
            downPayment: '0.00',
            strikeOutPrice: '27.08',
            priceText: '24 Monthly Payments',
            priceDetail: '/mo.',
            selected: true,
            contractTerm: 99,
          },
          {
            price: '649.99',
            description: 'No Early Termination Fee',
            downPayment: '0.00',
            strikeOutPrice: '649.99',
            priceText: 'Retail Price',
            priceDetail: null,
            selected: false,
            contractTerm: 0,
          },
        ],
      },
    ],
  },
  errorMap: null,
  statusMessage: null,
};
// // {"output":{"redirectUrl":"/digital/protection","success":true},"ErrorMap":null,"statusMessage":"","statusCode":"00"}
// passing fallback to avoid flow break.
const pageJSON = typeof window.deviceOfferJSON !== 'undefined' ? window.deviceOfferJSON : fallback;


const initialState = {
  pageJSON: pageJSON.output,
};

const store = configureStore(initialState, { asyncCallStatus });
injectTapEventPlugin();

const render = () => {
  ReactDOM.render(
    provider(store, createRoutes(store)),
    document.getElementById('app')
  );
};

render();
