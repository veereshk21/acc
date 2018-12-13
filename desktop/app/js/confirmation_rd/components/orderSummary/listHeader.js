import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

const ItemHeader = (props) => {
  const {
    title, showPricingTitles, children, cqContent,
  } = props;
  return (
    <div>
      <div className="border_e6 onlyBottomBorder margin24 onlyBottomMargin">
        <Row middle="md">
          <Col xs={8} >
            <div className="noSideMargin">
              <h2 style={{ fontSize: '20pt' }} dangerouslySetInnerHTML={{ __html: title }} />
            </div>
          </Col>
          {showPricingTitles === true && <Col xs={4} >
            <Row>
              {props.standaloneAccessories ?
                <Col xs={6} className="textAlignRight" /> :
                <Col md={6} lg={6} className="textAlignRight">
                  <span className="bold pricefeature">{cqContent.label.DT_OD_CONFIRMATION_DUE_MONTHLY_TITLE}</span>
                </Col>
              }
              <Col md={6} lg={6} className="textAlignRight">
                <span className="bold pricefeature">{cqContent.label.DT_OD_CONFIRMATION_DUE_TODAY_TITLE}</span>
              </Col>
            </Row>
          </Col>}
        </Row>
      </div>
      {children}
    </div>
  );
};

ItemHeader.defaultProps = {
  showPricingTitles: true,
};

ItemHeader.propTypes = {
  title: PropTypes.string,
  showPricingTitles: PropTypes.bool,
  cqContent: PropTypes.object,
  children: PropTypes.node,
  standaloneAccessories: PropTypes.bool,
};

export default ItemHeader;
