/**
 * Created by santhra  on 6/30/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
// import A from '../../common/A/A';
// import Loader from '../../common/Loader/Loader';
import Img from '../../common/Img/Img';


export default class PromotionComponent extends React.PureComponent {
  render() {
    const { promotions } = this.props;
    const params = {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      slidesPerView: '1.1',
      spaceBetween: 12,
      onInit: (swiper) => {
        setTimeout(() => { swiper.updateAutoHeight(); }, 100);
      },
    };
    console.log(promotions);
    return (
      <div className="pad24 background_supporting">
        <Swiper {...params}>
          {
            promotions.map((promotion, index) =>
              (
                <div key={index} className="pad24">
                  <div className="col span_2_of_5">
                    <div className="CenterBlock">
                      <Img src={promotion.image} alt={promotion.title} />
                    </div>
                  </div>
                  <div className="col span_3_of_5">
                    <h6 className="pad12 noTopPad fontSize_2">{promotion.title}</h6>
                    <div className="pad12 noTopPad">
                      {promotion.description}
                    </div>
                  </div>
                </div>))
          }
        </Swiper>
      </div>
    );
  }
}

PromotionComponent.propTypes = {
  promotions: PropTypes.array,
};
