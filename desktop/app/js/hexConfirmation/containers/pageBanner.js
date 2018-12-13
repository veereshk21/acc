import { connect } from 'react-redux';
import PageBanner from './../components/pageBanner';

/* eslint-disable arrow-body-style */
const mapStatetoProps = (state) => {
  const data = state.toJS().confirmationView;
  return {
    cqKeys: data.cqKeys,
    devices: data.devices,
    accessories: data.accessories,
    multiOrderDetails: data.multiOrderDetails,
    comboOrder: data.comboOrder,
    subOrders: data.subOrders,
    orderId: data.orderId,
    confirmationEmail: data.confirmationEmail,
  };
};

export default connect(mapStatetoProps)(PageBanner);
