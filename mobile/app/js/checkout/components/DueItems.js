import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../common/HorizontalRule';
import ItemBreakdown from '../../common/ItemBreakDown';
import ToolTip from '../../common/ToolTip/index';

class DueItems extends Component {
  getLineLevelPlans = (item) => {
    const { planCommerceItemId } = item;
    const { plans } = this.props;
    const [planItem] = plans.items.filter((plan) => plan.planCommerceItemId === planCommerceItemId);
    if (planItem) {
      return {
        name: <span className="bold">{planItem.planDisplayName}</span>,
        children: item.displayMtn,
        price: planItem.dueMonthly,
        // strikeoutprice: planItem.dueMonthlyOriginal > planItem.dueMonthly ? planItem.dueMonthlyOriginal : null,
        discountPrice: planItem.itemDiscount && planItem.itemDiscount > 0 ? planItem.itemDiscount : null,
      };
    }
    return {
      name: null,
      children: null,
      price: null,
      discountPrice: null,
    };
  }
  priceBreakDown = (breakdown, isEdge) => {
    let price = breakdown.price; // eslint-disable-line
    let strikethrough = null;
    if (typeof breakdown.itemStrikeThroughPrice !== 'undefined' && breakdown.itemStrikeThroughPrice > 0) {
      strikethrough = breakdown.itemStrikeThroughPrice.toFixed(2);
      if ((breakdown.sbdItemMonthlyAmount && breakdown.sbdItemMonthlyAmount > 0)) {
        price = breakdown.sbdItemMonthlyAmount.toFixed(2);
      } else if (isEdge) {
        price = breakdown.itemMonthlyPrice.toFixed(2);
      }
    } else if ((breakdown.originalPrice !== null && breakdown.originalPrice > 0 && breakdown.originalPrice > parseFloat(breakdown.price, 10))) {
      strikethrough = breakdown.originalPrice.toFixed(2);
    }
    if (price === '-') {
      price = null;
    }
    return {
      price,
      strikethrough,
    };
  }

  dueItemsBreakdown = (itemBreakdown, isEdge, bicRepresentationChangeEnabled) => (
    <div>
      {itemBreakdown.map((breakdown, i) => {
        const promoBadgeMessage = breakdown.promoBadgeMessages && breakdown.promoBadgeMessages.length > 0 ? breakdown.promoBadgeMessages[0] : null;
        return (
          <div key={`breakdown-${i}`}>
            <ItemBreakdown
              name={breakdown.lable}
              price={this.priceBreakDown(breakdown, isEdge).price + (breakdown.freeTrial ? '   $9.99 after 30-day trial' : '   ')}
              strikeoutprice={this.priceBreakDown(breakdown, isEdge).strikethrough}
              bicPromoDescription={bicRepresentationChangeEnabled && (breakdown.sbdPromoMsg || promoBadgeMessage) &&
                <div className="positionRelative">
                  <span className="font-icon_tag bicPromoTag pad18 onlyRightPad" />
                  <span>{promoBadgeMessage ? promoBadgeMessage.badgeText : breakdown.sbdPromoMsg}</span>
                  {(breakdown.sbdPromoTooltip || (promoBadgeMessage && promoBadgeMessage.badgeToolTip)) &&
                    <ToolTip
                      className="margin3 onlyLeftMargin displayInlineBlock"
                      ariaLabel="Promotional information tooltip"
                      text={promoBadgeMessage ? promoBadgeMessage.badgeToolTip : breakdown.sbdPromoTooltip}
                      noRenderHTML
                    />
                  }
                </div>
              }
              bicPromoPrice={bicRepresentationChangeEnabled && breakdown.sbdMonthlyPromoDiscount && `-$${breakdown.sbdMonthlyPromoDiscount}`}
              tradeinPromoDetails={breakdown.tradeinPromoDetails}
            >
              <span className="color_666 fontSize_2 block" dangerouslySetInnerHTML={{ __html: breakdown.description }} />
              {!bicRepresentationChangeEnabled && breakdown.sbdPromoMsg &&
                <p className="fontSize_2">{breakdown.sbdPromoMsg}</p>
              }
              {breakdown.instantCreditDescription &&
                <div
                  className="margin12 onlyTopMargin"
                  dangerouslySetInnerHTML={{ __html: breakdown.instantCreditDescription }}
                />
              }
            </ItemBreakdown>
          </div>
        );
      })}
    </div>
  )

  render() {
    const {
      items, lineLevelOpted, dueMonthly, bicRepresentationChangeEnabled,
    } = this.props;
    return (
      <div >
        {items && items.map((item, i) => (


          <div
            key={item.name + '-' + i}
            className=""
          >
            {lineLevelOpted &&
              <Row className="noSideMargin">
                <Col xs={12} className="noSidePad" >
                  <h3 dangerouslySetInnerHTML={{ __html: item.nickName || `Line ${i + 1}` }} />
                  <HorizontalRule y={1} margin="32px 0" color="#747676" />
                </Col>
              </Row>}
            <Row className="noSideMargin">
              <Col xs={12} className="noSidePad" >
                <h3 className="fontSize_1_3 fontDisplayMedium">
                  {item.manufacturer}&nbsp;
                  <span dangerouslySetInnerHTML={{ __html: item.name }} />
                </h3>
                <p className="fontSize_1_3  color_gray_six">
                  {!item.humCarDetails ?
                    <span>
                      {item.color && <span>{item.color}</span>}
                      {item.size && item.size && <span>, </span>}
                      {item.size && <span>{item.size}</span>}
                    </span>
                    :
                    <span > {item.humCarDetails.year} {item.humCarDetails.color} {item.humCarDetails.make} {item.humCarDetails.model}</span>
                  }
                </p>
                <p className="fontSize_1_3">
                  <span>
                    {item.displayMtn}
                  </span>
                </p>
                <HorizontalRule y={1} color="#747676" margin="32px 0" />
              </Col>
            </Row>
            {lineLevelOpted && dueMonthly &&
              <ItemBreakdown
                name={this.getLineLevelPlans(item).name}
                price={this.getLineLevelPlans(item).price}
                negativeDiscount
                discountPrice={this.getLineLevelPlans(item).discountPrice}
                discountText="Line level discount"
              />}
            {(item.priceBreakDown && item.priceBreakDown.length > 0) &&
              this.dueItemsBreakdown(item.priceBreakDown, item.edge, bicRepresentationChangeEnabled)
            }
          </div>

        ))}
      </div>
    );
  }
}

DueItems.defaultProps = {
  dueMonthly: false,
};
DueItems.propTypes = {
  items: PropTypes.array,
  plans: PropTypes.object,
  lineLevelOpted: PropTypes.bool,
  dueMonthly: PropTypes.bool,
  bicRepresentationChangeEnabled: PropTypes.bool,
};

export default DueItems;
