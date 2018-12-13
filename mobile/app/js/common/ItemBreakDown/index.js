import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../common/HorizontalRule';
import ToolTip from '../../common/ToolTip';

const ItemBreakdown = ({
  name, promoDetails, price, strikeoutprice, children, negative, color, margin, dollor, discountPrice, discountText, negativeDiscount, bicPromoDescription, bicPromoPrice, tradeinPromoDetails,
}) => (
  <div>
    <Row className="noSideMargin" >
      <Col xs={10} className="noSidePad">
        {name}
        {children}
      </Col>

      <Col xs={2} className="noSidePad textAlignRight">
        {negative && '-'}{price ? `${dollor}${price}` : '-'}
        {strikeoutprice && <span className="block textDecLineThrough color_gray_six">${strikeoutprice}</span>}
      </Col>

    </Row>
    {discountPrice &&
        <Row className="noSideMargin" >
          <Col xs={12} className="noSidePad">
            <HorizontalRule y={1} color="#D8DADA" margin="32px 0" />
          </Col>
          <Col xs={10} className="noSidePad" >
            {discountText}
          </Col>

          <Col xs={2} className="noSidePad textAlignRight">
            {negativeDiscount && '-'}
            {dollor}{discountPrice}
          </Col>
        </Row>
    }
    {bicPromoDescription &&
      <Row className="noSideMargin pad12 noSidePad" >
        <Col xs={10} className="noSidePad" >
          {bicPromoDescription}
        </Col>

        <Col xs={2} className="noSidePad textAlignRight">
          {bicPromoPrice}
        </Col>
      </Row>
    }
    {!bicPromoDescription && bicPromoPrice &&
      <Row className="noSideMargin pad12 noSidePad" >
        <Col xsOffset={10} xs={2} className="noSidePad textAlignRight">
          {bicPromoPrice}
        </Col>
      </Row>
    }
    {tradeinPromoDetails &&
      <Row className="noSideMargin pad12 noSidePad" >
        <Col xs={10} className="noSidePad">
          <span
            className="color_blue"
            dangerouslySetInnerHTML={{ __html: tradeinPromoDetails.promotionalMessage }}
          />
          <ToolTip
            className="margin3 onlyLeftMargin displayInlineBlock blue"
            ariaLabel="Trade-in promotion tooltip"
            text={tradeinPromoDetails.promotionTooltip}
            noRenderHTML
          />
        </Col>
        {tradeinPromoDetails.bicApplied &&
          <Col xs={2} className="noSidePad textAlignRight">
            -{tradeinPromoDetails.promoAmount}
          </Col>
        }
      </Row>
    }
    {promoDetails &&
      <Row className="noSideMargin pad12 onlyTopPad" >
        <Col xs={9} className="noSidePad">
          <div className="bold color_blue fontSize_2">
            <span>
              {promoDetails.promoMessage && promoDetails.promoMessage}
            </span>
            {promoDetails.promoTooltipMessage &&
              <ToolTip
                id="upgradeFee-tooltip"
                className="margin3 onlyLeftMargin displayInlineBlock color_blue"
                ariaLabel="Upgrade fee information tooltip"
                text={promoDetails.promoTooltipMessage}
                noRenderHTML
              />
            }
          </div>
        </Col>
        <Col xs={3} className="textAlignRight noSidePad">
          {`-$${promoDetails.tradeInAmount}`}
        </Col>
      </Row>
    }
    <HorizontalRule y={1} margin={margin} color={color} />
  </div>
);

ItemBreakdown.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  price: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  strikeoutprice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  negative: PropTypes.bool,
  negativeDiscount: PropTypes.bool,
  color: PropTypes.string,
  margin: PropTypes.string,
  dollor: PropTypes.string,
  discountPrice: PropTypes.string,
  discountText: PropTypes.string,
  bicPromoDescription: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  bicPromoPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  tradeinPromoDetails: PropTypes.object,
  promoDetails: PropTypes.object,
};

ItemBreakdown.defaultProps = {
  color: '#D8DADA',
  margin: '32px 0',
  dollor: '$',
};

export default ItemBreakdown;
