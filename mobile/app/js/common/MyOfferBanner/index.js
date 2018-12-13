/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import Swiper from 'react-id-swiper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './../../../css/modules/swiper.css';
import './../../../css/pages/myOffers/myOffers.css';

const bannerJSON = (window.myOffersBannerJSON && !_.isEmpty(window.myOffersBannerJSON)) ? window.myOffersBannerJSON.output : {};


class MyOffersBanner extends React.PureComponent { //eslint-disable-line
  render() {
    const params = {
      nextButton: (bannerJSON.offers.length > 1) ? '.myoffer-next-slide' : '',
      prevButton: (bannerJSON.offers.length > 1) ? '.myoffer-prev-slide' : '',
      loop: (bannerJSON.offers.length > 1),
      direction: 'horizontal',
      speed: 2000,
      autoplay: 3000,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: (index, className) => {
          if (index > 0) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          }
          return '';
        },
      },
    };

    const gnDiv = document.getElementById('vzw-gn');
    const gnHeight = gnDiv ? gnDiv.offsetHeight : 0;
    const notificationHeight = this.props.isNotificationVisible ? 102 : 0;
    return (
      <Grid className="myOfferBanner" style={{ top: gnHeight + notificationHeight }}>
        <Row className="pad24 onlySidePad background_supporting">
          <Col xs={12}>
            <Swiper {...params}>
              {
                bannerJSON.offers.map((myOffers, index) => (
                  <div key={`myoffer-${index}`} className=" textAlignLeft height36 fontSize_2 pad10 fontDisplayBold color_gray_six noSidePad background_supporting" >
                    <span dangerouslySetInnerHTML={{ __html: myOffers.bannerDescription }} />
                  </div>
                ))
              }
            </Swiper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

MyOffersBanner.propTypes = {
  isNotificationVisible: PropTypes.bool,
};

export const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(null, mapDispatchToProps)(MyOffersBanner);
