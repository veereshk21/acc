/**
 * Created by hmahad on 1/12/2017.
 */


import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CartMailInRebate from '../components/CartMailInRebate';


// eslint-disable-next-line no-unused-vars
const getMailInRebate = (mailInRebateDetails) => {
  let totalMailInRebateAmount = 0;
  const mailInRebateItems = mailInRebateDetails.get('mailInRebateItems');
  totalMailInRebateAmount = mailInRebateItems.reduce((a, b) => a.get('rebateAmount') + b.get('rebateAmount'));
  totalMailInRebateAmount = totalMailInRebateAmount.split('.');
  console.log(totalMailInRebateAmount);
  return totalMailInRebateAmount;
};

const getMailInRebateDetails = (state) => {
  const value = state.get('cartData').get('mailInRebateDetails').toJS();
  return value;
};

function mapStateToProps(state) {
  const {
    mailInRebateAmountText, mailInRebateItems, mailInRebateHeader, mailInRebateSubTitle,
  } = getMailInRebateDetails(state);
  const mailInRebateTotal = state.get('cartData').get('mailInRebateTotal');

  return {
    mailInRebateTotal,
    mailInRebateAmountText,
    mailInRebateItems,
    mailInRebateHeader,
    mailInRebateSubTitle,
    CQLabel: state.get('cqContent').get('label'),
  };
}

export default withRouter(connect(mapStateToProps)(CartMailInRebate));
