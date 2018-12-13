import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import PromoBanners from './promoBanners';

const Header = (props) => (
  <div className="pad24 background_black">
    <Row>
      <Col
        xs={6}
        className="mainHeader"
      >
        <h1 className="color_FFF headingFeature">{props.cqContent.label.DT_OD_CHECKOUT_SUCCESS_MAIN_TITLE}</h1>
        <p className="color_FFF fontSize_6 margin12 noSideMargin">{props.cqContent.label.DT_OD_CHECKOUT_ALMOST_DONE_NOTIFICATION}</p>
      </Col>
      <Col
        xs={6}
        className="sideHeader"
        style={{ paddingLeft: 0 }}
      >
        <PromoBanners {...props} />
      </Col>
    </Row>
  </div>
);

Header.propTypes = {
  cqContent: PropTypes.object,
};
export default Header;
