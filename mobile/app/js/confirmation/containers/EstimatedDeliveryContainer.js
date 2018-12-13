/**
 * Created by gautam on 2/5/2017.
 */

import { connect } from 'react-redux';
import EstimatedDelivery from '../components/EstimatedDelivery';

/* eslint-disable arrow-body-style */
const mapStateToProps = (state) => {
  const data = state.get('confirmationView').toJS();
  return {
    text: data.estimatedDelivery,
    sddWindow: data.selectedShippingType.selectedFormattedWindow,
    cqContent: data.cqJSON,
  };
};

const EstimatedDeliveryContainer = connect(mapStateToProps)(EstimatedDelivery);

export default EstimatedDeliveryContainer;
