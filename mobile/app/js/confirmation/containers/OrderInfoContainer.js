/**
 * Created by gautam on 2/5/2017.
 */

import { connect } from 'react-redux';

import OrderInfo from '../components/OrderInfo';

const mapStateToProps = (state) => { // eslint-disable-line
  const data = state.get('confirmationView').toJS();
  return {
    orderId: data.orderId,
    cqKeys: data.cqJSON,
    multiOrderDetails: data.multiOrderDetails,
    locationCode: data.locationCode,
    creditApplicationNumber: data.creditApplicationNumber,
    // Flag to detect Agent site, used automatic type convertion
    isAgentSite: !!window.siteId,
  };
};

const OrderInfoContainer = connect(mapStateToProps)(OrderInfo);

export default OrderInfoContainer;
