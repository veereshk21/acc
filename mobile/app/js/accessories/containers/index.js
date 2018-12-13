import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { addAccessoryToCart, onChangeColor, asyncFetch } from '../actions';
import AccessoriesPage from '../components';

/* eslint-disable arrow-body-style */
const mapStateToProps = (state) => {
  const data = state.toJSON().accessories;
  return {
    selectedDeviceName: data.selectedDeviceName,
    recommendedAccessories: data.recommendedAccessoriesDetails,
    addToCartUrl: data.addToCartUrl,
    bundledAccessories: data.bundleAccessories,
    isFetching: state.get('asyncCallStatus').get('isFetching'),
    cqContent: state.get('cqContent').toJS(),
    nextCTALink: data.nextCTALink,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ addAccessoryToCart, onChangeColor, asyncFetch }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccessoriesPage));
