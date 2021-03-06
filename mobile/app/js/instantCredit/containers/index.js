/**
 * created on 7/6/2017.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as NotificationActions from '../../common/NotificationBar/actions';
import InstantCreditComponent from '../components';

const getDetails = (state) => state.get('instantCreditData');

function mapStateToProps(state) {
  /**
   * TODO:Get orderid and stuff.
   * */
  return {
    cqLabel: state.get('cqContent').get('label'),
    cqHTML: state.get('cqContent').get('html'),
    isFetching: state.get('isFetching'),
    isTotalCredit: getDetails(state) && getDetails(state).get('totalInstantCreditAmount'),
    tradeDeviceItems: getDetails(state) && getDetails(state).get('tradeInPromoDetails'),
    cartDeviceItems: getDetails(state) && getDetails(state).get('dppDevicesList'),
    saveURL: getDetails(state) && getDetails(state).get('redirectURL'),
    errorCheck: getDetails(state),
    isOneTradeInOnePurchase: getDetails(state) && getDetails(state).get('showAlternateScreen'),
    singleDevice: getDetails(state) && getDetails(state).get('dppDevicesList').size === 1 && getDetails(state).get('dppDevicesList').get(0).toJS(),
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, actions, NotificationActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InstantCreditComponent);
