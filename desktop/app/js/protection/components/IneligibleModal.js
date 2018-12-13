import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import Modal from '../../common/Modal';

const IneligibleModal = (props) => {
  const { closeModal, inEligibleOverlay, vzMdRestrictedDevice } = props;
  return (
    <Modal
      mounted
      closeFn={closeModal}
      style={{ background: 'white', width: '500px' }}
      modalId={`${vzMdRestrictedDevice}InEligible`}
      showCloseX
    >
      <Row>
        <Col xs={12}>
          <h3 className="border_black onlyBottomBorder pad6 onlyBottomPad">
            {inEligibleOverlay.headerContent}
          </h3>
        </Col>
      </Row>
      <Row className="pad18 noSidePad">
        <Col xs={12}>
          {inEligibleOverlay.bodyContent}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <button type="button" onClick={() => closeModal()} className="button primary" analyticstrack="accept-VZTMP-modal-ok">
            {inEligibleOverlay.buttonLabel}
          </button>
        </Col>
      </Row>
    </Modal>
  );
};

IneligibleModal.propTypes = {
  closeModal: PropTypes.func,
  inEligibleOverlay: PropTypes.object,
  vzMdRestrictedDevice: PropTypes.string,
};

export default IneligibleModal;
