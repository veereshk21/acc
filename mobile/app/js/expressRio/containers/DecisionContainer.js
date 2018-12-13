/*
 * Created on Thu Aug 31 2017
 *
 * Copyright (c) 2017 Verizon Wireless
 * Author Srikrishna Gumma
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import IntentDecision from '../components/IntentDecision';

function mapStateToProps(state, ownProps) {
  const data = state.toJS();
  const defaultDevice = data.offerConfigData.devices.filter((dev) => dev.deviceProdId === ownProps.params.deviceId)[0];
  const selectedSku = defaultDevice.skus.filter((sku) => sku.id === ownProps.params.skuId)[0];
  const { offerConfigData } = data;
  const { cqdata } = data;
  return {
    defaultDevice,
    selectedSku,
    cqdata,
    ...ownProps.params,
    ...offerConfigData,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(IntentDecision);
