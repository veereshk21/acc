import React from 'react';
import Swiper from 'react-id-swiper';
import './../../../css/modules/swiper.scss';
import './../../../css/modules/myOffers.scss';

const bannerJSON = (window.myOffersBannerJSON && window.myOffersBannerJSON.output) ? window.myOffersBannerJSON.output : {};

const MyOffersBanner = () => {
  const params = {
    nextButton: (bannerJSON.offers && bannerJSON.offers.length > 1) ? '.myoffer-next-slide' : '',
    prevButton: (bannerJSON.offers && bannerJSON.offers.length > 1) ? '.myoffer-prev-slide' : '',
    loop: (bannerJSON.offers && bannerJSON.offers.length > 1),
    direction: 'horizontal',
    speed: 2000,
    autoplay: {
      delay: 3000,
    },
  };

  return (
    <div className="myOfferBanner" >
      {bannerJSON.offers && bannerJSON.offers.length > 0 &&
        <Swiper {...params}>
          {
            bannerJSON.offers.map((myOffers, index) => (
              <div key={index}>
                <div className="flexHorizontal background_gray_one height42 lineHeight30">
                  <div className="myOfferBanner-tag fontSize_7" />
                  <div className="color_000 pad10 onlySidePad bold fontSize_4" dangerouslySetInnerHTML={{ __html: myOffers.bannerDescription }} />
                </div>
              </div>))
          }
        </Swiper>
      }
    </div>
  );
};

export default MyOffersBanner;
