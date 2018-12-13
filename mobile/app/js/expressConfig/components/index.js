/**
 * Created by santhra  on 6/15/2017.
 */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form/immutable';
import * as _ from 'lodash';
import { history } from './../../store';
import A from '../../common/A/A';
import Img from '../../common/Img/Img';
import Checkbox from './../../common/Checkbox/Checkbox';
import PreOrderInterstrial from './../../common/PreOrder';
import MoreDetails from './MoreDetails';

const renderDropdown = ({ input, label, preLabel, labelTop, type, highLight, labelLineHeight, meta: { touched, error }, ...custom }) => { // eslint-disable-line
  const {
    options, defaultValue, id, ...rest
  } = custom;
  const labelTopVal = (typeof labelTop !== 'undefined') ? labelTop : '62px';
  const highLightVal = (typeof highLight !== 'undefined') ? 'bold' : 'normal';
  return (
    <div className="selectpicker">
      <div
        className="fontSize_2 color_000 margin36 noSideMargin clearBoth"
      > {(typeof preLabel !== 'undefined') ? preLabel : ''}
      </div>
      <select
        {...input}
        {...rest}
        style={{
          width: '85%',
          border: 'none',
          bottom: '10px',
          position: 'absolute',
          padding: 0,
          fontWeight: highLightVal,
        }}
        value={defaultValue}
      >
        {options.map((optionLabel, idx) => (<option key={idx} value={optionLabel}>{optionLabel}</option>))}
      </select>
      <label
        className="fontSize_2 color_959595 "
        htmlFor={id}
        style={{
          userSelect: 'none',
          position: 'absolute',
          top: labelTopVal,
          lineHeight: (typeof labelLineHeight !== 'undefined') ? labelLineHeight : '30px',
          pointerEvents: 'none',
          display: 'block',
        }}
      >{label}
      </label>
    </div>);
};

class ExpressConfigComponent extends React.Component {
  constructor(props) {
    super(props);
    const expressConfigData = props.expressConfigData;
    let selectedIndex = 0;
    const filteredSku = expressConfigData.devices.map((sku) => (sku.skus.filter((skuDetails) => skuDetails.id === props.defaultSkuId)[0]));
    let getDefaultSku = null;
    filteredSku.forEach((sku, index) => {
      if (typeof sku !== 'undefined') {
        getDefaultSku = sku;
        selectedIndex = index;
      }
    });
    this.state = {
      selectedModelIndex: selectedIndex,
      selectedModelName: expressConfigData.devices[selectedIndex].model,
      selectedColor: (getDefaultSku !== null) ? getDefaultSku.color : _.uniqBy(expressConfigData.devices[0].skus, 'color')[0].color,
      selectedCapacity: (getDefaultSku !== null) ? getDefaultSku.capacity : _.uniqBy(props.expressConfigData.devices[0].skus, 'capacity')[0].capacity,
      isTradeIn: true,
      selectedPriceInfoIndex: 0,
      isAppleCare: false,
      isCountDownCompleted: props.enableFlow ? false : this.calculateTimeRemaining(),
      commerceItemIdURL: ''/** Added for iconic expressconfig functionality */,
      moreDetails: false,
    };
  }

  componentDidMount() {
    const urlStr = window.location.href;
    const urlSplit = urlStr.split('&');

    if (urlSplit) {
      const commerceItemIdURL = urlSplit.find((item) => item.indexOf('commerceItemId') >= 0);

      if (commerceItemIdURL) {
        this.setState({ commerceItemIdURL: commerceItemIdURL.split('=')[1] });
      }
      const contractTerm = urlSplit.find((item) => item.indexOf('contractTerm') >= 0);

      if (contractTerm) {
        const contrVal = contractTerm.split('=')[1];
        this.setState({ selectedPriceInfoIndex: (contrVal === 0) ? 1 : 0 });
      }

      const tradeinSelectedURL = urlSplit.find((item) => item.indexOf('tradeinSelected') >= 0);

      if (tradeinSelectedURL) {
        const tradeInVal = tradeinSelectedURL.split('=')[1];
        const tradeinStr = tradeInVal.split('#')[0];
        this.setState({ isTradeIn: (tradeinStr === 'true') });
      }
    }
  }

  onSubmitExpressConfig(data) {
    this.props.submitExpressConfig(this.props.expressConfigData.ButtonMap.PrimaryButton.actionURL, JSON.parse(data));
  }

  onCountDownComplete = () => {
    if (this.state.isCountDownCompleted) {
      this.setState({ isCountDownCompleted: false });
      this.props.getPageJSONAPI(this);
    }
  }

  getCookie(name) {
    const pattern = RegExp(name + '=.[^;]*');
    const matched = document.cookie.match(pattern);
    if (matched) {
      const cookie = matched[0].split('=');
      return cookie[1];
    }
    return false;
  }

  calculateTimeRemaining = () => {
    const formattedGivenDate = new Date(this.props.expressConfigData.givenDate);
    const today = new Date();
    const msDiff = typeof window.duration !== 'undefined' ? window.duration : (formattedGivenDate - today);
    console.log(msDiff);
    return !((msDiff < 0));
  }

  changeModel(event) {
    const selectedIndex = event.target.selectedIndex;
    this.setState({
      selectedModelIndex: selectedIndex,
      selectedModelName: this.props.expressConfigData.devices.map((device) => (device.model))[selectedIndex],
      selectedColor: _.uniqBy(this.props.expressConfigData.devices[selectedIndex].skus, 'color')[0].color,
      selectedCapacity: _.uniqBy(this.props.expressConfigData.devices[selectedIndex].skus, 'capacity')[0].capacity,
      isTradeIn: false,
    });
  }


  changeColor(event) {
    const selectedColor = event.target.value;
    const selectedCapacity = this.props.expressConfigData.devices[this.state.selectedModelIndex].skus.filter((sku) => (sku.color === selectedColor))[0].capacity;
    this.setState({ selectedColor, selectedCapacity, isTradeIn: false });
  }

  changeCapacity(event) {
    this.setState({ selectedCapacity: event.target.value });
  }

  changeTradein() {
    this.setState({ isTradeIn: !this.state.isTradeIn });
  }

  changeAppleCare() {
    this.setState({ isAppleCare: !this.state.isAppleCare });
  }

  changePriceInfo(event) {
    this.setState({ selectedPriceInfoIndex: event.target.selectedIndex });
  }

  changeMoreDetails = (moreDetailsFlag) => {
    this.setState({ moreDetails: moreDetailsFlag });
  }

  // getSelectDevice(data) {}

  next() {
    const device = this.props.expressConfigData.devices[this.state.selectedModelIndex];
    let contractTerm = '99';
    if (device.selectedPriceInfoIndex && device.selectedPriceInfoIndex !== 0) {
      contractTerm = '0';
    } else if (this.state.selectedPriceInfoIndex && this.state.selectedPriceInfoIndex === 1) {
      contractTerm = '0';
    }

    const selectedSKU = device.skus.filter((sku) => (sku.color === this.state.selectedColor && sku.capacity === this.state.selectedCapacity))[0];

    const data = {
      deviceId: device.deviceProdId,
      deviceSkuId: selectedSKU.id,
      deviceSorId: selectedSKU.sorId,
      contractTerm,
    };
    /** ** building query params ***** */
    let aalDeviceIdParam = '';
    let aalskuIdParam = '';
    let aalsorIdParam = '';
    let contractParam = '';
    const aalTradeInSelected = '&tradeinSelected=' + this.state.isTradeIn;
    if (data && data.deviceId) {
      aalDeviceIdParam = 'deviceProdId=' + data.deviceId;
    }
    if (data && data.deviceSkuId) {
      aalskuIdParam = '&catalogRefId=' + data.deviceSkuId;
    }
    if (data && data.deviceSorId) {
      aalsorIdParam = '&deviceSorId=' + data.deviceSorId;
    }
    if (data && data.contractTerm) {
      contractParam = '&contractTerm=' + data.contractTerm;
    }

    // const sessionCookie = document.cookie;
    const loggedInCustomer = this.getCookie('loggedIn');

    if (!loggedInCustomer || loggedInCustomer === false || loggedInCustomer === 'false') {
      /*   this.setState({
          showIntent: true,
          decisionObj: {
            deviceId: data.deviceId,
            deviceSkuId: data.deviceSkuId,
            deviceSorId: data.deviceSorId,
            contractTerm: data.contractTerm,
            tradeinSelected: this.state.isTradeIn
          }
        }); */
      console.log(history);
      history.push('/indentDecision/' + this.state.selectedModelIndex + '/' + data.deviceId + '/' + data.deviceSkuId + '/' + encodeURIComponent(data.deviceSorId) + '/' + data.contractTerm + '/' + this.state.isTradeIn);
      // window.location.href= '/prospect/preorder/expressconfig/#/decision?' + deviceIdParam + skuIdP data.deviceSkuId+'/'+aram + sorIdParam + contractParam;
    } else {
      const loggedInUrl = this.props.expressConfigData.afterLoginUrl;
      window.location.href = loggedInUrl + '&' + aalDeviceIdParam + aalskuIdParam + aalsorIdParam + contractParam + aalTradeInSelected;
    }
  }


  render() {
    const {
      expressConfigData, inventoryData,
    } = this.props;
    const models = expressConfigData.devices.map((device) => (device.model));
    const currentdeviceSKUArr = expressConfigData.devices[this.state.selectedModelIndex].skus;
    const colorSkus = _.uniqBy(currentdeviceSKUArr, 'color');
    const capacityArr = currentdeviceSKUArr.filter((sku) => (sku.color === this.state.selectedColor));
    const capacitySkus = _.uniqBy(capacityArr, 'capacity');
    const colors = colorSkus.map((item) => (item.color));
    const storage = capacitySkus.map((item) => (item.capacity));
    const imageURL = currentdeviceSKUArr.filter((sku) => sku.color === this.state.selectedColor)[0].image;
    const skuID = currentdeviceSKUArr.filter((sku) => (sku.color === this.state.selectedColor && sku.capacity === this.state.selectedCapacity))[0].id;
    const princeInfo = (!this.state.isTradeIn) ? currentdeviceSKUArr.filter((sku) => sku.id === skuID)[0].notradein : currentdeviceSKUArr.filter((sku) => sku.id === skuID)[0].tradein;
    const priceArr = princeInfo.map((item) => (item.priceMsg));
    const sorId = currentdeviceSKUArr.filter((sku) => sku.id === skuID)[0].sorId;
    const deviceProdId = expressConfigData.devices[this.state.selectedModelIndex].deviceProdId;
    const isOutOfStock = !!((typeof inventoryData[skuID] !== 'undefined' && inventoryData[skuID].sku_isOutOfStock === 1));
    const deviceType = currentdeviceSKUArr.filter((sku) => sku.id === skuID)[0].deviceType;

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="background"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div>
            {
              (this.state.isCountDownCompleted && expressConfigData.enableCountdown) ?
                <PreOrderInterstrial image={expressConfigData.defaultImage} title={expressConfigData.counterTitle} enableCountdown={this.state.isCountDownCompleted} onCountDownComplete={this.onCountDownComplete} ButtonMap={expressConfigData.ButtonMap} givenDate={expressConfigData.givenDate} subTitle={expressConfigData.subtitle} />
                : (this.state.moreDetails) ? <MoreDetails onBackChange={this.changeMoreDetails} /> :
                  <div>
                    <h1 className="h2 pad12 noBottomPad">{expressConfigData.title}</h1>
                    <p className="pad12 noBottomPad" dangerouslySetInnerHTML={{ __html: expressConfigData.subtitle }} />
                    {(typeof inventoryData[skuID] !== 'undefined' && inventoryData[skuID].availableDate !== '') &&
                      <p
                        className="pad6 noSidePad fontSize_2 margin12 onlySideMargin"
                      > {inventoryData[skuID].availableDate}
                      </p>}

                    {isOutOfStock && <div className="red fontSize_2 pad6 noSidePad margin12 onlySideMargin">{expressConfigData.outOfstockTitle}</div>}
                    <div className="pad12 onlyTopPad">
                      <div className="col span_2_of_5 pad6 onlyTopPad no-gutter">
                        <Img className="media margin-48 onlyLeftMargin" src={imageURL} alt={imageURL} />
                      </div>
                      <div className="col span_3_of_5 pad18 onlySidePad margin18 onlyTopMargin">
                        <form >
                          <div
                            style={{
                              backgroundColor: 'transparent',
                              fontSize: '16px',
                              width: '95%',
                              height: '42px',
                              display: 'inline-block',
                              position: 'relative',
                              lineHeight: '24px',
                              fontFamily: 'Roboto, sans-serif',
                              transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                              cursor: 'auto',
                              float: 'left',
                            }}
                          >
                            <Field
                              className="leftAlign fontSize_4 color_000"
                              aria-label={expressConfigData.modelLabel}
                              label={expressConfigData.modelLabel}
                              onChange={this.changeModel.bind(this)}
                              name="model_name"
                              id="model_name"
                              options={models}
                              component={renderDropdown}
                              defaultValue={models[this.state.selectedModelIndex]}
                              labelTop="30px"
                            />
                            <hr
                              style={{
                                bottom: '8px',
                                borderTop: 'none rgba(0, 0, 0, 0.298039)',
                                borderRight: 'none rgba(0, 0, 0, 0.298039)',
                                borderBottom: '1px solid rgba(0, 0, 0, 0.298039)',
                                borderLeft: 'none',
                                boxSizing: 'content-box',
                                margin: '0px',
                                position: 'absolute',
                                width: '100%',
                              }}
                            />

                          </div>
                          <div
                            style={{
                              backgroundColor: 'transparent',
                              fontSize: '16px',
                              width: '95%',
                              height: '72px',
                              display: 'inline-block',
                              position: 'relative',
                              lineHeight: '24px',
                              fontFamily: 'Roboto, sans-serif',
                              transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                              cursor: 'auto',
                              float: 'left',
                            }}
                          >
                            <Field
                              className="leftAlign fontSize_4 color_000"
                              aria-label={expressConfigData.colorLabel}
                              label={expressConfigData.colorLabel}
                              name="color_name"
                              id="color_name"
                              options={colors}
                              component={renderDropdown}
                              defaultValue={this.state.selectedColor}
                              onChange={this.changeColor.bind(this)}
                            />
                            <hr
                              style={{
                                bottom: '8px',
                                borderTop: 'none rgba(0, 0, 0, 0.298039)',
                                borderRight: 'none rgba(0, 0, 0, 0.298039)',
                                borderBottom: '1px solid rgba(0, 0, 0, 0.298039)',
                                borderLeft: 'none',
                                boxSizing: 'content-box',
                                margin: '0px',
                                position: 'absolute',
                                width: '100%',
                              }}
                            />
                          </div>
                          {deviceType !== 'Hum' &&
                            <div>
                              <div
                                style={{
                                  backgroundColor: 'transparent',
                                  fontSize: '16px',
                                  width: '95%',
                                  height: '72px',
                                  display: 'inline-block',
                                  position: 'relative',
                                  lineHeight: '24px',
                                  fontFamily: 'Roboto, sans-serif',
                                  transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                                  cursor: 'auto',
                                  float: 'left',
                                }}
                              >
                                <Field
                                  className="leftAlign fontSize_4 color_000"
                                  aria-label={expressConfigData.storageLabel}
                                  label={expressConfigData.storageLabel}
                                  name="capacity"
                                  id="capacity"
                                  options={storage}
                                  component={renderDropdown}
                                  defaultValue={this.state.selectedCapacity}
                                  onChange={this.changeCapacity.bind(this)}
                                />
                                <hr
                                  style={{
                                    bottom: '8px',
                                    borderTop: 'none rgba(0, 0, 0, 0.298039)',
                                    borderRight: 'none rgba(0, 0, 0, 0.298039)',
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.298039)',
                                    borderLeft: 'none',
                                    boxSizing: 'content-box',
                                    margin: '0px',
                                    position: 'absolute',
                                    width: '100%',
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  backgroundColor: 'transparent',
                                  fontSize: '16px',
                                  width: '95%',
                                  height: '68px',
                                  display: 'inline-block',
                                  position: 'relative',
                                  lineHeight: '24px',
                                  fontFamily: 'Roboto, sans-serif',
                                  transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                                  cursor: 'auto',
                                  float: 'left',
                                }}
                              >
                                <Field
                                  className="leftAlign fontSize_3 color_000 fontDisplayMedium"
                                  aria-label="Device Payment"
                                  onChange={this.changePriceInfo.bind(this)}
                                  label={this.state.selectedPriceInfoIndex === 0 ? `${princeInfo[this.state.selectedPriceInfoIndex].priceMsgDescription} ${princeInfo[this.state.selectedPriceInfoIndex + 1].priceMsgDescription}: ${princeInfo[this.state.selectedPriceInfoIndex + 1].priceMsg}` : princeInfo[this.state.selectedPriceInfoIndex].priceMsgDescription}
                                  preLabel=""
                                  name="model_name"
                                  id="model_name"
                                  options={priceArr}
                                  component={renderDropdown}
                                  defaultValue={priceArr[this.state.selectedPriceInfoIndex]}
                                  labelTop="64px"
                                  labelLineHeight="14px"
                                />
                                <hr
                                  style={{
                                    bottom: '8px',
                                    borderTop: 'none rgba(0, 0, 0, 0.298039)',
                                    borderRight: 'none rgba(0, 0, 0, 0.298039)',
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.298039)',
                                    borderLeft: 'none',
                                    boxSizing: 'content-box',
                                    margin: '0px',
                                    position: 'absolute',
                                    width: '100%',
                                  }}
                                />

                              </div>{(princeInfo[this.state.selectedPriceInfoIndex].priceMsgSuffix !== null && princeInfo[this.state.selectedPriceInfoIndex].priceMsgSuffix !== 'null') &&
                                <div
                                  className="fontSize_2 color_959595 clearBoth pad42 onlyTopPad floatLeft"
                                >{princeInfo[this.state.selectedPriceInfoIndex].priceMsgSuffix}
                                </div>}
                              {(typeof expressConfigData.appleCare !== 'undefined' && expressConfigData.appleCare !== null && expressConfigData.appleCare !== 'null') &&
                                <div className="clearBoth pad6 onlyTopPad margin18 onlyTopMargin floatLeft">
                                  <Checkbox
                                    id="apple_care"
                                    name="apple_care"
                                    value="yes"
                                    containerClassName="col width90"
                                    labelClassName="col span_4_of_5 normalText floatRight fontSize_2 lineHeight20"
                                    onClick={this.changeAppleCare.bind(this)}
                                    defaultChecked={this.state.isAppleCare}
                                  >
                                    {expressConfigData.appleCare.label} &nbsp;
                                    <span
                                      className="fontSize_2 color_959595"
                                    >( {expressConfigData.appleCare.dueToday} )
                                    </span>
                                    <Link
                                      to="/appleCare"
                                      className="link fontSize_2"
                                      role="link"
                                    >{expressConfigData.appleCare.detailsLink}
                                    </Link>
                                  </Checkbox>
                                </div>
                              }
                              {expressConfigData.tradeInFlag &&
                                <div className="pad12 onlyTopPad clearBoth margin18 onlyTopMargin floatLeft">
                                  <Checkbox
                                    id="trade_in"
                                    name="trade_in"
                                    value={this.state.isTradeIn}
                                    containerClassName="col width90"
                                    labelClassName="col span_4_of_5 normalText floatRight fontSize_2 lineHeight20"
                                    onClick={this.changeTradein.bind(this)}
                                    defaultChecked={this.state.isTradeIn}
                                  >
                                    {expressConfigData.tradeInLabel}&nbsp;
                                    {typeof window.moreDetails !== 'undefined' && typeof expressConfigData.moreDetailsLink !== 'undefined' &&
                                      <A
                                        href="#"
                                        className="fontSize_2"
                                        onClick={this.changeMoreDetails.bind(this, true)}
                                      >{expressConfigData.moreDetailsLink}
                                      </A>}
                                  </Checkbox>
                                </div>
                              }
                            </div>
                          }
                        </form>
                      </div>

                    </div>
                    <div className="textAlignCenter clearBoth width100 pad18 noSidePad">

                      {(typeof window.isStaticPage === 'undefined' || !window.isStaticPage) &&

                        (typeof expressConfigData.ButtonMap.SecondaryButton !== 'undefined' && expressConfigData.ButtonMap.SecondaryButton) &&
                        <A
                          href={expressConfigData.ButtonMap.SecondaryButton.actionURL}
                          className="large button secondary margin18 onlyRightMargin"
                        >
                          {expressConfigData.ButtonMap.SecondaryButton.title}
                        </A>

                      }
                      {
                        (typeof window.isStaticPage !== 'undefined' && window.isStaticPage) ?
                          <button className={'large button primary ' + (isOutOfStock && 'disabled m-bglight')} disabled={isOutOfStock} onClick={() => { this.next(); }}>
                            {isOutOfStock ? expressConfigData.ButtonMap.PrimaryButton.outOfstockTitle : expressConfigData.ButtonMap.PrimaryButton.title}
                          </button> :
                          <A
                            href={(deviceType === 'Hum') ? `${expressConfigData.ButtonMap.PrimaryButton.actionURL}&catalogRefId=${skuID}&deviceSorId=${sorId}&deviceProdId=${deviceProdId}&commerceItemId=${this.state.commerceItemIdURL}` : `${expressConfigData.ButtonMap.PrimaryButton.actionURL}&catalogRefId=${skuID}&tradeinSelected=${this.state.isTradeIn}&contractTerm=${(this.state.selectedPriceInfoIndex === 0 ? 99 : 0)}&deviceSorId=${sorId}&deviceProdId=${deviceProdId}&commerceItemId=${this.state.commerceItemIdURL}`}
                            className={'large button primary ' + (isOutOfStock && 'disabled m-bglight')}
                            disabled={isOutOfStock}
                          >{isOutOfStock ? expressConfigData.ButtonMap.PrimaryButton.outOfstockTitle : expressConfigData.ButtonMap.PrimaryButton.title}
                          </A>
                      }
                    </div>
                  </div>
            }
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

ExpressConfigComponent = reduxForm({ // eslint-disable-line no-class-assign
  form: 'expressConfigForm',
  enableReinitialize: true,
})(ExpressConfigComponent);

const selector = formValueSelector('expressConfigForm');  // eslint-disable-line

ExpressConfigComponent = connect((state) => ({ // eslint-disable-line no-class-assign
  values: getFormValues('expressConfigForm')(state),

}))(ExpressConfigComponent);

ExpressConfigComponent.propTypes = {
  expressConfigData: PropTypes.object,
  defaultSkuId: PropTypes.string,
  enableFlow: PropTypes.bool,
  getPageJSONAPI: PropTypes.func,
  submitExpressConfig: PropTypes.func,
  inventoryData: PropTypes.object,
};

export default ExpressConfigComponent;

