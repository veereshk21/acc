import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';


const DueItemList = ({ label, amount }) => (
  <Row className="clearfix pad6 onlyBottomPad">
    <Col className="floatLeft textLeft fontSize_7 bold" md={8} lg={8}>{label}</Col>
    <Col className="floatRight textAlignRight fontSize_5" md={4} lg={4}>${amount}</Col>
  </Row>
);

DueItemList.propTypes = {
  label: PropTypes.string,
  amount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};


export default DueItemList;
