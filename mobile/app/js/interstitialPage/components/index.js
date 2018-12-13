/**
 * Created by santhra  on 6/15/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from '../../common/Title/Title';
import Img from '../../common/Img/Img';
import A from './../../common/A/A';

export default class LandingPage extends Component { // eslint-disable-line
  render() {
    const { landingInfo } = this.props;
    return (
      <div className="pad12 background_00 color_FFF">
        <Title className="fontSize_5 textAlignCenter margin20 onlyTopMargin color_FFF width70 centerBlock">{landingInfo.title}</Title>
        <div className="textAlignCenter fontSize_2 pad12 onlyTopPad" >{landingInfo.message} </div>

        <div className="noSidePad pad36" > <Img src={landingInfo.imageURL} alt={landingInfo.title} className="centerBlock" /></div>
        <div className="textAlignCenter pad18 noSidePad">
          {
            (landingInfo.ButtonMap.SecondaryButton !== null) ?
              <A className="button black large margin24 onlyRightMargin" href={landingInfo.ButtonMap.SecondaryButton.redirectURL} >{landingInfo.ButtonMap.SecondaryButton.title}</A>
              : ''
          }
          {
            (landingInfo.ButtonMap.PrimaryButton !== null) ?
              <A className="button white large" href={landingInfo.ButtonMap.PrimaryButton.redirectURL} >{landingInfo.ButtonMap.PrimaryButton.title}</A>
              : ''
          }
        </div>
      </div>
    );
  }
}
LandingPage.propTypes = {
  landingInfo: PropTypes.object,
};
