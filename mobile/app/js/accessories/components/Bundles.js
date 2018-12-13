import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../common/HorizontalRule';

const Bundles = ({ bundledAccessories, cqContent }) => (
  bundledAccessories.map((item, index) => {
    const imSuffix = item.imgUrl.indexOf('?') >= 0 ? '&' : '?';
    return (
      <Row key={index}>
        <Col xs={6} >
          <div className="pad32 noSidePad">
            <h3 className="h5" dangerouslySetInnerHTML={{ __html: item.displayName }} />
            <p className="fontSize_4 margin12 noSideMargin">
              {
                (item.savedPrice !== null && item.savedPrice > 0) && <span className="color_666 block"> Save ${item.savedPrice}</span>
              }
              ${item.discountedPrice}
            </p>
            <p>{item.bundleDescription}</p>
            <Link className="button secondary tertiary" to={`/bundleView/${item.skuID}`} analyticstrack="view-acc-bundle" >{cqContent.label.OD_ACCESSORIES_VIEW}</Link>
          </div>
        </Col>
        <Col xs={6}>
          <div className="pad32 noSidePad textAlignCenter">
            <img src={`${item.imgUrl}${imSuffix}wid=135&hei=135`} srcSet={`${item.imgUrl}${imSuffix}wid=270&hei=270 2x`} alt={item.displayName} className="img" />
          </div>
        </Col>
        <Col xs={12}>
          <HorizontalRule y={1} color="#D8DADA" />
        </Col>
      </Row>
    );
  })
);
Bundles.propTypes = {
  bundledAccessories: PropTypes.array,
  cqContent: PropTypes.object,
  recommendedAccessories: PropTypes.array,
};

export default Bundles;
