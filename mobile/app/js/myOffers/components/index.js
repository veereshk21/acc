import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import Button from './../../common/Button/Button';
import A from './../../common/A/A';
import Loader from './../../common/Loader/Loader';
import OfferDetail from './OfferDetail';

export default class MyOfferComponent extends Component {
  constructor() {
    super();
    this.state = {
      displayLoader: false,
    };
  }
  primaryClick(actionURL) {
    this.state = {
      displayLoader: true,
    };
    const offerIDKey = actionURL.indexOf('?') >= 0 ? '&offerId=' : '?offerId=';
    if (this.props.myOfferInfo.offers.length === 1) {
      window.location.href = actionURL + offerIDKey + this.props.myOfferInfo.offers[0].offerId;
    } else {
      const getOfferId = document.getElementsByClassName('swiper-slide-active')[1].getAttribute('data-id');
      window.location.href = actionURL + offerIDKey + getOfferId;
    }
  }
  render() {
    const { myOfferInfo } = this.props;
    const params = {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      paginationClickable: true,
      slidesPerView: '1',
      spaceBetween: 12,
      onInit: (swiper) => {
        setTimeout(() => { swiper.updateAutoHeight(); }, 100);
      },
    };

    return (
      <div className={`pad24 ${(myOfferInfo.offers.length > 1) ? 'background_supporting' : ''}`}>
        {this.state.displayLoader && <Loader />}
        {
          (myOfferInfo.offers.length === 1) ? <div data-id={myOfferInfo.offers[0].offerId}><OfferDetail offer={myOfferInfo.offers[0]} /></div> :
            <Swiper {...params}>
              {
                myOfferInfo.offers.map((offer, index) => <div key={index} className="pad18" data-id={offer.offerId}><OfferDetail offer={offer} /><div className="height24" /></div>)
              }
            </Swiper>
        }
        <div className="textAlignCenter pad36 noSidePad">
          {
            (myOfferInfo.secondaryCTA !== null) ?
              <A className="button secondary large margin24 onlyRightMargin" href={myOfferInfo.secondaryCTA.redirectURL} >{myOfferInfo.secondaryCTA.label}</A>
              : ''
          }
          {
            (myOfferInfo.primaryCTA !== null) ?
              <Button className="button primary large" href="#" onClick={this.primaryClick.bind(this, myOfferInfo.primaryCTA.redirectURL)} >{myOfferInfo.primaryCTA.label}</Button>
              : ''
          }
        </div>
      </div>
    );
  }
}
MyOfferComponent.propTypes = {
  myOfferInfo: PropTypes.object,
};
