/*
 * Created on Wed Aug 30 2017
 *
 * Copyright (c) 2017 Verizon Wireless
 * Author Srikrishna Gumma
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import CountdownClock from '../../expressConfig/components/CountdownClock';

export const getCookie = (name) => {
  const pattern = RegExp(name + '=.[^;]*');
  const matched = document.cookie.match(pattern);
  if (matched) {
    const cookie = matched[0].split('=');
    return cookie[1];
  }
  return false;
};
class UserActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: getCookie('loggedIn'),
      enableCountdown: props.enableCountdown,
    };
  }

  onAcceptOffer = () => {
    const { loggedIn } = this.state;
    this.props.onAcceptOffer(loggedIn);
  }
  onCountDownComplete = () => {
    this.setState({
      enableCountdown: false,
    });
  }
  render() {
    const {
      ButtonMap, selectedSku, defaultDevice, contractTerm, commerceItemId, params, givenDate, isOutOfStock,
    } = this.props;
    const { enableCountdown } = this.state;
    const offerData = Object.assign({
      catalogRefId: selectedSku.id,
      commerceItemId,
      contractTerm,
      deviceProdId: defaultDevice.deviceProdId,
      deviceSorId: selectedSku.sorId,
    }, {}, params);
    const _url = ButtonMap.PrimaryButton.actionURL;
    const query = (_url.indexOf('?') !== -1) ? '&' : '?';
    const acceptOfferUrlLoggedIn = _url + query + qs.stringify(offerData);
    return (
      <div>
        <div className="margin18 textAlignCenter">
          {enableCountdown ?
            <button className="button large margin12 onlySideMargin"><CountdownClock givenDate={givenDate} onComplete={this.onCountDownComplete} cssClass="color_FFF" /></button> : (this.state.loggedIn === 'true' ?
              <div>
                {ButtonMap.SecondaryButton && <a href={ButtonMap.SecondaryButton.actionURL} className="button secondary large margin12">{ButtonMap.SecondaryButton.title}</a>}
                <a href={acceptOfferUrlLoggedIn} className={'button large margin12 onlySideMargin ' + (isOutOfStock && 'disabled m-bglight')} disabled={isOutOfStock}>{isOutOfStock ? ButtonMap.PrimaryButton.outOfstockTitle : ButtonMap.PrimaryButton.title}</a>
              </div> :
              <div>

                <button onClick={this.onAcceptOffer} className={'button large margin12 onlySideMargin ' + (isOutOfStock && 'disabled m-bglight')} disabled={isOutOfStock}>{isOutOfStock ? ButtonMap.PrimaryButton.outOfstockTitle : ButtonMap.PrimaryButton.title}</button>
              </div>)
          }

        </div>
      </div>
    );
  }
}

UserActions.propTypes = {
  onAcceptOffer: PropTypes.func,
  ButtonMap: PropTypes.object,
  selectedSku: PropTypes.object,
  defaultDevice: PropTypes.object,
  contractTerm: PropTypes.number,
  commerceItemId: PropTypes.any,
  params: PropTypes.object,
  enableCountdown: PropTypes.any,
  givenDate: PropTypes.string,
  isOutOfStock: PropTypes.bool,
};

export default UserActions;

