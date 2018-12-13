/**
 * Created on 7/6/2017.
 */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
// import Swiper from 'react-id-swiper';

import PropTypes from 'prop-types';
import Title from '../../common/Title/Title';
import Notification from '../../common/Notification/Notification';

class DeviceSwiper extends Component {
  constructor(props) {
    super(props);
    this.tradeInDeviceItem.bind(this);
  }

  tradeInDeviceItem(item) {
    return (
      <Row>
        <Col md={5} lg={4}>
          <img
            width={100}
            src={item.get('modelImage')}
            alt={item.get('displayName')}
            itemProp="image"
          />
        </Col>
        <Col md={7} lg={8}>
          <p className="fontSize_4">
            <span dangerouslySetInnerHTML={{ __html: item.get('deviceBrand') }} />
            <span dangerouslySetInnerHTML={{ __html: item.get('displayName') }} />
          </p>
          <p className="fontSize_4">
            {item.get('color') && <span><span dangerouslySetInnerHTML={{ __html: item.get('color') }} /> - </span> }
            <span dangerouslySetInnerHTML={{ __html: item.get('size') }} />
          </p>
          <p className="fontSize_4">
            <span>{this.props.cqLabel.get('OD_INSTANT_CREDIT_DEVICE_ID')}</span>
            <span dangerouslySetInnerHTML={{ __html: item.get('deviceId') }} />
          </p>
          <p className="fontSize_4 pad30 onlyTopPad">
            <p className="bold width50">{this.props.cqLabel.get('OD_INSTANT_CREDIT_ESTIMATED_TRADE_IN')}</p>
            {item.get('price') && <h2>${item.get('price')}</h2>}
          </p>
        </Col>
      </Row>
    );
  }

  render() {
    const { cqHTML, cqLabel, tradeDeviceItems, isTotalCredit, showWarning } = this.props;
    /*
      const params = {
        navigation: {
          nextEl: '.swiper-button-next.swiper-button-black',
          prevEl: '.swiper-button-prev.swiper-button-black',
        },
        slidesPerView: 3,
        spaceBetween: 0,
        centeredSlides: false,
        slidesPerGroup: 1,
        slideVisibleClass: 'swiper-slide-visible',
        watchSlidesVisibility: true,
        DOMAnimation: false,
      };
    */
    return (
      <div className="grid section">
        <Title tabIndex="0" className="pad15 noSidePad" dangerouslySetInnerHTML={{ __html: cqHTML.get('OD_INSTANT_CREDIT_TRADEIN_DEVICE_TITLE') }} />

        {/* <Swiper {...params}>
          {tradeDeviceItems && tradeDeviceItems.get('tradeInDevicesVos').map((item, index) => (
            <div key={index} className="margin20 noSideMargin">
              <Row>
                <Col md={4} lg={4}>
                  <img
                    width={100}
                    src={item.get('modelImage')}
                    alt={item.get('displayName')}
                    itemProp="image"
                  />
                </Col>
                <Col md={8} lg={8}>
                  <p className="fontSize_4">
                    <span dangerouslySetInnerHTML={{ __html: item.get('deviceBrand') }} />
                    <span dangerouslySetInnerHTML={{ __html: item.get('displayName') }} />
                  </p>
                  <p className="fontSize_4">
                    {item.get('color') && <span><span dangerouslySetInnerHTML={{ __html: item.get('color') }} /> - </span> }
                    <span dangerouslySetInnerHTML={{ __html: item.get('size') }} />
                  </p>
                  <p className="fontSize_4">
                    <span>{cqLabel.get('OD_INSTANT_CREDIT_DEVICE_ID')}</span>
                    <span dangerouslySetInnerHTML={{ __html: item.get('deviceId') }} />
                  </p>
                  <p className="fontSize_4 pad30 onlyTopPad">
                    <p className="bold width50">{cqLabel.get('OD_INSTANT_CREDIT_ESTIMATED_TRADE_IN')}</p>
                    {item.get('price') && <h2>${item.get('price')}</h2>}
                  </p>
                </Col>
              </Row>
            </div>
          ))}
        </Swiper> */}

        {tradeDeviceItems && tradeDeviceItems.get('tradeInDevicesVos') && <Row>
          {tradeDeviceItems.get('tradeInDevicesVos').map((item, index) => (item.get('bicApplied')) && (
            <Col xs={12} key={index} className="margin20 noSideMargin">
              {item.get('promoValue') &&
                <div className="margin20 noSideMargin">
                  <Notification message={cqLabel.get('OD_INSTANT_CREDIT_TRADE_IN_PROMO_PRICE_TEXT') + item.get('promoValue') + cqLabel.get('OD_INSTANT_CREDIT_TRADE_IN_PROMO_RECEIPT_TEXT')} type="info" noClose noIcon />
                </div>
              }
              {this.tradeInDeviceItem(item)}
            </Col>
          ))}
        </Row>}

        {showWarning &&
          <Notification message={cqLabel.get('OD_INSTANT_CREDIT_WARNING_MSG')} type="warning" noClose noIcon />
        }

        {tradeDeviceItems && tradeDeviceItems.get('tradeInDevicesVos') && <Row>
          {tradeDeviceItems.get('tradeInDevicesVos').map((item, index) => (!item.get('bicApplied')) && (
            <Col xs={4} key={index} className="margin20 noSideMargin">
              {this.tradeInDeviceItem(item)}
            </Col>
          ))}
        </Row>}

        <div className="pad10 noSidePad" dangerouslySetInnerHTML={{ __html: cqHTML.get('OD_INSTANT_CREDIT_BILL_VALIDITY') }} />
        {isTotalCredit && tradeDeviceItems && tradeDeviceItems.get('tradeInDevicesVos') && tradeDeviceItems.get('tradeInDevicesVos').size > 1 &&
          <div className="border_black borderSize_1 onlyTopBorder pad20 noSidePad">
            <p className="bold">
              <span>{cqLabel.get('OD_INSTANT_CREDIT_TOTAL_EST_TRADE_IN')}</span>
              <span className="fontSize_9">${isTotalCredit}</span>
            </p>
            {/* tradeInPerMonth && <span>({tradeInPerMonth}{cqLabel.get('OD_INSTANT_CREDIT_OVER_MONTHS')})</span> */}
          </div>
        }
      </div>
    );
  }
}
DeviceSwiper.propTypes = {
  cqLabel: PropTypes.object,
  cqHTML: PropTypes.object,
  tradeDeviceItems: PropTypes.array,
  isTotalCredit: PropTypes.string,
  showWarning: PropTypes.bool,
  // wasPrice: PropTypes.string,
  // tradeInPerMonth: PropTypes.string,
};
export default DeviceSwiper;
