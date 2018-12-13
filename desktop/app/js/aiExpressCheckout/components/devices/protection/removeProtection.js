import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import AsyncComponent from '../../../../common/AsyncComponent';

const Modal = AsyncComponent(() => import('../../../../common/Modal'));

class Protection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Modal
        mounted={this.props.showRemoveModal}
        closeFn={this.props.closeProtectionModal}
        showCloseX
        underlayColor="rgba(0,0,0,0.8)"
        style={{ maxWidth: 500 }}
      >
        <div className="pad20">
          <p className="h2 width80">Decline equipment protection?</p>
          <Row className="pad20 noSidePad">
            <Col xs={12} className="displayInlineBlock pad20 noSidePad">
              <div className="margin50 onlyTopMArgin fontSize_5 textAlignLeft">
                <p className="pad20 onlyTopPad border_black onlyTopBorder">
                    If your device is lost, stolen, damaged, or experiences a post-warranty defect, the replacement cost may be as high as the retail price. You only have 30 days to enroll in coverage after your device activation.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={5} analyticstrack="shop-devices-cta" onClick={this.props.protectionChangeClick} className="pointer textAlignLeft border_black pad15">
              <p>Shop</p>
              <p>protection plans</p>
            </Col>
            <Col xs={2} />
            <Col xs={5} analyticstrack="decline-protection-cta" onClick={this.props.confirmSelection} className="pointer textAlignLeft border_black pad15">
              <p>Decline</p>
              <p>protection</p>
            </Col>
          </Row>
        </div>
      </Modal>
    );
  }
}

Protection.propTypes = {
  // cqContent: PropTypes.object,
  confirmSelection: PropTypes.func,
  protectionChangeClick: PropTypes.func,
  closeProtectionModal: PropTypes.func,
  showRemoveModal: PropTypes.bool,
};
export default reduxForm({
  enableReinitialize: true,
})(connect((state) => ({ forms: state.get('form').toJS() }))(Protection));
