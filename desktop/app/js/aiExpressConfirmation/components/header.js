import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

import ChatAndC2C from '../../common/ChatAndC2C';

const HeaderSection = (props) => (
  <div id="headerSection" className="pad24">
    <Row>
      <Col xs={9}>
        <h1 className="margin24 onlyBottomMargin fontSize_12">Thanks for placing your order.</h1>
      </Col>
      <Col xs={3}>
        <ChatAndC2C />
      </Col>
    </Row>
    <p className="margin18 onlyBottomMargin">Get excited about your upgrade</p>
    <p className="margin18 onlyBottomMargin">Your order number is <strong>{props.orderId}</strong>.</p>
    <p className="margin18 onlyBottomMargin">You will receive an order confirmation email shortly at  <strong>{props.confirmationEmail}</strong></p>
  </div>
);

HeaderSection.propTypes = {
  // cqContent: PropTypes.object,
  orderId: PropTypes.string,
  confirmationEmail: PropTypes.string,
};
export default HeaderSection;
