import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import ToolTip from './../../../common/ToolTip';
import SelectListItem from './selectListItem';
import { normalizePhoneNumber } from './../../../common/validation';

const onDeviceListFeatureData = (_self, elId, e) => {
  e.preventDefault();
  const items = _self.state.toggler;
  items[elId].displayFeatureType = !items[elId].displayFeatureType;
  if (items[elId].featureTypeText === 'Show') {
    items[elId].featureTypeText = 'Hide';
    items[elId].featureTypeCSS = 'Show';
  } else {
    items[elId].featureTypeText = 'Show';
    items[elId].featureTypeCSS = 'Hide';
  }
  _self.setState({
    items,
  });
};

class DeviceListWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: [],
    };
  }
  render() {
    const {
      cqContent,
      devices,
      deviceConfigInfo,
    } = this.props;
    const imageWidthHeight = '&wid=110&hei=130';
    const deviceConfigInfoDevices = deviceConfigInfo && deviceConfigInfo.devices;
    return (
      <section className="">
        {
          devices && devices.items && devices.items.map((deviceDetails, id) => {
            const eleObj = {};
            eleObj.featureTypeText = 'Show';
            eleObj.featureTypeCSS = 'hide';
            eleObj.displayFeatureType = false;
            eleObj.eleId = id;
            this.state.toggler.push(eleObj);
            return (<Row key={`deviceDetails-${id}`} className="margin20 onlyBottomMargin">
              <Col xs={2} >
                {deviceDetails.deviceImageUrl &&
                  <div className="textAlignCenter">
                    <img src={`${deviceDetails.deviceImageUrl}${deviceDetails.deviceImageUrl.indexOf('?') === -1 ? '?' + imageWidthHeight : imageWidthHeight}`} alt={deviceDetails.deviceName} />
                    {(deviceConfigInfoDevices && ((deviceConfigInfoDevices[id].flow === 'AAL' || deviceConfigInfoDevices[id].flow === 'NSO') && deviceConfigInfoDevices[id].npaNxxnumber)) &&
                      <p className="color_666">{deviceConfigInfoDevices[id].npaNxxnumber}</p>
                    }
                    {(deviceConfigInfoDevices && (deviceConfigInfoDevices[id].flow === 'EUP' && deviceConfigInfoDevices[id].mtnNumber)) &&
                      <p className="color_666">{normalizePhoneNumber(deviceConfigInfoDevices[id].mtnNumber)}</p>
                    }
                  </div>
                }
              </Col>

              <Col xs={6} >
                <div className="pad10 onlySidePad">
                  <p dangerouslySetInnerHTML={{ __html: deviceDetails.manufactureName + ' ' + deviceDetails.deviceName + ' ' + (deviceDetails.size || '') + (deviceDetails.color ? (' in ' + deviceDetails.color) : '') }} />
                  {deviceDetails.color &&
                    <div className="color pad5 noSidePad">
                      <span className="color-box displayInlineBlock gridBorder" style={{ backgroundColor: deviceDetails.colorCode ? deviceDetails.colorCode : '' }} />
                      <span className="clearfix displayInlineBlock pad5 onlySidePad color_666"> {deviceDetails.color} </span>
                    </div>
                  }
                  {(deviceConfigInfoDevices && deviceConfigInfoDevices[id].numberShareDevice && deviceConfigInfoDevices[id].numberSharedMtn) &&
                    <div className="numberShareData pad5 noSidePad">
                      <div className="color_666">
                        <p className="pad12 onlyRightPad">
                          <span className="bold block">{cqContent.label.DT_OD_CONFIRMATION_SHARING_TEXT}</span>
                          <span>{deviceConfigInfoDevices[id].numberSharedMtn}</span>
                          {(deviceConfigInfoDevices[id].deviceNickName && deviceConfigInfoDevices[id].numberSharedMtn) ? ', ' : ''}
                          <span dangerouslySetInnerHTML={{ __html: deviceConfigInfoDevices[id].deviceNickName }} />
                        </p>
                      </div>
                    </div>
                  }
                  {deviceDetails.displayImeiId &&
                    <div className="deviceIdData pad5 noSidePad">
                      <div className="color_666">
                        <p className="pad12 onlyRightPad">
                          <span className="bold">{cqContent.label.DT_OD_CONFIRMATION_DEVICEID_TEXT}</span>
                          &nbsp;<span>{deviceDetails.displayImeiId}</span>
                        </p>
                      </div>
                    </div>
                  }
                  <div className="paymentData pad5 noSidePad">
                    {deviceDetails.contractTerm === '99' && <p className="bold color_666">{cqContent.label.DT_OD_CONFIRMATION_MONTHLY_DEVICE_PAY}</p>}
                    <div className="color_666">
                      <span dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_RETAIL_PRICE }} />
                      {deviceDetails.promoApplied ?
                        <span>
                          <span className="textDecLineThrough">${deviceDetails.edgeRetailPrice}</span>
                          <span>&nbsp;${deviceDetails.installmentBalance}</span>
                        </span>
                        :
                        <span className="pad5 onlySidePad">${deviceDetails.edgeRetailPrice}</span>
                      }
                    </div>
                  </div>

                  {deviceDetails.contractTerm === '99' &&
                    <p className="bold pad5 noSidePad color_666">{cqContent.label.DT_OD_CONFIRMATION_INSTALLMENT_TEXT}</p>
                  }

                  {deviceDetails.poboDateLabel &&
                    <p className="bold pad5 noSidePad color_666">{deviceDetails.poboDateLabel}</p>
                  }

                  {(deviceDetails.activationFee && parseFloat(deviceDetails.activationFee) > 0) &&
                    <div>
                      <span className="activationFees color_666">{cqContent.label.DT_OD_CONFIRMATION_ACTIVATION_TEXT} ${deviceDetails.activationFee}</span>
                      <ToolTip
                        className="margin3 onlyLeftMargin displayInlineBlock"
                        header=""
                        text={cqContent.label.DT_OD_CONFIMARTION_ACTIVATION_TOOLTIP}
                      />
                    </div>
                  }

                  {deviceDetails.devicePromotionList && deviceDetails.devicePromotionList.map((offer) => (
                    (offer.promoAmount !== null && parseFloat(offer.promoAmount) > 0) &&
                    offer.isUpgradeFeeWaivedOffer ?
                      <div className="color_666">{cqContent.label.DT_OD_CONFIMARTION_WAIVED_UPGRADE_FEE_TEXT}:&nbsp;<span>${deviceDetails.upgradeFee}</span>&nbsp;<span className="textDecLineThrough">${deviceDetails.originalUpgradeFee}</span></div>
                      :
                      <div className="color_666">{`${cqContent.label.DT_OD_CONFIRMATION_OFFER_DISCOUNT_TEXT} : $${offer.promoAmount}`}</div>
                  ))}

                  {(deviceDetails.upgradeFee && parseFloat(deviceDetails.upgradeFee) > 0) &&
                    <div>
                      <span className="activationFees color_666">{cqContent.label.DT_OD_CONFIRMATION_UPGRADE_FEE_TEXT} ${deviceDetails.upgradeFee}</span>
                      <ToolTip
                        className="margin3 onlyLeftMargin displayInlineBlock"
                        header=""
                        text={cqContent.label.DT_OD_CONFIRMATION_UPGRADE_FEE_TOOLTIP}
                      />
                    </div>
                  }

                  {deviceDetails.protectionFeature &&
                    <div className="pad5 noSidePad">
                      <SelectListItem
                        className={this.state.toggler[id].displayFeatureType ? 'expanded' : ''}
                        title={this.state.toggler[id].featureTypeText ? this.state.toggler[id].featureTypeText + cqContent.label.DT_OD_CONFIRMATION_FEATURE_LIST : 'Show' + cqContent.label.DT_OD_CONFIRMATION_FEATURE_LIST}
                        onClickMethod={(evt) => (onDeviceListFeatureData(this, id, evt))}
                      />
                    </div>
                  }

                  {this.state.toggler[id].displayFeatureType &&
                    <div className={'features-content ' + (this.state.toggler[id].featureTypeCSS)}>
                      {deviceDetails.protectionFeature &&
                        <div className="features-content-inner pad5 noSidePad">
                          {/* <h4 className="pad5 onlyTopPad bold">Equipment Protection</h4> */}
                          <div className="clearfix pad5 onlySidePad color_666">
                            <div className="width70 floatLeft">{deviceDetails.protectionFeature.name}</div>
                            {deviceDetails.protectionFeature.hasEcpdDiscount ?
                              <div>
                                <span>{deviceDetails.protectionFeature.price !== '-' ? `$${deviceDetails.protectionFeature.price}` : '-'}</span>
                                {deviceDetails.protectionFeature.originalPrice !== '-' &&
                                  <span className="textDecLineThrough">${deviceDetails.protectionFeature.originalPrice}</span>
                                }
                              </div>
                              :
                              <div>
                                {deviceDetails.protectionFeature.price !== '-' ? <div className="width30 floatLeft">${deviceDetails.protectionFeature.price}</div> : '-'}
                              </div>
                            }
                          </div>
                        </div>
                      }

                      {deviceDetails.optionalFeatures && deviceDetails.optionalFeatures.map((feature, i) => (
                        <div className="features-content-inner pad5 noSidePad" key={`device-${i}`}>
                          {/* <h4 className="pad5 onlyTopPad bold">Equipment Protection</h4> */}
                          <div className="clearfix pad5 onlySidePad color_666">
                            <div className="width70 floatLeft">{feature.name}</div>
                            {feature.hasEcpdDiscount ?
                              <div>
                                <span>{feature.price !== '-' ? `$${feature.price}` : '-'}</span>
                                {feature.originalPrice !== '-' &&
                                  <span className="textDecLineThrough">${feature.originalPrice}</span>
                                }
                              </div>
                              :
                              <div>
                                {feature.price !== '-' ? <div className="width30 floatLeft">${feature.price}</div> : '-'}
                              </div>
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  }
                </div>
              </Col>

              <Col xs={4} className="fontSize_5">

                {deviceDetails.dueToday &&
                  <div className="color_666">
                    <div className="textAlignRight bold">Due today*</div>
                    <div className="textAlignRight">${deviceDetails.dueToday}</div>
                  </div>
                }

                {deviceDetails.dueMonthly &&
                  <div className="color_666">
                    <div className="textAlignRight bold">Due Monthly</div>
                    {deviceDetails.dueMonthlyDiscounted ?
                      <div className="textAlignRight">
                        <div className="textDecLineThrough">${deviceDetails.dueMonthlyOriginal}</div>
                        <div>${deviceDetails.dueMonthly}</div>
                      </div>
                      :
                      <div className="textAlignRight">${deviceDetails.dueMonthly}</div>
                    }
                  </div>
                }

              </Col>
            </Row>
            );
          }
          )}
      </section>
    );
  }
}


DeviceListWrapper.propTypes = {
  cqContent: PropTypes.object,
  devices: PropTypes.object,
  deviceConfigInfo: PropTypes.object,
};
export default DeviceListWrapper;

