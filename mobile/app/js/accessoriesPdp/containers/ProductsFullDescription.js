import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import fullDescription from './../components/DetailedDesc';
import * as actionCreators from '../actions';

function mapStateToProps(state) {
  const output = state.get('output').toJSON();
  const data = state.toJSON();
  let selectedProduct = output.skuDetails.length ? output.skuDetails[0] : [];

  output.skuDetails.forEach((sku) => {
    if (sku.preSelected) {
      selectedProduct = sku;
    }
  });

  return {
    productDetails: selectedProduct,
    description: data.output.description,
    cqKeys: data.cqKeys,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(fullDescription));
