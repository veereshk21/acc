import React from 'react';
import Title from '../../common/Title/Title';
import Img from '../../common/Img/Img';
import A from './../../common/A/A';

export default class myOffer extends React.PureComponent {
  render() {
    const { offer } = this.props; // eslint-disable-line
    return (
      <div className="textAlignCenter">
        <span className="promo_icon_triangle_left" aria-hidden="true" />
        <div className="pad6"><Title>{offer.title}</Title></div>
        {
          (offer.subTitle) ? <div className="fontSize_3 bold" >{offer.subTitle} </div> : ''
        }
        {
          (offer.description !== null) ? <div className="fontSize_3 width70 centerBlock pad12 onlyTopPad">{offer.description}</div> : ''
        }
        {
          (offer.displayImage) ? <div className="noSidePad pad36" > <Img src={offer.imgURL} alt={offer.title} className="centerBlock" /></div> : ''
        }
        {
          (offer.subDescription !== null) ? <div className="textAlignCenter fontSize_3 width70 centerBlock">{offer.subDescription}</div> : ''
        }
        <div className="textAlignCenter pad18 noSidePad">
          {
            (offer.secondaryCTA !== null) ?
              <A className="button secondary large margin24 onlyRightMargin" href={offer.secondaryCTA.redirectURL} >{offer.secondaryCTA.label}</A>
              : ''
          }
          {
            (offer.primaryCTA !== null) ?
              <A className="button primary large" href={offer.primaryCTA.redirectURL} >{offer.primaryCTA.label}</A>
              : ''
          }
        </div>
        {
          (offer.legalCopy) ? <div className="fontSize_2 width90 centerBlock">{offer.legalCopy}</div> : ''
        }
      </div>
    );
  }
}
