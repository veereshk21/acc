import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Modal from '../../common/Modal';


export default class AddTotalMobileProtectionModal extends Component {
  static propTypes ={
    addTotalMobileProtection: PropTypes.func,
    cqContent: PropTypes.object,
    showModal: PropTypes.string,
    vzMDSelected: PropTypes.bool,
    tmpMDB2BSelected: PropTypes.bool,
    selectedProtection: PropTypes.object,
  }

  getModalId = () => {
    const { vzMDSelected, tmpMDB2BSelected } = this.props;
    if (tmpMDB2BSelected) {
      return 'tmpMDB2BSelected';
    }
    if (vzMDSelected) {
      return 'vzMDSelected';
    }
    return 'tmpMDSelected';
  }

  closeModal = (data) => {
    this.props.addTotalMobileProtection(data);
  }

  determineModalTitle = () => {
    const { cqContent, vzMDSelected, tmpMDB2BSelected } = this.props;
    if (tmpMDB2BSelected) {
      return cqContent.label.DT_OD_PROTECTION_TMP_MD_B2B_OPT_TITLE;
    }
    if (vzMDSelected) {
      return cqContent.label.DT_OD_PROTECTION_VZ_MD_OPT_TITLE;
    }
    return cqContent.label.DT_OD_PROTECTION_MD_OPT_TITLE;
  }

  determineModalContent = () => {
    const {
      cqContent,
      vzMDSelected,
      tmpMDB2BSelected,
      selectedProtection,
    } = this.props;
    if (tmpMDB2BSelected) {
      if (selectedProtection.sorSfoType === 'SPO') {
        return cqContent.label.DT_OD_PROTECTION_TMP_MD_B2B_OPT_CONTENT;
      }
      return cqContent.label.DT_OD_PROTECTION_SINGLE_TO_TMP_MD_B2B_OPT_CONTENT;
    }
    if (vzMDSelected) {
      return cqContent.label.DT_OD_PROTECTION_VZ_MD_OPT_CONTENT;
    }
    return cqContent.label.DT_OD_PROTECTION_MD_OPT_CONTENT;
  }

  render() {
    const { showModal, cqContent } = this.props;
    const modalDataTitle = this.determineModalTitle();
    const modalDataContent = this.determineModalContent();
    const modalId = this.getModalId();

    return (
      <Modal
        mounted={showModal}
        closeFn={this.closeModal.bind(this, 'REJECT')}
        style={{ background: 'white', width: '500px' }}
        modalId={modalId}
        showCloseX
      >
        <Row>
          <Col xs={12}>
            <h3 className="border_black onlyBottomBorder pad6 onlyBottomPad">
              {modalDataTitle}
            </h3>
          </Col>
        </Row>
        <Row className="pad18 noSidePad">
          <Col xs={12}>
            {modalDataContent}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <button onClick={() => { this.closeModal('ACCEPT'); }} className="button primary" analyticstrack="accept-TMP-modal-ok">{cqContent.label.DT_OD_PROTECTION_MD_OPT_PROCEED}</button>
          </Col>
        </Row>
      </Modal>
    );
  }
}
