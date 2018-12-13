import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';


const AmountComponent = ({ label, amount }) => (
  <Row className="clearfix margin12 onlyTopMargin">
    <Col md={8} lg={8}>
      <span className="bold">{label}</span>
    </Col>
    <Col md={4} lg={4} className="textAlignRight">
      <span>${amount}</span>
    </Col>
  </Row>
);

AmountComponent.propTypes = {
  label: PropTypes.string,
  amount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default AmountComponent;
