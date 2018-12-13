import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as _ from 'lodash';
import { withRouter } from 'react-router-dom';

import ChooseColor from './../components/ChooseColor';
import * as actionCreators from '../actions';


function mapStateToProps(state, ownProps) {
  const data = state.toJSON();
  const colorSkus = _.uniqBy(data.deviceConfig.deviceSkus, 'colorName');
  // const selectedColorSku = colorSkus.filter((sku) => sku.skuId === ownProps.params.selectedSkuId)[0];
  const selectedColorSku = colorSkus.filter((sku) => sku.colorName === data.deviceConfig.selectedColor)[0];

  // TODO:
  // data.cqJSON = cqJSON; // eslint-disable-line

  return {
    accId: data.deviceConfig.accId,
    selectedSkuId: ownProps.match.params.selectedSkuId,
    accSkuId: data.deviceConfig.skuId,
    skus: data.deviceConfig.deviceSkus,
    selectedColor: data.deviceConfig.selectedColor,
    selectedSkuDetails: selectedColorSku,
    displayName: data.deviceConfig.displayName,
    skuDetails: data.deviceConfig.deviceSkus,
    cqJSON: data.cqKeys,
    ImageName: selectedColorSku.skuImageName,
    ImageUrl: selectedColorSku.imageUrl,
    addToCartUrl: data.deviceConfig.addToCartUrl,
    colorSkus,
    promoDetail: data.deviceConfig.promoDetail,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChooseColor));
