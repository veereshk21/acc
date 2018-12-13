
import { reduxForm } from 'redux-form/immutable';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

// import Loader from '../../common/Loader/Loader';
// import RadioButton from './../../common/RadioButton';
// import ToolTip from '../../common/ToolTip/index';
import { parsePrice } from './../../common/Helpers';
import AsyncComponent from '../../common/AsyncComponent';
import Modal from '../../common/Modal';

const ToolTip = AsyncComponent(() => import('../../common/ToolTip/index'));
const RadioButton = AsyncComponent(() => import('./../../common/RadioButton'));
const Loader = AsyncComponent(() => import('../../common/Loader/Loader'));

class MDNDetails extends React.Component {
  static propTypes = {
    cqJSON: PropTypes.object,
    mdnDetails: PropTypes.object,
    selectedDevice: PropTypes.number,
    transferUpgrade: PropTypes.object,
    transferUpgradeCall: PropTypes.func,
    redoTransferMdn: PropTypes.func,
    accountLevelInEligibleDetails: PropTypes.object,
    selectedNumber: PropTypes.string,
    // showErrorNotification: PropTypes.func,
    hideNotification: PropTypes.func,
    formData: PropTypes.obj,
    getPromoIndex: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      selectedPromoIndex: null,
      promoDetailsModalVisible: false,
      promoTitle: null,
      promoDescription: null,
    };
    this.addPromo = this.addPromo.bind(this);
  }
  componentDidMount() {
    const { mdnDetails } = this.props;
    if (mdnDetails.get('clickTransferUpgrade') === true) {
      this.props.transferUpgradeCall(mdnDetails.toJS());
    }
  }
  addPromo(index) {
    this.setState({ selectedPromoIndex: index });
    this.props.getPromoIndex(index);
  }

  openPromoDetailsModal = (offer) => {
    this.setState({ promoDetailsModalVisible: true });
    this.setState({ promoTitle: offer.title, promoDescription: offer.description });
  }
  closePromoDetailsModal = () => {
    this.setState({ promoDetailsModalVisible: false });
    this.setState({ promoTitle: null, promoDescription: null });
  }

  render() {
    const mdnDetails = this.props.transferUpgrade ? this.props.transferUpgrade : this.props.mdnDetails.toJS();
    const { cqJSON, accountLevelInEligibleDetails, selectedNumber, hideNotification } = this.props;
    if (selectedNumber) {
      if (mdnDetails.loanInfo && !mdnDetails.loanInfo.displayReturnOption && mdnDetails.loanInfo.deviceMismatchText) {
        window.showMisMatchNotification = mdnDetails.loanInfo.deviceMismatchText;
        // showErrorNotification(mdnDetails.loanInfo.deviceMismatchText); /* DOPMO-18073 */
      } else {
        window.showMisMatchNotification = false;
        hideNotification();
      }
    }

    const isLineLevelEligible = mdnDetails.upgradeEligbile === true || (mdnDetails.inEligibleCode === '08' || mdnDetails.inEligibleCode === '12' || mdnDetails.inEligibleCode === '11' || mdnDetails.inEligibleCode === '10');
    const isAccLevelEligible = (accountLevelInEligibleDetails === null || (accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails && (accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === '12' ||
    accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === '10' ||
    accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === '08' || accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === 'PENDING_SWITCH_ORDER' || accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === 'PENDING_ORDER')) || (accountLevelInEligibleDetails.accountLevelAALInEligibleDetails && (accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === '12' ||
    accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === '10' ||
    accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === '08' || accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === 'PENDING_ORDER' || accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === 'PENDING_SWITCH_ORDER')));
    const upgradeEligbile = isAccLevelEligible && isLineLevelEligible; /* REVERT VZWDS-324 fix for DOPMO-33690 */
    const buyoutRestrictedForEdge = mdnDetails.buyoutRestrictedForEdge;

    let mdnImgUrl = mdnDetails.imageUrl;
    let defaultImgClass = '';

    const { estimatedTradeInValue, tradeinPromoInfo } = mdnDetails;

    if (mdnImgUrl) {
      mdnImgUrl += '&wid=200&hei=200';
    } else {
      mdnImgUrl = '';
      defaultImgClass = ' mtnDefaultImg';
    }
    const isDisabled = (mdnDetails.mtnAddedToTheCart) || !upgradeEligbile || buyoutRestrictedForEdge || (mdnDetails.showTransferUpgrade && mdnDetails.transferUpgradeInProgress) || (mdnDetails.fiveGOrFourGDevice);
    const is5GMtn = (mdnDetails.fiveGOrFourGDevice);
    const selectedMtn = (this.props.formData.toJS() && this.props.formData.toJS().chooseMDN && this.props.formData.toJS().chooseMDN.values && this.props.formData.toJS().chooseMDN.values.mdnSelection) ? this.props.formData.toJS().chooseMDN.values.mdnSelection : null;
    return (

      <div className={'pad10 noSidePad' + (isDisabled && !is5GMtn ? ' background_gray_three' : '')}>
        <Row>
          {this.state.isFetching && <Loader />}
          <Col md={1} xs={1}>
            {!is5GMtn &&
              <RadioButton
                id={'check' + this.props.selectedDevice}
                name="mdnSelection"
                value={mdnDetails.mtn}
                disabled={isDisabled}
                checked={selectedNumber && !isDisabled}
                analyticstrack="select-upgradeDevice-radio"
                onChange={() => this.setState({ selectedPromoIndex: null })}
              />
            }
          </Col>
          <Col md={1} xs={1}>
            <div className="deviceRow_img">
              {(!is5GMtn || mdnDetails.modDevice) &&
              <img className={'' + defaultImgClass} src={mdnImgUrl} srcSet={`${mdnImgUrl} 2x`} alt={mdnDetails.brand + ' Phone'} style={{ width: '100%' }} />
              }
              {(is5GMtn && !mdnDetails.modDevice) &&
              <Row className="bold align5GText topAlign5GText textCenter">5G</Row>
              }
              {(is5GMtn && !mdnDetails.modDevice) &&
                <Row className="bold align5GText textCenter">Home</Row>
              }
            </div>
          </Col>
          <Col md={4} xs={4}>
            <div>
              <div className="fontSize_4 margin12 onlyBottomMargin">
                {(mdnDetails.modDevice && mdnDetails.imei) ? <span>{cqJSON.label.DT_OD_MDN_IMEI_TEXT}{mdnDetails.imei}</span> : <span>{mdnDetails.displayMtn}</span>}
              </div>
              <label id={'labelCheck' + this.props.selectedDevice} className="fontSize_4" htmlFor={'check' + this.props.selectedDevice}>{mdnDetails.nickname}</label>
            </div>
            <div className="fontSize_4">
              <span dangerouslySetInnerHTML={{ __html: mdnDetails.displayDeviceName }} />
            </div>
            {(mdnDetails.showTransferUpgrade && !mdnDetails.transferUpgradeInProgress) &&
              <div className="margin12 onlyTopMargin fontSize_4 bold">
                <span
                  dangerouslySetInnerHTML={{ __html: cqJSON.label.DT_OD_MDN_UPGRADE_INFO_TOOLTIP_LABEL }}
                  className="textDecUnderline cursorPointer"
                  onClick={this.props.transferUpgradeCall.bind(this, mdnDetails)}
                  analyticstrack="select-transferUpgrade-linkCTA"
                  role="button"
                  tabIndex="0"
                  onKeyPress={this.props.transferUpgradeCall.bind(this, mdnDetails)}
                />
                <ToolTip
                  id="transfer-upgrade-tooltip"
                  className="margin3 onlyLeftMargin displayInlineBlock"
                  ariaLabel="transfer upgrade information tooltip"
                  text={cqJSON.label.DT_OD_MDN_UPGRADE_INFO_TOOLTIP_DESCRIPTION}
                  noRenderHTML
                />
              </div>
            }
            {(mdnDetails.showTransferUpgrade && mdnDetails.transferUpgradeInProgress) &&
              <div className="margin12 onlyTopMargin fontSize_4 bold">
                <span
                  dangerouslySetInnerHTML={{ __html: cqJSON.label.DT_OD_MDN_REDO_UPGRADE_INFO_TOOLTIP_LABEL }}
                  className="textDecUnderline cursorPointer"
                  onClick={this.props.redoTransferMdn.bind(this, mdnDetails)}
                  analyticstrack="select-redoTransferUpgrade-linkCTA"
                  role="button"
                  tabIndex="0"
                  onKeyPress={this.props.redoTransferMdn.bind(this, mdnDetails)}
                />
              </div>
            }
            {(!mdnDetails.showTransferUpgrade && mdnDetails.transferUpgradeInProgress && mdnDetails.transferredFromMtn) &&
              <div className="fontSize_4 bold margin12 onlyTopMargin">{cqJSON.label.DT_OD_MDN_UPGRADE_TRANSFER_DESCRIPTION}&nbsp;{mdnDetails.transferredFromMtn}</div>
            }
            {mdnDetails.upgradeMessage && <div className="margin5 onlyTopMargin bold fontSize_3">{mdnDetails.upgradeMessage}</div>}
            {(!mdnDetails.modDevice && mdnDetails.fiveGEligibleMessage) && <div className="margin10 onlyTopMargin bold fontSize_4 color_blue">{mdnDetails.fiveGEligibleMessage}</div>}
            {!mdnDetails.loanInfo ?
              <div>
                {parsePrice(estimatedTradeInValue) > 0 &&
                  <div className="fontSize_4 margin12 onlyTopMargin">
                    <span>{cqJSON.label.DT_OD_MDN_TRADE_IN_TITLE}</span>
                    &nbsp;
                    <span className="bold">${estimatedTradeInValue}</span>
                  </div>
                }
                {mdnDetails.myOffersPromoText &&
                  <div className="margin12 onlyTopMargin fontSize_4 bold">
                    <span dangerouslySetInnerHTML={{ __html: mdnDetails.myOffersPromoText }} />
                  </div>
                }
                {tradeinPromoInfo && <div className="margin12 onlyTopMargin">
                  <span className="bold">{tradeinPromoInfo.promoMessage}</span>
                  <ToolTip
                    className="margin3 onlyLeftMargin displayInline"
                    ariaLabel="Trade in promo legal tooltip"
                    text={tradeinPromoInfo.legalText}
                    noRenderHTML
                  />
                </div>}
              </div> :
              <div md={4} xs={4} className="verticalMiddle">
                {mdnDetails.loanInfo.returnOptionAmt &&
                  <div className="fontSize_4">
                    <span>{cqJSON.label.DT_OD_MDN_RETURN_AMOUNT_TEXT}&nbsp;</span>
                    <span className="bold">{mdnDetails.loanInfo.returnOptionAmt}</span>
                  </div>
                }
                {mdnDetails.loanInfo.keepOptionAmt &&
                  <div className="fontSize_4 margin12 onlyTopMargin">
                    <span>{cqJSON.label.DT_OD_MDN_KEEP_AMOUNT_TEXT}&nbsp;</span>
                    <span className="bold">{mdnDetails.loanInfo.keepOptionAmt}</span>
                  </div>
                }
              </div>
            }
          </Col>
          <Col md={4} xs={2}>
            <Row>
              {mdnDetails.myOffers && mdnDetails.myOffers.offers && mdnDetails.myOffers.offers.map((offer, index) =>
                <Col md={12} xs={12} key={offer.id} className="margin12 onlyBottomMargin">
                  <div className="pad20" style={{ border: '1px solid #000' }}>
                    <div className="fontSize_4 bold"> {offer.title}</div>
                    <a className="textDecUnderline cursorPointer margin10 noSideMargin block" onClick={() => this.openPromoDetailsModal(offer)}>
                    See details </a>
                    {selectedMtn === mdnDetails.mtn ?
                      <div>{(this.state.selectedPromoIndex !== index) ?
                        <button
                          className={`button secondary margin10 noSideMargin ${(selectedMtn === mdnDetails.mtn) ? '' : 'disabled'}`}
                          style={{ padding: '0 10px', height: '30px' }}
                          disabled=""
                          onClick={() => this.addPromo(index)}
                          analyticstrack="placeOrder-CTA"
                        >
                          Add this promo
                        </button> :
                        <div className="margin20 onlyTopMargin clearfix pad20 onlyBottomPad"><div className="floatLeft icon-checkmarkComplete" /> <div className="floatLeft" style={{ height: '25px' }}> Added</div> </div>}
                      </div> :
                      <button
                        className={`button secondary margin12 onlyTopMargin ${(selectedMtn === mdnDetails.mtn) ? '' : 'disabled'}`}
                        style={{ padding: '0 10px', height: '30px' }}
                        disabled=""
                        onClick={() => this.addPromo(index)}
                        analyticstrack="placeOrder-CTA"
                      >
                        Add this promo
                      </button> }
                  </div>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
        <Modal
          mounted={this.state.promoDetailsModalVisible}
          closeFn={this.closePromoDetailsModal}
          showCloseX
          underlayColor="rgba(0,0,0,0.8)"
          style={{ maxWidth: 350 }}
        >
          <div id="FreeShippingModal" className="pad20">
            <h2 className="fontSize_7 height160 largeBorder_black onlyBottomBorder lineHeight18">{this.state.promoTitle}</h2>
            <div className="margin6 onlyTopMargin height96">{this.state.promoDescription}</div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default reduxForm({
  form: 'chooseMDN',
  // validate,
})(MDNDetails);
