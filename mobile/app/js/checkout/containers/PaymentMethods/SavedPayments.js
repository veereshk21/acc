import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SavedPaymentMethods from '../../components/PaymentMethods/savedCards';
import * as actionCreators from '../../actions';


const mapStateToProps = (state, ownProps) => {
  const data = state.get('orderDetails').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const cqContent = state.get('cqContent').toJS();
  // reviewOrderJSON.output.checkoutStates
  const { savedCardInfo } = data.billingInfo;
  const { cvvNeeded } = data.checkoutStates;
  const { authInfo } = data;
  const giftCardFlow = ownProps.match.params.type === 'giftCard';
  const getInitialCard = () => {
    let defaultCard = null;
    if (savedCardInfo && savedCardInfo.length > 0) {
      //  Check if preselected card available
      defaultCard = savedCardInfo.find((card) => card.preselectCard === true);

      // No preselected card, choose first card
      if (!defaultCard) {
        defaultCard = savedCardInfo[0];
      }
    }
    return defaultCard ? defaultCard.savedCardNickName : null;
  };

  return {
    data,
    authInfo,
    cqContent,
    savedCardInfo,
    ...asyncCallStatus,
    cvvNeeded,
    billingInfo: data.billingInfo,
    giftCardFlow,
    pieEnabled: data.pieEnabled || false,
    initialValues: {
      card_number: getInitialCard(),
    },
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SavedPaymentMethods);

