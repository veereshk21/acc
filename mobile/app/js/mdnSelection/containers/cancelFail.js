import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mdnSelectionActions from '../actions';
import CancelOrderFailure from '../components/cancelOrderFailure';

const mapStateToProps = (state) =>
  // No need to filter if already in app state
  //  let response = state.get('cancelPendingOrderResponse').output;
  ({
    // selectedMDN,
    // mdnSelectionView: state.get('mdnSelectionView'),
    orderResponse: state.get('cancelPendingOrderResponse'),
    // loaderFlag: state.get('loaderFlag')
  });
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CancelOrderFailure);
