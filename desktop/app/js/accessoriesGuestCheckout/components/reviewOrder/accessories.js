import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Disclaimers from './disclaimers';

const Accessories = (props) => {
  const { cqContent } = props;

  const getPromo = (accessory) => {
    let promo = null;
    if (accessory.discounted && accessory.promoMessage) {
      promo = <p>{accessory.promoMessage}</p>;
    } else if (accessory.discounted && accessory.percentageOffTxt) {
      promo = (
        <div className="margin-6 onlyLeftMargin positionRelative">
          <p className="margin12 onlyTopMargin">
            <span className="font-icon_tag pad24 onlyRightPad" />
            <span>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_STANDALONE_ACCESSORY_PROMO_MESSAGE.replace('$PERCENTAGE$', accessory.percentageOffTxt)}</span>
          </p>
        </div>
      );
    }
    return promo;
  };
  return (
    <div>
      <Row className="noMargin border_grayThree borderSize_2 onlyBottomBorder">
        <Col xs={9} className="noLeftPad">
          <p className="bold fontSize_8">{cqContent.label.DT_OD_CHECKOUT_REVIEW_ORDER_ACCESSORIES_HEADER}</p>
        </Col>
        <Col xs={3} className="noRightPad">
          <p className="bold fontSize_8 textAlignRight">{cqContent.label.DT_OD_CHECKOUT_REVIEW_ORDER_DUE_TODAY_HEADER}</p>
        </Col>
      </Row>
      <div>
        {props.accessories.map((accessory, index) => (
          <div key={`accessory-${index}`} className="pad24 noSidePad">
            <Row>
              <Col xs={9}>
                <Row>
                  <Col xs={3}>
                    <img
                      className="verticalTop maxWidth100"
                      src={accessory.imageUrl}
                      alt="accessory.name"
                    />
                  </Col>
                  <Col xs={9} style={{ paddingLeft: 18 }}>
                    <p dangerouslySetInnerHTML={{ __html: accessory.name }} />
                    {accessory.color &&
                      <p className="margin12 onlyTopMargin">{accessory.color}</p>
                    }
                    {getPromo(accessory)}

                  </Col>
                </Row>
              </Col>
              <Col xs={3}>
                {accessory.discounted &&
                  <p className="bold fontSize_5 textAlignRight textDecLineThrough">${accessory.originalPrice}</p>
                }
                <p className="fontSize_5 textAlignRight">${accessory.price}</p>
              </Col>
            </Row>
          </div>
        ))}
      </div>
      <Disclaimers
        cqContent={cqContent}
      />
    </div>
  );
};

Accessories.propTypes = {
  cqContent: PropTypes.object,
  accessories: PropTypes.array,
  // editState: PropTypes.object,
};
export default Accessories;
