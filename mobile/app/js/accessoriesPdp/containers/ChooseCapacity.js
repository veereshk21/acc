import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import ChooseCapacity from '../components/ChooseCapacity';

import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const data = state.toJSON();
  const asyncCallStatus = state.get('asyncCallStatus');
  const capacitySkus = data.deviceConfig.deviceSkus.filter((sku) => sku.colorName === data.deviceConfig.selectedColor);
  return {
    accId: data.deviceConfig.accId,
    accSkuId: data.deviceConfig.skuId,
    displayName: data.deviceConfig.displayName,
    skus: capacitySkus,
    selectedCapacity: data.deviceConfig.selectedCapacity,
    selectedSkuDetails: capacitySkus.filter((sku) => sku.size === data.deviceConfig.selectedCapacity)[0],
    ImageName: capacitySkus.filter((sku) => sku.colorName === data.deviceConfig.selectedColor)[0].skuImageName,
    ImageUrl: capacitySkus.filter((sku) => sku.colorName === data.deviceConfig.selectedColor)[0].imageUrl,
    addToCartUrl: data.deviceConfig.addToCartUrl,
    promoDetail: data.deviceConfig.promoDetail,
    cqJSON: data.cqKeys,
    ...asyncCallStatus,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChooseCapacity));
