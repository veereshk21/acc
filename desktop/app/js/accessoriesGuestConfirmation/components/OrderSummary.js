import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';
import phone from './../../../images/byod-ghost-phone.svg';

const OrderSummary = (props) => (
  <Col xs={12} style={{ paddingLeft: 0 }}>
    <Row className="margin24 noSideMargin">
      <h1 className="fontSize_12">
        {props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_THANKS},&nbsp;
        <span>{props.firstName}</span>
      </h1>
    </Row>
    <Row className="fontSize_6 margin24 onlyBottomMargin">
      {props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_NUMBER}:&nbsp;<span className="bold">{props.orderNumber}</span>
    </Row>
    <Row className="margin24 onlyBottomMargin lineheight18">
      <p>
        {props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_EMAIL}:&nbsp;
        <span className="bold">{props.email}</span>.&nbsp;{props.shippingDesc}
        <span className="bold">{props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_SIGNATURE_REQUIRED}</span>
      </p>
    </Row>
    <Row className="margin6 onlyBottomMargin textTransUppercase">
      <div>{props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_QUESTION}</div>
    </Row>
    <Row className="margin48 onlyBottomMargin">
      <img className="verticalCenter margin6 onlyRightMargin" height="20px" src={phone} alt="phone" />
      {props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_CALL_TEXT}:&nbsp;
      <a href="tel://1-800-922-0204" className="bold">{props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_CALL_NUMBER}</a>
    </Row>
  </Col>
);

OrderSummary.propTypes = {
  cqContent: PropTypes.object,
  firstName: PropTypes.string,
  orderNumber: PropTypes.string,
  email: PropTypes.string,
  shippingDesc: PropTypes.string,
};

export default OrderSummary;
