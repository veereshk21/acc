import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

const Header = ({ cq }) => (
  <Row className="noSideMargin pad24">
    <Col xs={12} className="pad48 onlyBottomPad">
      <h1 className="color_FFF h1">{cq.label.OD_CHECKOUT_MAIN_SCREEN_TITLE_TEXT}</h1>
    </Col>
  </Row>
);

Header.propTypes = {
  cq: PropTypes.object,
};

export default Header;
