import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { removeStandAloneAccessory, removeAccessoryBundle, asyncFetch } from './../actions';
import StandAloneAccessoriesWrapper from './../components/StandAloneAccessoriesWrapper';

const mapStateToProps = (state) => {
  // const asyncCallStatus = state.get('asyncCallStatus');
  const cartData = state.get('cartData').get('output').toJS();
  const accessories = cartData.accessories;
  const instantCreditEligible = cartData.instantCreditEligible;
  const accessoriesBundle = cartData.accessoriesBundle;
  const cqContent = state.get('cqContent').toJS();
  const showHeadsUpMsg = cartData.showHeadsUpMsg;
  const asyncCallStatus = state.get('asyncCallStatus');
  return {
    accessories,
    accessoriesBundle,
    cqContent,
    instantCreditEligible,
    showHeadsUpMsg,
    asyncCallStatus,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ removeStandAloneAccessory, removeAccessoryBundle, asyncFetch }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StandAloneAccessoriesWrapper));
