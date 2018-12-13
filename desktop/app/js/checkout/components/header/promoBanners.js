import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import ToolTip from '../../../common/ToolTip/index';
import shipping from '../../../../images/shipping_white.svg';
import returns from '../../../../images/returns_white.svg';

const iconWidth = '25px';
const PromoBanners = (props) => (
  <div>
    <Row className="promoBannersContainer">

      <Col xs={5}>
        {/* Next Day Shipping */}
        <Row top="xs" className="promoBanner">
          <Col xs={12}>
            <div className="floatLeft"><img className="verticalCenter" src={shipping} width={iconWidth} alt="Shipping Truck" /></div>
            <div className="floatLeft pad10 sidePadOnly" style={{ width: `calc(100% - ${iconWidth})` }}>
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

      <Col xs={3}>
        {/* Free Shipping */}
        <Row top="xs" className="promoBanner">
          <Col xs={12}>
            <div className="floatLeft"><img className="verticalCenter" src={shipping} width={iconWidth} alt="Shipping Truck" /></div>
            <div className="floatLeft pad10 sidePadOnly" style={{ width: `calc(100% - ${iconWidth})` }}>
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
          <Row top="xs" className="promoBanner">
            <Col xs={12}>
              <div className="floatLeft"><img className="verticalCenter" src={returns} width={iconWidth} alt="Shipping Truck" /></div>
              <div className="floatLeft pad10 sidePadOnly" style={{ width: `calc(100% - ${iconWidth})` }}>
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
        </Col>
      }
    </Row>
  </div >
);

PromoBanners.propTypes = {
  cqContent: PropTypes.object,
  bannerContent: PropTypes.object,
};
export default PromoBanners;
