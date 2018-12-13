import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uniqBy } from 'lodash';
import * as actionCreators from '../actions';
import AddOfferPage from '../components/';

function mapStateToProps(state) {
  const data = state.toJSON();
  const asyncCallStatus = state.get('asyncCallStatus');
  const selectedSku = data.pageJSON.skus.filter((sku) => sku.preSelected)[0] || data.pageJSON.skus[0];
  const colorSkus = uniqBy(data.pageJSON.skus, 'colorName');
  const capacitySkus = data.pageJSON.skus.filter((sku) => sku.colorCode === selectedSku.colorCode);
  const selectedContract = selectedSku.paymentOptions.filter((opt) => opt.selected)[0] || selectedSku.paymentOptions[0];
  return {
    colorSkus,
    capacitySkus,
    selectedSku,
    selectedContract,
    pageJSON: data.pageJSON,
    ...asyncCallStatus,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddOfferPage);
