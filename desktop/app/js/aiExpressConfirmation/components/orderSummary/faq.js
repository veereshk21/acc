import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

const FaqSection = (props) => (
  <div id="faqSection" className="margin60 onlyTopMargin">
    <hr className="border_black onlyBottomBorder" />
    <h3 className="fontSize_5">After placing your order, you can</h3>
    <Row className="margin20 onlyTopMargin">
      <Col xs={12} className="margin12 onlyBottomMargin">
        <h4 className="h3 fontSize_5">Transfer your content</h4>
        <p className="margin6 noSideMargin fontSize_2">Seamlessly transfer your data and favorite photos to your new device with Smart Setup. <a href="/support/transfer-contacts-and-media/" className="link" analyticstrack="confirmation-smart-setup-link">Learn More</a></p>
      </Col>
      {props.ispuSelected &&
        <Col xs={12} className="margin12 onlyBottomMargin">
          <h4 className="h3 fontSize_5">Your In-Store Pickup</h4>
          <p className="margin6 noSideMargin fontSize_2">We'll send you an email when your order is ready. Remember to bring a government-issued photo ID and the purchasing credit card.</p>
        </Col>
      }
      <Col xs={12} className="margin12 onlyBottomMargin">
        <h4 className="h3 fontSize_5">Trade in an old device?</h4>
        <p className="margin6 noSideMargin fontSize_2">You can trade in <a href="/od/trade-in" className="link" analyticstrack="confirmation-tradein-link" >here</a></p>
      </Col>
      <Col xs={12} className="margin12 onlyBottomMargin">
        <h4 className="h3 fontSize_5">Make a return or exchange</h4>
        <p className="margin6 noSideMargin fontSize_2">You may return or exchange wireless devices and accessories purchased from Verizon Wireless within 14 days of purchase. A restocking fee of $50 applies to any return or exchange of a wireless device (excluding Hawaii).</p>
      </Col>
    </Row>
  </div>
);

FaqSection.propTypes = {
  // cqContent: PropTypes.object,
  ispuSelected: PropTypes.bool,
};
export default FaqSection;
