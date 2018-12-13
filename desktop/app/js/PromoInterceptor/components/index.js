import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import { Row, Col } from 'react-flexbox-grid';
import PromoOptions from './PromoOptions';

const Landing = (props) => {
  const {
    data,
    getPromoDetails,
    // multiPromo,
    cqContent,
    getModalDetails,
    eligibleModalDetails,
    devicePromos,
  } = props;
  const promotions = [];
  if (Object.keys(data).length > 0) {
    promotions.push(data);
  }
  if (devicePromos) {
    promotions.push(devicePromos);
  }
  const params = {
    autoPlay: true,
    pagination: promotions.length > 1 ? {
      el: '.swiper-pagination',
      clickable: true,
    } : false,
    slidesPerView: '1.2',
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    centeredSlides: true,
    observeParents: true,
    observer: true,
    autoHeight: true,
  };
  return (
    <Row>
      <Col lgOffset={2} mdOffset={2} xs={12} sm={12} md={8} lg={8} xl={8}>
        <Swiper {...params}>
          {
            promotions.length > 0 && promotions.map((promo, idx) => (<div key={idx} >
              <PromoOptions
                _promoOptions={promo.promoOptions || []}
                data={promo}
                optionCallType={promo.promoType === 'MULTI'}
                getPromoDetails={getPromoDetails}
                cqContent={cqContent}
                getModalDetails={getModalDetails}
                eligibleModalDetails={eligibleModalDetails}
                count={promotions.length}
              />
            </div>))
          }
        </Swiper>
      </Col>
    </Row>
  );
};

Landing.propTypes = {
  data: PropTypes.object,
  getPromoDetails: PropTypes.func,
  // multiPromo: PropTypes.bool,
  cqContent: PropTypes.object,
  getModalDetails: PropTypes.func,
  eligibleModalDetails: PropTypes.string,
  devicePromos: PropTypes.object,
};

Landing.defaultProps = {};

export default Landing;
