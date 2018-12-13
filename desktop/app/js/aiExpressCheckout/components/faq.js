import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

const FaqSection = () => (
  <div id="faqSection" className="pad24">
    <hr className="border_black noBottomBorder" />
    <h3 className="fontSize_5">After placing your order, you can</h3>
    <Row className="margin20 onlyTopMargin">
      <Col xs={6} className="margin12 onlyBottomMargin">
        <h4 className="h3 fontSize_5">Make a return or exchange.</h4>
        <p className="margin6 noSideMargin fontSize_2">You may return or exchange wireless devices and accessories purchased from Verizon Wireless within 14 days of purchase. A restocking fee of $50 applies to any return or exchange of a wireless device (excluding Hawaii).</p>
      </Col>
      <Col xs={6} className="margin12 onlyBottomMargin">
        <h4 className="h3 fontSize_5">Trade in your old device.</h4>
        <p className="margin6 noSideMargin fontSize_2">We'll tell you how when we confirm your order.</p>
      </Col>
      <Col xs={6} className="margin12 onlyBottomMargin">
        <h4 className="h3 fontSize_5">Plan to transfer your content.</h4>
        <p className="margin6 noSideMargin fontSize_2">You can use Smart Setup to transfer photos and data to your new device.</p>
      </Col>
    </Row>
  </div>
);

FaqSection.propTypes = {
  cqContent: PropTypes.object,
};
export default FaqSection;
