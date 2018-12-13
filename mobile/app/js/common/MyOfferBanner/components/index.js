/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import '../../../../css/modules/swiper.css';
import './../../../../css/pages/myOffers/myOffers.css';

class MyOffersBanner extends React.PureComponent { //eslint-disable-line
  constructor(props) {
    super(props);
    this.offerStyle = 0;
  }
  componentWillMount() {
    const { myOffers } = this.props;
    if (myOffers.offers && myOffers.offers.length > 0) {
      this.props.showOffersBanner();
    }
  }
  componentDidMount() {
    const globalNavDiv = document.getElementById('vzw-gn');
    this.offerStyle = globalNavDiv.offsetHeight;
  }
  render() {
    const { myOffers, show } = this.props;
    if (myOffers.offers && myOffers.offers.length > 0) {
      const params = {
        nextButton: (myOffers.offers.length > 1) ? '.myoffer-next-slide' : '',
        prevButton: (myOffers.offers.length > 1) ? '.myoffer-prev-slide' : '',
        loop: (myOffers.offers.length > 1),
        direction: 'horizontal',
        speed: 2000,
        autoplay: 3000,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: () => '',
        },
      };

      const notificationHeight = this.props.isNotificationVisible ? 102 : 0;
      const bannerStyle = {
        top: this.offerStyle + notificationHeight,
      };
      return (
        <div>
          {show === true &&
            <div className="myOfferBanner" style={(bannerStyle.top === 0 ? {} : bannerStyle)}>
              <Swiper {...params}>
                {
                  myOffers.offers.map((_myOffers, index) => (
                    <div key={index}>
                      <div className="background_supporting border_grey onlyBottomBorder height42 lineHeight42 fontSize_2 pad12 onlySidePad textAlignCenter fontDisplayMedium" >
                        <span dangerouslySetInnerHTML={{ __html: _myOffers.bannerDescription }} />
                      </div>
                    </div>))
                }
              </Swiper>
            </div>}
        </div>
      );
    }
    return (<div />);
  }
}

MyOffersBanner.propTypes = {
  isNotificationVisible: PropTypes.bool,
  myOffers: PropTypes.object,
  show: PropTypes.bool,
  showOffersBanner: PropTypes.func,
};

export default MyOffersBanner;
