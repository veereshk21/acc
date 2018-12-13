import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../HorizontalRule';

const HeroPrice = ({ displayPrice, className, margin }) => (
  <Row className={className}>
    <Col xs={12} className="fontSize_7 fontWeightBold">
      {`$${displayPrice}`}
      <HorizontalRule y={1} margin={margin} />
    </Col>
  </Row>
);

HeroPrice.propTypes = {
  displayPrice: PropTypes.string,
  className: PropTypes.string,
  margin: PropTypes.string,
};

HeroPrice.defaultProps = {
  className: 'pad24 onlySidePad',
  margin: '18px 0',
};

export default HeroPrice;
