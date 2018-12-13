/**
 * Created by hmahad on 1/10/2017.
 */
/**
 * Created by hmahad on 1/10/2017.
 */
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import { withRouter } from 'react-router-dom';

import * as CartActions from '../actions';
import CartDeviceProtection from '../components/CartDeviceProtection';

const getSelectedFeature = (state) => {
  let protectionFeature = null;
  const { deviceProtectionList, selectedProtectionFeature } = state.toJS();
  if (selectedProtectionFeature === null) {
    const preselectedProtection = (deviceProtectionList.fetched === true) ? deviceProtectionList.data.equipmentProtectionList.filter((protection) => (protection.preSelected === true)) : null;
    protectionFeature = (preselectedProtection.length ? preselectedProtection[0].sfoSkuId : null);
  } else {
    protectionFeature = selectedProtectionFeature;
  }
  return protectionFeature;
};

const mapStateToProps = (state, ownProps) => {
  const { isFetching, data } = state.get('asyncCallStatus');
  return {
    deviceProtectionList: state.get('deviceProtectionList'),
    asyncCallStatus: state.get('asyncCallStatus'),
    data,
    isFetching,
    selectedItem: state.get('cartData').get('items').filter((mdn) => mdn.get('mtn') === ownProps.location.query.mdn).get(0),
    orderId: state.get('cartData').get('orderId'),
    selectedProtection: getSelectedFeature(state),
    CQLabel: state.get('cqContent').get('label'),

  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  push,
  goBack,
  clearProtectionOptions: () => dispatch(CartActions.clearProtectionOptions()),
  saveProtectionOptions: (data) => dispatch(CartActions.saveProtectionOptions(data)),
  asyncFetchClear: () => dispatch(CartActions.asyncFetchClear()),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDeviceProtection));
