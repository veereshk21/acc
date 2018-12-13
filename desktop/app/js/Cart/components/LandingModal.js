import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';

const LandingModal = (props) => {
  const { cqContent, closeFn, redirectToTradeIn } = props;
  return (<div className="">
    <h2>Device {props.lastIntent}</h2>
    <Row>
      <Col md={6} lg={6} mdOffset={3} lgOffset={3}>
        <Row>
          <Col md={12} lg={12}>
            <button onClick={closeFn} className="button primary width100 margin30 onlyTopMargin" analyticstrack="continue-shopping-cta">{cqContent.label.DT_OD_CART_CONTINUE_TO_SHOPPING_CART_CTA_TEXT}</button>
          </Col>
          <Col md={12} lg={12}>
            <button onClick={redirectToTradeIn} className="button primary width100 margin20 onlyTopMargin" analyticstrack="trade-in-cta">{cqContent.label.DT_OD_CART_TRADE_IN_OLD_DEVICE_CTA_TEXT}</button>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>);
};

LandingModal.propTypes = {
  cqContent: PropTypes.object,
  closeFn: PropTypes.func,
  redirectToTradeIn: PropTypes.func,
  lastIntent: PropTypes.string,
};

export default LandingModal;
