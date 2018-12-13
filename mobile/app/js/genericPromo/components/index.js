import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from '../../common/Title/Title';
import Img from '../../common/Img/Img';
import A from './../../common/A/A';
import Loader from './../../common/Loader/Loader';

class myOffer extends Component {
  constructor() {
    super();
    this.state = {
      displayLoader: false,
    };
    this.onContinueClick = this.onContinueClick.bind(this);
  }
  onContinueClick(event, actionURL) {
    this.state = {
      displayLoader: true,
    };
    window.location.href = actionURL;
  }
  render() {
    const { myOfferInfo } = this.props;
    return (
      <div className="pad18">
        {this.state.displayLoader && <Loader />}
        <div className="pad102 onlyBottomPad">
          {(myOfferInfo.isPromoAvailable) && <span className="promo_icon_triangle_left" aria-hidden="true" />}
          <Title className="textAlignCenter pad6 onlySidePad" dangerouslySetInnerHTML={{ __html: myOfferInfo.title }} />
          {myOfferInfo.subTitle && <div className="textAlignCenter fontSize_3 pad6 noSidePad" dangerouslySetInnerHTML={{ __html: myOfferInfo.subTitle }} />}
          {myOfferInfo.description && <div className="textAlignCenter fontSize_3 pad12 onlyTopPad" dangerouslySetInnerHTML={{ __html: myOfferInfo.description }} />}
          {myOfferInfo.displayImage && <div className="noSidePad pad24" > <Img src={`${myOfferInfo.imgURL}&hei=200`} srcSet={`${myOfferInfo.imgURL}&hei=400 2x`} alt={myOfferInfo.title} className="centerBlock" /></div>}
          {myOfferInfo.subDescription && <div className="textAlignCenter fontSize_3 " dangerouslySetInnerHTML={{ __html: myOfferInfo.subDescription }} />}
          {myOfferInfo.showLearnMore && <div className="textAlignCenter fontSize_3 ">{myOfferInfo.learnMorepreContent && <span dangerouslySetInnerHTML={{ __html: myOfferInfo.learnMorepreContent + '&nbsp;' }} />}<a className="link" href="#/more" analyticstrack="learnMoreLink">{myOfferInfo.learnMoreLink}</a></div>}
          {myOfferInfo.legalCopy && <div className="legalFinePrint pad18 onlyTopPad" dangerouslySetInnerHTML={{ __html: myOfferInfo.legalCopy }} />}
          <div className="textAlignCenter footerFixed">
            {
              (myOfferInfo.secondaryCTA !== null) &&
              <A className="button secondary large margin24 onlyRightMargin" href={myOfferInfo.secondaryCTA.redirectURL} analyticstrack={myOfferInfo.secondaryCTA.label}>{myOfferInfo.secondaryCTA.label}</A>
            }
            {
              (myOfferInfo.primaryCTA !== null) &&
              <A className="button primary large" href={myOfferInfo.primaryCTA.redirectURL} analyticstrack={myOfferInfo.primaryCTA.label}>{myOfferInfo.primaryCTA.label}</A>

            }
          </div>

        </div>
      </div>
    );
  }
}

myOffer.propTypes = {
  myOfferInfo: PropTypes.object,
};

export default myOffer;
