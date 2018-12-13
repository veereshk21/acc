import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AsyncComponent from '../../common/AsyncComponent';

const Modal = AsyncComponent(() => import('../../common/Modal'));

class EppAccessoryPolicyModal extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      openModal: true,
    };
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  render() {
    return (
      <Modal
        mounted={this.state.openModal}
        closeFn={this.closeModal}
        showCloseX
        underlayColor="rgba(0,0,0,0.8)"
        style={{ maxWidth: 700 }}
      >
        <h1 dangerouslySetInnerHTML={{ __html: this.props.cqContent.label.DT_OD_CHECKOUT_EPP_ACCESSORY_POLICY_TITLE }} />
        <p className="margin30 noSideMargin" dangerouslySetInnerHTML={{ __html: this.props.cqContent.label.DT_OD_CHECKOUT_EPP_ACCESSORY_POLICY_DESC }} />
        <div className="textAlignRight">
          <button className="button primary" onClick={this.closeModal}>{this.props.cqContent.label.DT_OD_CHECKOUT_EPP_ACCESSORY_POLICY_CTA}</button>
        </div>
      </Modal>
    );
  }
}

export default EppAccessoryPolicyModal;

EppAccessoryPolicyModal.propTypes = {
  cqContent: PropTypes.object,
};
