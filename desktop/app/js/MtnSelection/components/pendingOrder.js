import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import Modal from '../../common/Modal/index';
import { hashHistory } from './../../store';
// import InEligible from './inEligible';
// import Loader from '../../common/Loader/Loader';
// import Anchor from './../../common/A/A';

import AsyncComponent from '../../common/AsyncComponent';

const Modal = AsyncComponent(() => import('../../common/Modal/index'));
const Loader = AsyncComponent(() => import('../../common/Loader/Loader'));
const InEligible = AsyncComponent(() => import('./inEligible'));
const Anchor = AsyncComponent(() => import('./../../common/A/A'));
export default class PendingOrder extends Component {
  static propTypes = {
    selectedMDN: PropTypes.object,
    isFetching: PropTypes.bool,
    cancelPendingOrder: PropTypes.func,
    accountLevelInEligibleDetails: PropTypes.object,
    selectedDevice: PropTypes.string,
    cqJSON: PropTypes.object,
    loaderFlag: PropTypes.bool,
  };

  constructor() {
    super();
    this.state = {
      orderCanceled: false,
      showAALPendingModal: false,
    };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.openAALPendingModal = this.openAALPendingModal.bind(this);
    this.closeAALPendingModal = this.closeAALPendingModal.bind(this);
  }

  shouldComponentUpdate(newProps) {
    if (this.state.orderCanceled) {
      if (newProps.cancelPendingOrderResponse) {
        if (newProps.cancelPendingOrderResponse.output.cancelSuccessfulFlg) {
          const redirectURL = typeof this.props.selectedMDN !== 'undefined' ? `${newProps.cancelPendingOrderResponse.output.redirectUrl}?selectedDevice=${this.props.selectedDevice}` : newProps.cancelPendingOrderResponse.output.redirectUrl;
          window.location.href = redirectURL;
        } else {
          this.state.orderCanceled = false;
          hashHistory.push('/requestFailed');
        }
      }
    }
    return true;
  }
  onButtonClick(url) {
    const { selectedMDN } = this.props;
    const _selectedMTN = typeof selectedMDN !== 'undefined' ? selectedMDN.mtn : null;
    this.props.cancelPendingOrder({ url, selectedMTN: _selectedMTN });
    this.state.isFetching = true;
    this.state.orderCanceled = true;
  }

  openAALPendingModal() {
    this.setState({
      showAALPendingModal: true,
    });
  }

  closeAALPendingModal() {
    this.setState({
      showAALPendingModal: false,
    });
  }

  cancelAALOrder(inEligibleDetails) {
    let aalOrderInfo = '';
    if (this.props.accountLevelInEligibleDetails && this.props.accountLevelInEligibleDetails.accountLevelAALInEligibleDetails) {
      aalOrderInfo = this.props.accountLevelInEligibleDetails.accountLevelAALInEligibleDetails;
    } else if (this.props.accountLevelInEligibleDetails && this.props.accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails) {
      aalOrderInfo = this.props.accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails;
    }
    this.closeAALPendingModal();
    this.props.cancelPendingOrder({ url: aalOrderInfo.accountLevelInEligibleDetails ? aalOrderInfo.accountLevelInEligibleDetails.cancelPlanChangeURL : inEligibleDetails.cancelPlanChangeURL, selectedMTN: null, orderType: 'AAL' });
    this.state.isFetching = true;
    this.state.orderCanceled = true;
  }
  render() {
    const { cqJSON } = this.props;
    const isLineLevelEligible = !(this.props.selectedMDN !== undefined && (this.props.selectedMDN.inEligibleCode === '08' || this.props.selectedMDN.inEligibleCode === '12' || this.props.selectedMDN.inEligibleCode === '11' || this.props.selectedMDN.inEligibleCode === '10'));
    const isAALaccLevelEligible = (this.props.accountLevelInEligibleDetails === null) || (this.props.accountLevelInEligibleDetails !== null && (this.props.accountLevelInEligibleDetails.accountLevelAALInEligibleDetails !== null && this.props.accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleDetails) === null) || !(this.props.accountLevelInEligibleDetails !== null && (this.props.accountLevelInEligibleDetails.accountLevelAALInEligibleDetails !== null && this.props.accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleDetails !== null && (this.props.accountLevelInEligibleDetails.accountLevelAALInEligibleDetails !== null && (this.props.accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === '12' || this.props.accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === '08' ||
    this.props.accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === '10' ||
    this.props.accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === 'PENDING_SWITCH_ORDER' || this.props.accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === 'PENDING_ORDER'))));
    const isEUPaccLevelEligible = (this.props.accountLevelInEligibleDetails === null) || (this.props.accountLevelInEligibleDetails !== null && (this.props.accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails !== null && this.props.accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails !== null && this.props.accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleDetails === null)) || !(this.props.accountLevelInEligibleDetails !== null && (this.props.accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails !== null && this.props.accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleDetails !== null && (this.props.accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === '12' || this.props.accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === '08' ||
    this.props.accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === '10' ||
    this.props.accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === 'PENDING_SWITCH_ORDER' || this.props.accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === 'PENDING_ORDER')));
    // const accountLevelInEligible = selectedMDN ? this.props.accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleDetails : this.props.accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleDetails;
    let inEligibleDetails = '';
    let AALinEligibleDetails = {};
    if (!isAALaccLevelEligible) {
      inEligibleDetails = this.props.accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleDetails;
      AALinEligibleDetails = { inEligibleDetails, inEligibleCode: this.props.accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode };
      // allowCancel = !(this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails').get('accountLevelInEligibleCode') === 'PENDING_SWITCH_ORDER' || this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails').get('accountLevelInEligibleCode') === '10');
    } else if (!isEUPaccLevelEligible) {
      inEligibleDetails = this.props.accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleDetails;
      // allowCancel = !(this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleCode') === 'PENDING_SWITCH_ORDER' || this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleCode') === '10');
    } else if (!isLineLevelEligible) {
      inEligibleDetails = this.props.selectedMDN.inEligibleDetails; // eslint-disable-line
      // allowCancel = !(this.props.selectedMDN.inEligibleCode === 'PENDING_ORDER' || this.props.selectedMDN.inEligibleCode === 'PENDING_SWITCH_ORDER' || this.props.selectedMDN.inEligibleCode === '10');
    }
    const { isFetching } = this.props;
    if (isFetching) {
      return (<Loader />);
    }
    return (
      <div className="section group grid">
        <Modal
          mounted={this.state.showAALPendingModal}
          closeFn={this.closeAALPendingModal.bind(this)}
          style={{ width: '50%' }}
          showCloseX
        >
          <h2>{cqJSON.label.DT_OD_MDN_PENDING_AAL_TITLE}</h2>
          <p className="pad20 onlyTopPad fontSize_2">{cqJSON.label.DT_OD_MDN_PENDING_AAL_CONFIRM_DESC}</p>
          <Row className="pad20 noSidePad">
            <button className="button primary margin30 onlyRightMargin" onClick={this.cancelAALOrder.bind(this, inEligibleDetails)} analyticstrack="select-pendingOrderConfirmation-ok-CTA">{cqJSON.label.DT_OD_MDN_PENDING_AAL_CONFIRM_YES_LABEL}</button>
            <Anchor className="displayInlineBlock margin20 onlyTopMargin textDecUnderline" analyticstrack="select-pendingOrderConfirmation-cancel-link" onClick={this.closeAALPendingModal.bind(this)}>{cqJSON.label.DT_OD_MDN_PENDING_AAL_CONFIRM_NO_LABEL}</Anchor>
          </Row>
        </Modal>
        <Grid fluid>
          <Row>
            <Col md={12} xs={12} className="">
              <InEligible
                inEligibleDetails={inEligibleDetails}
                selectedMDN={this.props.selectedMDN || AALinEligibleDetails}
                cancelPendingOrder={this.props.cancelPendingOrder}
                onButtonClick={this.onButtonClick}
                cqJSON={this.props.cqJSON}
                loader={this.props.loaderFlag}
                openAALPendingModal={this.openAALPendingModal}
                closeAALPendingModal={this.closeAALPendingModal}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
