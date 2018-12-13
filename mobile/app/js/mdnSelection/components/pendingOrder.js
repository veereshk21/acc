import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InEligible from './inEligible';
import Loader from '../../common/Loader/Loader';
import { hashHistory } from './../../store';

export default class PendingOrder extends Component {
  constructor() {
    super();
    this.state = {
      orderCanceled: false,
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  shouldComponentUpdate(newProps) {
    if (this.state.orderCanceled) {
      if (newProps.cancelPendingOrderResponse) {
        if (newProps.cancelPendingOrderResponse.output.cancelSuccessfulFlg) {
          const redirectURL = typeof this.props.selectedMDN !== 'undefined' ? `${newProps.cancelPendingOrderResponse.output.redirectUrl}?mdn=${this.props.selectedMDN.mtn}` : newProps.cancelPendingOrderResponse.output.redirectUrl;
          // hashHistory.replace('/', '/pendingOrder');
          // hashHistory.replace('/', '/requestFailed');
          if (window.sessionStorage.getItem('loaded')) {
            window.sessionStorage.setItem('loaded', 'false');
          }
          window.location.href = redirectURL;
        } else {
          hashHistory.push('/requestFailed');
        }
      }
    }
    return true;
  }
  onButtonClick(url) {
    // this.props.cancelPendingOrder(`http://www.mocky.io/v2/58987ffa1100000108038a82`);
    const { selectedMDN } = this.props;
    const _selectedMTN = typeof selectedMDN !== 'undefined' ? selectedMDN.mtn : null;
    this.props.cancelPendingOrder({ url, selectedMTN: _selectedMTN });
    this.state.isFetching = true;
    this.state.orderCanceled = true;
  }
  render() {
    const isLineLevelEligible = !(this.props.selectedMDN !== undefined && (this.props.selectedMDN.inEligibleCode === '08' || this.props.selectedMDN.inEligibleCode === '12' || this.props.selectedMDN.inEligibleCode === '11' || this.props.selectedMDN.inEligibleCode === '10'));
    const isAALaccLevelEligible = (this.props.accountLevelInEligibleDetails === null) || (this.props.accountLevelInEligibleDetails !== null && (this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails') !== null && this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails').get('accountLevelInEligibleDetails')) === null) || !(this.props.accountLevelInEligibleDetails !== null && (this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails') !== null && this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails').get('accountLevelInEligibleDetails') !== null && (this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails') !== null && (this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails').get('accountLevelInEligibleCode') === '12' || this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails').get('accountLevelInEligibleCode') === '08' || this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails').get('accountLevelInEligibleCode') === 'PENDING_SWITCH_ORDER' || this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails').get('accountLevelInEligibleCode') === 'PENDING_ORDER'))));
    const isEUPaccLevelEligible = (this.props.accountLevelInEligibleDetails === null) || (this.props.accountLevelInEligibleDetails !== null && (this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails') !== null && this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails') !== null && this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleDetails') === null)) || !(this.props.accountLevelInEligibleDetails !== null && (this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails') !== null && this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleDetails') !== null && (this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleCode') === '12' || this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleCode') === '08' || this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleCode') === 'PENDING_SWITCH_ORDER' || this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleCode') === 'PENDING_ORDER')));

    let inEligibleDetails;
    let allowCancel = true;
    if (!isAALaccLevelEligible) {
      inEligibleDetails = this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails').get('accountLevelInEligibleDetails').toJS();
      allowCancel = !(this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails').get('accountLevelInEligibleCode') === 'PENDING_SWITCH_ORDER' || this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails').get('accountLevelInEligibleCode') === '10');
    } else if (!isEUPaccLevelEligible) {
      inEligibleDetails = this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleDetails').toJS();
      allowCancel = !(this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleCode') === 'PENDING_SWITCH_ORDER' || this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleCode') === '10');
    } else if (!isLineLevelEligible) {
      inEligibleDetails = this.props.selectedMDN.inEligibleDetails;//eslint-disable-line
      allowCancel = !(this.props.selectedMDN.inEligibleCode === 'PENDING_ORDER' || this.props.selectedMDN.inEligibleCode === 'PENDING_SWITCH_ORDER' || this.props.selectedMDN.inEligibleCode === '10');
    }
    // const inEligibleDetails =

    const { isFetching } = this.props;
    if (isFetching) {
      return (<Loader />);
    }
    return (
      <InEligible
        inEligibleDetails={inEligibleDetails}
        cancelPendingOrder={this.props.cancelPendingOrder}
        allowCancel={allowCancel}
        onButtonClick={this.onButtonClick}
        cqJSON={this.props.cqJSON}
        loader={this.props.loaderFlag}
      />
    );
  }
}

PendingOrder.propTypes = {
  selectedMDN: PropTypes.object,
  isFetching: PropTypes.bool,
  cancelPendingOrder: PropTypes.func,
  accountLevelInEligibleDetails: PropTypes.object,
  cqJSON: PropTypes.object,
  loaderFlag: PropTypes.bool,
};
