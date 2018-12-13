/*
 * Created on Wed Aug 30 2017
 *
 * Copyright (c) 2017 Verizon Wireless
 * Author Srikrishna Gumma
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { hashHistory } from './../../store';

import DeviceImage from './DeviceImage';
import Header from './Header';
import DeviceOptions from './DeviceOptions';
import ColorOptions from './ColorOptions';
import UserActions from './UserActions';
import PriceOption from './PriceOptions';
import OfferUserActions from './offerUserActions';
import PreOrderInterstrial from './../../common/PreOrder';
import { calculateTimeRemaining } from '../../common/Helpers';

class ExpressConfig extends Component {
  constructor(props) {
    super(props);
    const selectedSku = props.defaultSku;
    // console.log(122, props.blockPath);
    this.state = {
      selectedSku,
      defaultDevice: props.defaultDevice,
      contractTerm: 99,
      defaultInventory: props.defaultInventory,
      isLoggedIn: true,
      enableCountdown: props.enableFlow ? false : (props.offerConfigData.enableCountdown && calculateTimeRemaining(props.offerConfigData.givenDate)),
      offerConfigData: props.offerConfigData,
      cqdata: props.cqdata,
      inventoryData: props.inventoryData,
    };
  }

  componentWillReceiveProps(nextProps) {
    const newprops = nextProps.expressdata; // eslint-disable-line
    if (Object.keys(newprops).length) {
      this.setState({
        offerConfigData: newprops.offerConfigData,
        cqdata: newprops.cqdata,
        inventoryData: newprops.inventoryData,
      });
    }
  }

  onDeviceChange = (device) => {
    const _selectedSku = this.color.value ? device.skus.filter((sku) => sku.color === this.color.value)[0] : device.skus[0];
    const selectedSku = _selectedSku || device.skus[0];
    const { inventoryData, contractTerm } = this.state;
    const defaultInventory = inventoryData[selectedSku.id] || {
      availableDate: null,
    };
    this.setState({
      defaultDevice: device,
      selectedSku,
      defaultInventory,
      contractTerm,
    });
  };
  onColorChange = (color) => {
    const { defaultDevice, inventoryData, contractTerm } = this.state;
    const selectedSku = defaultDevice.skus.filter((sku) => sku.color === color)[0];
    const defaultInventory = inventoryData[selectedSku.id] || {
      availableDate: null,
    };
    this.setState({
      selectedSku,
      defaultInventory,
      contractTerm,
    });
  };
  onPriceChange = (contractTerm) => {
    this.setState({
      contractTerm,
    });
  }
  onAcceptOffer = (status) => {
    const { selectedSku, defaultDevice, contractTerm } = this.state;
    if (!status) {
      hashHistory.push('/intentDecision/' + defaultDevice.deviceProdId + '/' + selectedSku.id + '/' + encodeURIComponent(selectedSku.sorId) + '/' + contractTerm);
    }
  };

  onCountDownComplete = () => {
    this.setState({
      enableCountdown: false,
    });
    this.props.fetchData();
  };

  render() {
    const {
      commerceItemId, isOfferPage, skipOfferUrl, acceptOfferUrl, isStaticPage,
    } = this.props;
    const {
      selectedSku, defaultDevice, defaultInventory, enableCountdown, cqdata, offerConfigData, contractTerm, inventoryData,
    } = this.state;
    const isOutOfStock = (typeof inventoryData[selectedSku.id] !== 'undefined' && inventoryData[selectedSku.id].sku_isOutOfStock === 1);
    if (isOfferPage && cqdata.isContentPage) {
      return (
        <div className="pad20">
          <div dangerouslySetInnerHTML={{ __html: cqdata.contentHTML }} />
          <div className="textAlignCenter pad12">
            {cqdata.contentSecondary && <a className="button secondary large margin12" href={cqdata.contentSecondary.linkUrl}>{cqdata.contentSecondary.linkText}</a>}
            {cqdata.contentPrimary && <a className="button primary large margin12" href={skipOfferUrl}>{cqdata.contentPrimary.linkText}</a>}
          </div>
        </div>);
    }
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="background"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {!enableCountdown &&
            <div className="vh80">
              <Header data={cqdata} isOfferPage={isOfferPage} inventoryDate={defaultInventory.availableDate} />
              <div className={!isOfferPage ? 'vh50 margin12' : 'clearfix'} >
                <DeviceImage image={selectedSku.image} alt={defaultDevice.model} />
                <div className="width70 col noLeftMargin pad12 noLeftPad positionRelative">
                  <h4 className="fontSize_4 margin18 onlyBottomMargin" dangerouslySetInnerHTML={{ __html: cqdata.deviceTitle }} />
                  <DeviceOptions sku={selectedSku} {...offerConfigData} onDeviceChange={this.onDeviceChange} selectedDevice={defaultDevice} title={cqdata.modelLabel} />
                  <ColorOptions selectedDevice={defaultDevice} sku={selectedSku} onColorChange={this.onColorChange} refColor={(color) => this.color = color} title={cqdata.colorLabel} />
                  <PriceOption sku={selectedSku} onPriceChange={this.onPriceChange} title={cqdata.priceLabel} contractTerm={contractTerm} />
                  <p className="margin18 noSideMargin legalFinePrint bold">{isOutOfStock ? cqdata.outOfstockTitle : defaultInventory.availableDate}</p>
                </div>
              </div>
              {isOfferPage ? (
                <div>
                  <OfferUserActions {...cqdata} {...this.state} commerceItemId={commerceItemId} skipOfferUrl={skipOfferUrl} acceptOfferUrl={acceptOfferUrl} {...offerConfigData} />
                  <p className="legalFinePrint pad24">{cqdata.offerOnly.legalText}</p>
                </div>
              ) : (
                <div>
                  <UserActions onAcceptOffer={this.onAcceptOffer} onDeclineOffer={this.onDeclineOffer} {...offerConfigData} {...this.state} commerceItemId={commerceItemId} {...cqdata} isStaticPage={isStaticPage} isOutOfStock={isOutOfStock} />
                  <p className="legalFinePrint pad24">{cqdata.expressOnly.legalText}</p>
                </div>
              )}
            </div>}
          <div>
            {enableCountdown && <PreOrderInterstrial image={offerConfigData.defaultImage} title={offerConfigData.counterTitle} enableCountdown={enableCountdown} onCountDownComplete={this.onCountDownComplete} ButtonMap={offerConfigData.ButtonMap} givenDate={offerConfigData.givenDate} subTitle={offerConfigData.subtitle} />}
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
ExpressConfig.propTypes = {
  defaultSku: PropTypes.object,
  offerConfigData: PropTypes.object,
  defaultDevice: PropTypes.object,
  defaultInventory: PropTypes.object,
  commerceItemId: PropTypes.any,
  inventoryData: PropTypes.object,
  cqdata: PropTypes.object,
  isOfferPage: PropTypes.any,
  skipOfferUrl: PropTypes.any,
  acceptOfferUrl: PropTypes.any,
  isStaticPage: PropTypes.any,
  enableFlow: PropTypes.bool,
  fetchData: PropTypes.func,
};
export default ExpressConfig;
