/**
 * Created by hmahad on 12/26/2016.
 */
/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { is } from 'immutable';
import { Row, Col } from 'react-flexbox-grid';
import CartDeviceImage from './CartDeviceImage';
import A from '../../common/A/A';
import CartPlanDetails from '../containers/CartPlanDetails';
import AccessoryBundleDetails from './AccessoryBundleDetails';
import AccessoryDetails from './AccessoryDetails';
import PromoBadge from '../../common/PromoBadge/PromoBadge';
import HorizontalRule from '../../common/HorizontalRule';
import ToolTip from '../../common/ToolTip/index';
import Modal from '../../common/modal/modal';

export default class CartDeviceDetails extends Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.state = {
      hasError: false, showModal: false, deviceType: '', removeLineItem: {},
    };
  }


  componentWillMount() {
    if (!this.props.items && !this.props.standaloneAccessories) {
      window.location.href = '/#genericError';
    }
  }

  /**
   * Display Info or error notification ,if notification is not visible ,based on flags.
   */
  componentDidMount() {
    if (!this.props.notification.isNotificationVisible) {
      if (this.props.showPreOrderMsg) {
        this.props.showErrorNotification(this.props.CQError.get('OD_CART_POBO_NOTIFICATION'));
        this.props.clearCartMessage('showPreOrderMsg');
      } else if (this.props.cartMessages !== null && this.props.cartMessages) {
        if (this.props.cartReadyforCheckout) {
          this.props.showInfoNotification(this.props.cartMessages);
        } else {
          this.props.showErrorNotification(this.props.cartMessages);
        }

        this.props.clearCartMessage('cartMessages');
      }
    }
  }

  /**
   * Component should be update only if 'items' property changes ,in all other cases we can skip updating this component.
   *
   * @param nextProps - incoming props due to app state change
   * @param nextState - incoming states due to app state change
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) { // eslint-disable-line
    /* if there are  changes to items property, update the component */
    if (!is(this.props.items, nextProps.items)) {
      return true;
    }
    /* Added to allow re-rendering when accessories are removed! - BUGFIX. */
    if (!is(this.props.accessories, nextProps.accessories)) {
      return true;
    }
    /* if there are  changes to accessoriesBundle property, update the component */
    if (!is(this.props.accessoriesBundle, nextProps.accessoriesBundle)) {
      return true;
    }
    if (!is(this.state.showModal, nextState.showModal)) {
      return true;
    }
    return false;
  }


  componentDidUpdate(prevProps, prevState) { // eslint-disable-line
    /* *
     * Added to show notification when a device is removed and an error prevents the user from proceeding to checkout
     * Code is repeated here as the code in componentDidMount will not be called , as component is not removed and remounted
     * */

    if (this.props.cartMessages !== null && this.props.cartMessages) {
      if (this.props.cartReadyforCheckout) {
        this.props.showInfoNotification(this.props.cartMessages);
      } else {
        this.props.showErrorNotification(this.props.cartMessages);
      }

      this.props.clearCartMessage('cartMessages');
    }
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log('Error:', error, '\n Info:', info); // eslint-disable-line no-console
    // You can also log the error to an error reporting service
  }

  editItem(event, editDeviceUrl) {
    /** TODO:Redirect to config page. */
    event.preventDefault();
    window.location = editDeviceUrl;
  }
  checkIfStandAloneAccExists(obj) {
    return obj.standaloneAccessory === true;
  }

  removeItem(data, event) {
    event.preventDefault();
    const confirmStatus = window.confirm(this.props.CQLabel.get('OD_CART_REMOVE_ITEM_TITLE'));
    const { accessories } = this.props.accessories;

    if (!confirmStatus) {
      return false;
    }

    const standAloneAccs = accessories && accessories.filter(this.checkIfStandAloneAccExists);

    // If only 1 device and no standalone Accessories
    // if (this.props.instantTradeInDevicesCount > 1 && this.props.cartItemCount === this.props.instantTradeInDevicesCount) {
    if (this.props.showHeadsUpMsg) {
      this.setState({ showModal: true, removeLineItem: data, deviceType: 'lineItem' });
    } else if (this.props.items.size === 1 && !standAloneAccs[0]) {
      this.props.clearCart();
    } else {
      this.props.removeDevice(data);
    }
    return true;
  }

  removeAccessory = (data, skuId, prodId, event) => {
    event.preventDefault();
    const confirmStatus = window.confirm(this.props.CQLabel.get('OD_CART_REMOVE_ITEM_TITLE'));
    if (!confirmStatus) {
      return false;
    }
    console.log('Item gonna be removed!!', data); // eslint-disable-line no-console
    if (this.props.showHeadsUpMsg) {
      const obj = { data, prodId, skuId };
      this.setState({ showModal: true, removeLineItem: obj, deviceType: 'standAlone' });
    } else {
      this.props.removeAccessoryItem(data, skuId, prodId);
    }
    return true;
  }

  removeAccessoryBundle = (accName, skuId, commerceItemId, event) => {
    event.preventDefault();
    const confirmStatus = window.confirm(this.props.CQLabel.get('OD_CART_REMOVE_ITEM_TITLE'));
    if (!confirmStatus) {
      return false;
    }
    console.log('Item gonna be removed!!', accName); // eslint-disable-line no-console
    if (this.props.showHeadsUpMsg) {
      const obj = { accName, commerceItemId, skuId };
      this.setState({ showModal: true, removeLineItem: obj, deviceType: 'bundle' });
    } else {
      this.props.removeAccessoryBundleItem(accName, skuId, commerceItemId);
    }
    return true;
  }

  showShipByModal(event, skuid) {
    event.preventDefault();
    this.props.history.push('/shipByModal', { sku: skuid });
  }

  moveNext() {
    this.setState({ showModal: false });
    let { accessories } = this.props.accessories;
    accessories = this.props.accessories && this.props.accessories;
    const standAloneAccs = accessories && accessories.filter(this.checkIfStandAloneAccExists);

    switch (this.state.deviceType) {
      case 'lineItem':
        if (this.props.items.size === 1 && !standAloneAccs[0]) {
          this.props.clearCart();
        } else {
          this.props.removeDevice(this.state.removeLineItem);
        }
        break;

      case 'standAlone':
        this.props.removeAccessoryItem(this.state.removeLineItem.data, this.state.removeLineItem.skuId, this.state.removeLineItem.prodId);
        break;

      case 'bundle':
        this.props.removeAccessoryBundleItem(this.state.removeLineItem.accName, this.state.removeLineItem.skuId, this.state.removeLineItem.commerceItemId);
        break;

      default:
        break;
    }
    return true;
  }

  render() {
    const items = this.props.items || [];
    const {
      plans, cpc, accessoriesBundle, accessories, lineLevelOpted, CQLabel, isAgentSite,
    } = this.props;
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong.</div>;
    }
    return (
      <div className="ensighten_deviceDetails" >
        <Modal
          mounted={this.state.showModal}
          style={{ width: '90vw', 'min-height': '95%' }}
          closeFn={() => { this.setState({ showModal: false }); }}
        >
          <div className="margin0 noPad">
            <Row>
              <Col xs={12} sm={12} lg={12}>
                <h1>
                  <span className="fontSize_2-5 height160" dangerouslySetInnerHTML={{ __html: CQLabel.get('OD_CART_INSTANT_CREDIT_MODAL_TITLE') }} />
                </h1>
              </Col>
            </Row>
          </div>
          <div className="margin0 noPad">
            <Row>
              <Col xs={12} sm={12} lg={12}>
                <div className="positionAbsolute top50-calc-30px width100-calc-40 border_00 onlyTopBorder pad18 fontSize_2 bold">{CQLabel.get('OD_CART_INSTANT_CREDIT_REMOVE_TRADE_IN_DISCLAIMER')}</div>
                <div className="positionAbsolute bottom20 width100-calc-40">
                  <button className="button secondary margin24 onlyTopMargin large width100" onClick={() => { this.setState({ showModal: false }); }} >{CQLabel.get('OD_CART_INSTANT_CREDIT_GO_TO_CART')}</button>
                  <button className="button primary margin24 onlyTopMargin large width100" onClick={this.moveNext.bind(this)}>{CQLabel.get('OD_CART_INSTANT_CREDIT_GOT_IT')}</button>
                </div>
              </Col>
            </Row>
          </div>
        </Modal>

        {items.map((item, i) => (
          <div key={i + 'item'}>
            <Row className="noSideMargin pad24 noBottomPad" >
              {lineLevelOpted &&
                <Col xs={12} className="noTopMargin" >
                  <h3 dangerouslySetInnerHTML={{ __html: item.nickName || `Line ${i + 1}` }} />
                  <HorizontalRule y={1} margin="16px 0" />
                </Col>}
              {item.inventoryAvailableDate &&
                <Col xs={12} className="margin6 onlyBottomMargin">
                  <Link
                    to={`shipByModal/${item.deviceSkuId}`}
                    className="link fontSize_1_3 color_orange"
                    role="link"
                    analyticstrack="ship-by-modal"
                  >{item.inventoryAvailableDate}
                  </Link>
                </Col>
              }

              <Col xs={8}>
                <h3 className="fontSize_1_3">{item.deviceManufactureName} <span
                  dangerouslySetInnerHTML={{ __html: item.deviceProductDisplayName }}
                />
                </h3>
                {item.humCarDetails &&
                  <p className="fontSize_1_3 color_gray_six margin6 onlyBottomMargin" >
                    <span className="">{item.humCarDetails.year}</span>
                    <span className="pad3  onlyLeftPad">{item.humCarDetails.make}</span>
                    <span className="pad3  onlyLeftPad">{item.humCarDetails.model}</span>
                    <span className="pad3  onlyLeftPad">-</span>
                    <span className="pad3  onlyLeftPad"> {item.humCarDetails.color}</span>
                  </p>
                }
                {item.humCarDetails === null &&
                  <p className="fontSize_1_3 color_gray_six margin6 onlyBottomMargin">
                    {item.colorName !== null && item.colorName} {(item.colorName && item.capacity) ? ',' : ''} {item.capacity !== null && item.capacity}
                  </p>
                }
                {(item.flow && !item.portIn) &&
                  <p className="fontSize_1_3 texAlignCenter margin6 onlyBottomMargin">
                    {(item.flow === 'AAL' || item.flow === 'NSO') ? this.props.CQLabel.get('OD_CART_NEW_SERVICE') : this.props.CQLabel.get('OD_CART_UPGRADING')}
                  </p>
                }
                <p className="fontSize_1_3 margin6 onlyBottomMargin texAlignCenter">{item.displayMtn}</p>

                {(item.bicOfferApplied && item.bicMessage !== null && item.bicMessagetooltip !== null) &&
                  <Link
                    to={`bicOfferDetails/${item.deviceSkuId}`}
                    className="fontSize_1_3 margin6 onlyBottomMargin displayBlock link"
                    role="link"
                    analyticstrack="bic-offer-details"
                  >See offer details
                  </Link>}
                {item.devicePromotionList &&
                  item.devicePromotionList.map((pItem, pIndex) => (
                    <div
                      className="fontSize_1 color_gray_six textTransLowercase margin6 onlyBottomMargin"
                      key={pIndex}
                    >{pItem.promotionalMessage}
                    </div>
                  ))
                }
                {item.numberShareDevice &&
                  <div className="margin6 onlyBottomMargin">
                    <p className="pad6 onlyRightPad">Sharing: <span>{item.numberSharedMtn}</span>{(item.deviceNickName !== null && item.numberSharedMtn !== null) && ', '}<span dangerouslySetInnerHTML={{ __html: item.deviceNickName }} /></p>
                  </div>
                }
                {(item.totalNumberShareExtension !== null && item.totalNumberShareExtension > 0) && <p className="margin6 onlyBottomMargin">{item.totalNumberShareExtension} {this.props.CQLabel.get('OD_CART_NUM_SHARE_EXTENSION')}</p>}
                {item.devicePromotionList.map((promo) => (
                  (promo.promoAmount !== null && parseFloat(promo.promoAmount, 10) > 0) &&
                  <Row className="margin6 onlyBottomMargin">
                    <Col xs={8} className="fontSize_1_3 noSidePad">
                      {promo.isUpgradeFeeWaivedOffer
                        ? 'Upgrade fee waived'
                        : this.props.CQLabel.get('OD_CART_DISCOUNT_APPLIED_TEXT')}
                    </Col>
                    <Col xs={4} className="textAlignRight fontSize_1_3">
                      {promo.isUpgradeFeeWaivedOffer ?
                        <span>
                          <span>${item.upgradeFee}</span>
                          <span className="textDecLineThrough block color_gray_six">${item.originalUpgradeFee}</span>
                        </span> : `$${promo.promoAmount}`}
                    </Col>
                  </Row>

                ))}
                {(item.sbdOffer &&
                  (typeof item.sbdOffer.promoBadgeMessages !== 'undefined'
                    && item.sbdOffer.promoBadgeMessages !== null
                    && item.sbdOffer.promoBadgeMessages.length > 0))
                  && item.sbdOffer.bicBogoType === ('BICD' || 'BICT') &&
                  <div className="bold color_blue">
                    <span dangerouslySetInnerHTML={{ __html: item.sbdOffer.promoBadgeMessages[0].badgeText }} />
                    {item.sbdOffer.promoBadgeMessages[0].badgeToolTip &&
                      <ToolTip
                        id="upgradeFee-tooltip"
                        className="margin3 onlyLeftMargin displayInlineBlock"
                        ariaLabel="Upgrade fee information tooltip"
                        text={item.sbdOffer.promoBadgeMessages[0].badgeToolTip}
                        noRenderHTML
                      />}
                  </div>
                }

                {item.promoDetails &&
                  <div className="bold color_blue fontSize_2 pad12 noSidePad">
                    <span>
                      {item.promoDetails.promoMessage && item.promoDetails.promoMessage}
                    </span>
                    {item.promoDetails.promoTooltipMessage &&
                      <ToolTip
                        id="upgradeFee-tooltip"
                        className="margin3 onlyLeftMargin displayInlineBlock color_blue"
                        ariaLabel="Upgrade fee information tooltip"
                        text={item.promoDetails.promoTooltipMessage}
                      />
                    }
                  </div>
                }

                {(item.flow === 'AAL' && item.editNPANXXButton) &&
                  <a
                    aria-label="Choose new number"
                    role="button"
                    className="button primary small width70 margin12 noSideMargin"
                    analyticstrack="choose-new-number"
                    href={`${item.editNPANXXRedirect}?commerceItemId=${item.commerceItemId}`}
                  >
                    {this.props.CQLabel.get('OD_CART_CHOOSE_NUMBER_CTA')}
                  </a>
                }

                {(item.flow === 'NSO') && <div className="fontSize_1_3 pad6 noSidePad">Device ID ending in {item.displayImeiId}</div>}
                {(item.flow !== 'NSO') &&
                  <button
                    aria-label="Edit current device"
                    role="button"
                    className="button secondary small margin24 onlyRightMargin"
                    analyticstrack="edit-device-from-cart"
                    onClick={(event) => {
                      this.editItem(event, item.editDeviceUrl);
                    }}
                  >
                    {this.props.CQLabel.get('OD_CART_MAIN_EDIT_CTA')}
                  </button>
                }
                <a
                  href="#"
                  role="button"
                  aria-label="Remove current device"
                  onClick={this.removeItem.bind(this, { commerceItemId: item.commerceItemId, flow: item.flow, mtn: item.mtn })}
                  className="link"
                  data-commerceid={item.commerceItemId}
                  analyticstrack="remove-device-from-cart"
                >{this.props.CQLabel.get('OD_CART__MAIN_REMOVE_CTA')}
                </a>
              </Col>
              <Col xs={4} className="textAlignRight">
                <CartDeviceImage
                  imageUrl={item.deviceImageUrl}
                  imageAlt={`${item.deviceProductDisplayName} Image`}
                />
              </Col>
            </Row>

            {item.simDetails &&
              <Row className="noSideMargin pad24 noBottomPad" >
                <Col xs={12} className="noSidePad">
                  <HorizontalRule y={1} margin="0 8px" color="#D8DADA" />
                  <Row className="noSideMargin pad32 noSidePad">

                    <Col xs={6}>
                      <h3 className="h5">
                        {item.simDetails.newSim && <span className="fontSize_4">Free</span>}
                        <span
                          className="margin6 noSideMargin block"
                          dangerouslySetInnerHTML={{ __html: item.simDetails.displayName }}
                        />
                      </h3>
                      <p>For Device ID ending in {item.displayImeiId}</p>
                    </Col>
                    <Col xs={6} className="textAlignRight">
                      <CartDeviceImage
                        imageUrl={item.simDetails.imageUrl}
                        imageAlt={`${item.simDetails.displayName}`}
                        isSim
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            }
            <Row className="noSideMargin pad24 noBottomPad" >
              <Col xs={12} className="noTopMargin" >
                {cpc && lineLevelOpted && plans.items.map((plan) => (plan.planCommerceItemId === item.planCommerceItemId &&
                  <div>
                    <HorizontalRule y={1} margin="16px 0" color="#D8DADA" />
                    <CartPlanDetails changePlanUrl={item.changePlanUrl} inline inlinePlan={[plan]} lineLevelOpted={lineLevelOpted} />
                  </div>
                ))}
              </Col>
            </Row>
            <Row className="noSideMargin">
              <Col xs={12}>
                {item.devicePromotionList.map((devicePromo, idx) => (
                  (devicePromo.promoBadgeMessages && devicePromo.promoBadgeMessages.size > 0) &&
                  <PromoBadge key={idx} animated>
                    <span>
                      {devicePromo.promoBadgeMessages[0].badgeText}
                      {(devicePromo.promoContentText !== null) &&
                        <A
                          role="button"
                          aria-label="View Promo Details"
                          className="margin6 link"
                          onClick={() => { this.props.history.push('/promoModal/promo/' + i); }}
                          analyticstrack="view-promo-details"
                        >
                          {this.props.CQLabel.get('OD_CART_VIEW_DETAILS_TEXT')}
                        </A>}
                    </span>
                  </PromoBadge>))
                }
                {(item.sbdOffer &&
                  (typeof item.sbdOffer.promoBadgeMessages !== 'undefined'
                    && item.sbdOffer.promoBadgeMessages !== null
                    && item.sbdOffer.promoBadgeMessages.length > 0))
                  && item.sbdOffer.bicBogoType !== ('BICD' || 'BICT') &&
                  <PromoBadge animated>
                    <span dangerouslySetInnerHTML={{ __html: item.sbdOffer.promoBadgeMessages[0].badgeText }} />
                    <A
                      role="button"
                      aria-label="View Promo Details"
                      className="margin6 link_white"
                      onClick={() => { this.props.history.push('/promoModal/sbdPromo/' + i); }}
                      analyticstrack="view-promo-details"
                    >
                      {this.props.CQLabel.get('OD_CART_SEE_DETAILS_TEXT')}
                    </A>
                  </PromoBadge>
                }
              </Col>

            </Row>
            <Row className="noSideMargin pad24 onlySidePad">
              <Col xs={12}>
                <HorizontalRule y={1} margin="0" color="#D8DADA" />
              </Col>
            </Row>
          </div>
        ))}
        {plans &&
          (
            <div>
              {cpc && !lineLevelOpted &&
                <Row className="noSideMargin pad24 noBottomPad" >
                  <Col xs={12} className="noTopMargin" >
                    <CartPlanDetails lineLevelOpted={lineLevelOpted} />
                  </Col>
                </Row>
              }
              {cpc && lineLevelOpted && (plans.existingDevices && plans.existingDevices.length > 0) &&
                plans.existingDevices.map((device) => plans.items.map((plan) => (plan.planCommerceItemId === device.planCommerceItemId &&
                  <Row className="noSideMargin pad24 margin36 noBottomMargin noBottomPad" >
                    <Col xs={12} className="noTopMargin" >
                      <h3 dangerouslySetInnerHTML={{ __html: device.nickName }} />
                      <HorizontalRule y={1} margin="16px 0" />
                      <CartPlanDetails changePlanUrl={device.changePlanUrl} inline inlinePlan={[plan]} lineLevelOpted={lineLevelOpted} />
                    </Col>
                  </Row>
                )))
              }
            </div>
          )
        }
        {(accessoriesBundle && accessoriesBundle.length > 0) && <div className="margin36 onlyTopMargin"><AccessoryBundleDetails accessoriesBundle={accessoriesBundle} CQLabel={this.props.CQLabel} removeAccessoryBundle={this.removeAccessoryBundle} /></div>}
        {accessories && <div className="margin36 onlyTopMargin"><AccessoryDetails accessories={accessories} editItem={this.editItem} CQLabel={this.props.CQLabel} removeAccessory={this.removeAccessory} isAgentSite={isAgentSite} /></div>}
      </div>
    );
  }
}
CartDeviceDetails.propTypes = {
  items: PropTypes.object,
  accessories: PropTypes.array,
  accessoriesBundle: PropTypes.array,
  CQLabel: PropTypes.object,
  CQError: PropTypes.object,
  notification: PropTypes.object,
  showPreOrderMsg: PropTypes.bool,
  showErrorNotification: PropTypes.func,
  removeDevice: PropTypes.func,
  plans: PropTypes.object,
  cpc: PropTypes.bool,
  showInfoNotification: PropTypes.func,
  clearCartMessage: PropTypes.func,
  cartMessages: PropTypes.object,
  cartReadyforCheckout: PropTypes.bool,
  clearCart: PropTypes.func,
  removeAccessoryBundleItem: PropTypes.func,
  removeAccessoryItem: PropTypes.func,
  standaloneAccessories: PropTypes.bool,
  history: PropTypes.any,
  lineLevelOpted: PropTypes.bool,
  // cartItemCount: PropTypes.number,
  // instantTradeInDevicesCount: PropTypes.number,
  showHeadsUpMsg: PropTypes.bool,
  isAgentSite: PropTypes.bool,
};
