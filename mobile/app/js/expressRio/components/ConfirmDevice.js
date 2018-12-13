/*
 * Created on Wed Aug 30 2017
 *
 * Copyright (c) 2017 Verizon Wireless
 * Author Srikrishna Gumma
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PreOrderInterstrial from './../../common/PreOrder';
import { calculateTimeRemaining } from '../../common/Helpers';

import Title from '../../common/Title/Title';

class ConfirmDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlParams: props.urlParams,
      price: props.defaultSku.notradein[0].priceMsg,
      enableCountdown: props.enableFlow ? false : (props.offerConfigData.enableCountdown && calculateTimeRemaining(props.offerConfigData.givenDate)),
    };
  }
  componentWillMount() {
    this.cleanUpUrlParams();
  }

  onCountDownComplete = () => {
    this.setState({
      enableCountdown: false,
    });
    this.props.fetchData();
  };
  cleanUpUrlParams = () => {
    const { urlParams, defaultSku } = this.props;
    if (urlParams) {
      if (urlParams['?sample']) delete urlParams['?sample'];
      if (urlParams.enableAsyncOnExpressConfig) delete urlParams.enableAsyncOnExpressConfig;
      let price = null;
      if (urlParams.contractTerm === '99') {
        price = defaultSku.notradein[0].priceMsg;
      } else {
        price = defaultSku.notradein[1].priceMsg;
      }
      this.setState({
        urlParams,
        price,
      });
    }
  }
  render() {
    const {
      defaultDevice, defaultSku, defaultInventory, offerConfigData,
    } = this.props;
    const { urlParams, price, enableCountdown } = this.state;
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="background"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {!enableCountdown &&
            <div className="vh80">
              <div className="pad24">
                <Title>{offerConfigData.confirmationTitle}</Title>
                <p className="textAlignCenter">{defaultInventory.availableDate}</p>
                <div className="vh60" >
                  <div className="textAlignCenter">
                    <div className="margin18">
                      <img src={`${defaultSku.image}?hei=240`} srcSet={`${defaultSku.image}?hei=480 2x`} alt={defaultDevice.model} />
                    </div>
                    <h3 className="textAlignCenter h5">{defaultDevice.model}</h3>
                    <p className="textAlignCenter fontSize_2 pad6 noSidePad">{defaultSku.color}</p>
                    <p className="textAlignCenter fontSize_2 pad6 noSidePad">{price}</p>
                  </div>
                </div>
                <div className="textAlignCenter margin18 noSideMargin" >
                  <a href={`${offerConfigData.ButtonMap.ConfirmationSecondaryButton.actionURL}&` + qs.stringify(urlParams)} className="button secondary large margin6 onlySideMargin">{offerConfigData.ButtonMap.ConfirmationSecondaryButton.title}</a>
                  <a href={`${offerConfigData.ButtonMap.ConfirmationPrimaryButton.actionURL}&` + qs.stringify(urlParams)} className="button primary large margin6 onlySideMargin">{offerConfigData.ButtonMap.ConfirmationPrimaryButton.title}</a>
                </div>
              </div>
            </div>}
          <div>
            {enableCountdown && <PreOrderInterstrial image={offerConfigData.defaultImage} title={offerConfigData.counterTitle} enableCountdown={enableCountdown} onCountDownComplete={this.onCountDownComplete} ButtonMap={offerConfigData.ButtonMap} givenDate={offerConfigData.givenDate} subTitle={offerConfigData.subtitle} />}
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

ConfirmDevice.propTypes = {
  offerConfigData: PropTypes.object,
  defaultInventory: PropTypes.object,
  defaultSku: PropTypes.object,
  defaultDevice: PropTypes.object,
  urlParams: PropTypes.any,
  enableFlow: PropTypes.bool,
  fetchData: PropTypes.func,
};

export default ConfirmDevice;
