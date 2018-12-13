
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import AsyncComponent from './../../../common/AsyncComponent/index';
import Button from '../../../common/Button/Button';
import Notification from './../../../common/Notification/Notification';

const Modal = AsyncComponent(() => import('./../../../common/Modal/index'));

const BuddyModal = (props) => (
  <Modal
    mounted
    closeFn={props.closeBuddyModal}
    style={{ width: '55%' }}
    showCloseX
    underlayColor="rgba(0,0,0,0.8)"
    className=""
  >
    <Row className="margin24 noSideMargin" style={{ margin: '36px 0 0 0' }}>
      <Notification message={props.cqContent.label.DT_OD_CHECKOUT_BUDDY_MODAL_MESSAGE} type="error" noClose noIcon />
      <Col xs={3} className="margin24 noSideMargin">
        <Button className="large primary width100" onClick={props.submitOrder}>{props.cqContent.label.DT_OD_CHECKOUT_BUDDY_MODAL_CONTINUE}</Button>
      </Col>
      <Col xs={3} className="margin24 noSideMargin">
        <Button className="large secondary width100" onClick={props.cancelOrder}>{props.cqContent.label.DT_OD_CHECKOUT_BUDDY_MODAL_CANCEL}</Button>
      </Col>
    </Row>
  </Modal>
);

BuddyModal.propTypes = {
  cqContent: PropTypes.object,
  closeBuddyModal: PropTypes.func,
  cancelOrder: PropTypes.func,
  submitOrder: PropTypes.func,
};

export default BuddyModal;
