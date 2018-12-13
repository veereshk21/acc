import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { addAccessoryBundleToCart, onChangeColor, asyncFetch } from '../actions';
import BundleAccessoryList from '../components/BundleAccessoryList';

/* eslint-disable arrow-body-style */
/**
* @param {object} state
* @param {object} ownProps
*/

const mapStateToProps = (state, ownProps) => {
  const data = state.toJS().accessories;
  const selectedAccessory = data.bundleAccessories.filter((item) => item.skuID === ownProps.match.params.selectedSkuID)[0];
  return {
    selectedDeviceName: data.selectedDeviceName,
    selectedAccessory,
    recommendedAccessories: selectedAccessory.bundleBreakdown,
    addToCartUrl: data.addToCartUrl,
    nextCTALink: data.nextCTALink,
    isFetching: state.get('asyncCallStatus').get('isFetching'),
    cqContent: state.get('cqContent').toJS(),
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ addAccessoryBundleToCart, onChangeColor, asyncFetch }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BundleAccessoryList));
