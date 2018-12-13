/**
 * Created by mambig on 2/4/2017.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MissingCVC from '../components/MissingCVC';
import * as actionCreators from '../actions';

const getSelectedCard = (savedCardInfo) => savedCardInfo.filter((savedCard) => savedCard.preselectCard === true)[0];

function mapStateToProps(state) {
  const cqContent = state.get('cqContent').toJS();
  const orderDetails = state.get('orderDetails').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  return {
    cqContent,
    selectedCard: getSelectedCard(orderDetails.billingInfo.savedCardInfo),
    pieEnabled: orderDetails.pieEnabled || false,
    ...asyncCallStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MissingCVC);
