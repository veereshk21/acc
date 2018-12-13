import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import ToolTip from '../../../common/ToolTip/index';
import shipping from '../../../../images/shipping_white.svg';
import returns from '../../../../images/returns_white.svg';

const PromoBanners = (props) => (
  <div style={{ margin: '0px 8px' }}>
    <Row>
      <Col xs={4}>

        {/* Next Day Shipping */}
        <Row middle="xs" className="promoBanner">
          <Col xs={12}>
            <div className="floatLeft"><img className="verticalCenter" src={shipping} width="30px" alt="Shipping Truck" /></div>
            <div className="margin42 onlyLeftMargin">
              <p className="fontSize_2 verticalAlignMiddle displayInline">
                {props.cqContent.label.DT_OD_CHECKOUT_BANNER_NEXT_DAY_SHIPPING}
              </p>
              <ToolTip
                className="margin3 onlyLeftMargin displayInlineBlock white"
                ariaLabel="Text updates information tooltip"
                text={props.cqContent.label.DT_OD_CHECKOUT_BANNER_NEXT_DAY_SHIPPING_TOOLTIP}
                noRenderHTML
              />
            </div>

          </Col>
        </Row>
      </Col>
      <Col xs={4}>

        {/* Free Shipping */}
        <Row middle="xs" className="promoBanner">
          <Col xs={12}>
            <div className="floatLeft"><img className="verticalCenter" src={shipping} width="30px" alt="Shipping Truck" /></div>
            <div className="margin42 onlyLeftMargin">
              <p className="fontSize_2 displayInline">
                {props.cqContent.label.DT_OD_CHECKOUT_BANNER_FREE_SHIPPING}
              </p>
              <ToolTip
                className="margin3 onlyLeftMargin displayInlineBlock white"
                ariaLabel="Text updates information tooltip"
                text={props.cqContent.label.DT_OD_CHECKOUT_BANNER_FREE_SHIPPING_TOOLTIP}
                noRenderHTML
              />
            </div>
          </Col>
        </Row>
      </Col>
      {props.bannerContent && props.bannerContent.returnPolicy &&
        <Col xs={4}>
          {/* Return Policy */}
          <Row middle="xs" className="promoBanner">
            <Col xs={12}>
              <div className="floatLeft"><img className="verticalCenter" src={returns} width="30px" alt="Shipping Truck" /></div>
              <div className="margin42 onlyLeftMargin">
                <p className="fontSize_2 displayInline" dangerouslySetInnerHTML={{ __html: props.bannerContent.returnPolicy.header }} />
                <ToolTip
                  className="margin3 onlyLeftMargin displayInlineBlock white"
                  ariaLabel="Text updates information tooltip"
                  text={props.bannerContent.returnPolicy.tooltip}
                  noRenderHTML
                />
              </div>
            </Col>
          </Row>

        </Col>}
    </Row>
  </div >
);

PromoBanners.propTypes = {
  cqContent: PropTypes.object,
  bannerContent: PropTypes.object,
};
export default PromoBanners;
