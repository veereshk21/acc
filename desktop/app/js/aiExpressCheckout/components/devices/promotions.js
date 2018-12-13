import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

const Promotions = (props) => {
  function promoContainer(promo, index) {
    return (
      <Row
        key={`device-promotion-${index}`}
        className="pad12 onlyBottomPad"
      >
        <Col xs={9}>
          {promo.promoDescription && <p className="fontSize_5">{promo.promoDescription}</p>}
        </Col>
        <Col xs={2}>
          {promo.promoAmount !== null && parseFloat(promo.promoAmount) > 0 && <p className="fontSize_5">-${promo.promoAmount}{promo.priceTerm && <span>{promo.priceTerm}</span>}</p>}
          {(promo.promoAmount !== null && parseFloat(promo.promoAmount) > 0 && promo.priceNote) && <p className="fontSize_3 color_gray_six">{promo.priceNote}</p>}
        </Col>
        <Col xs={1} aria-hidden className="fontSize_6 lineHeight18 overflowHidden accordion_icon textAlignRight" />
      </Row>
    );
  }

  const { globalPromotions, devices } = props;
  return (
    <div id="promotionsSection" className="pad24 onlyTopPad">
      <div className="border_black onlyTopBorder pad6 onlyTopPad">
        <Row>
          <Col xs={9}>
            <h3 className="fontSize_5">Savings and promo codes</h3>
          </Col>
          <Col xs={2}>
            {/* promotionDetails.totalPromoAmount && <p className="fontSize_5 bold">-${promotionDetails.totalPromoAmount}{promotionDetails.priceTerm}</p> */}
          </Col>
          <Col xs={1} aria-hidden className="fontSize_6 lineHeight18 overflowHidden accordion_icon textAlignRight" />
        </Row>
        <hr style={{ borderTop: '2px solid #E4E4E4', marginTop: 20 }} />
        {globalPromotions && globalPromotions.map((promo, index) => (
          <section>{promoContainer(promo, index)}</section>
        ))}
        {devices && devices.map((device, i) => (
          <section key={i}>
            {device.promotionList && device.promotionList.map((promo, index) => (
              <section>{promoContainer(promo, index)}</section>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};

Promotions.propTypes = {
  // cqContent: PropTypes.object,
  globalPromotions: PropTypes.array,
  devices: PropTypes.array,
};
export default Promotions;
