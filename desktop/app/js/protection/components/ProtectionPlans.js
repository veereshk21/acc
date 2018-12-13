import { Col, Row } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Anchor from './../../common/A/A';
import AsyncComponent from './../../common/AsyncComponent';
import RadioButton from '../../common/RadioButton/index';

const TMPMultiDeviceDropdDown = AsyncComponent(() => import('./TMPMultiDeviceDropdDown'));
const SingDeviceProtection = AsyncComponent(() => import('./SingDeviceProtection'));
const AppleCare = AsyncComponent(() => import('./AppleCare'));
const AccessoryBundle = AsyncComponent(() => import('./AccessoryBundle.js'));

const DeviceProtectionDetails = AsyncComponent(() => import('../components/DeviceProtectionDetails'));
const AddTotalMobileProtectionModal = AsyncComponent(() => import('../components/addTotalMobileProtectionModal'));
const RemoveTotalMobileProtectionModal = AsyncComponent(() => import('../components/removeTotalMobileProtectionModal'));
const IneligibleModal = AsyncComponent(() => import('./IneligibleModal'));

class ProtectionPlans extends Component {
  constructor(props) {
    super(props);
    const preSelectedItem = props.protectionPlans.find((item) => item.preSelected);
    this.state = {
      showAllPlans: false,
      selectedOption:
        typeof preSelectedItem !== typeof undefined
          ? preSelectedItem.sfoSkuId
          : null,
      showDetails: false,
      showAddProtectionModal: false,
      showRemoveProtectionModal: false,
      selectedPlanDetails:
        typeof preSelectedItem !== typeof undefined
          ? preSelectedItem
          : {},
      prevSelectedProtectionOption: {},
      presentSelectedProtectionDetails: {},
      prevSelectedProtectionDetails: {},
      selectedBundleDetails: props.bundleItemInCart ? { displayName: props.bundleItemInCart.displayName, skuId: props.bundleItemInCart.skuId } : null,
      selectedAppleCareOpt: (this.props.appleCare && this.props.appleCare.incart) ? this.props.appleCare.skuid : 'None',
      appleCareSelected: (this.props.appleCare && this.props.appleCare.incart) ? this.props.appleCare : 'None',
      vzMDSelected: preSelectedItem && preSelectedItem.vzMdPlan,
      tmpMDB2BSelected: preSelectedItem && preSelectedItem.tmpB2BMdPlan,
      showIneligibleModal: false,
    };
    this.toggleView = this.toggleView.bind(this);
    this.closeTcModal = this.closeTcModal.bind(this);
    this.onGotoPrevTabHandler = this.onGotoPrevTabHandler.bind(this);
    this.submitProtectionHandler = this.submitProtectionHandler.bind(this);
    this._appleCareOnChange = this._appleCareOnChange.bind(this);
  }
  componentDidMount() {
    const preSelectedItem = this.props.protectionPlans.find((item) => item.preSelected);
    if (this.props.tapExist || (preSelectedItem && preSelectedItem.tmpMdPlan)) {
      this.setDefaultTapSelections();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.triggerSeeDetailsOverlay !== prevProps.triggerSeeDetailsOverlay) {
      this.tiggerIneligibleOvelay();
    }
  }

  onClaimSelection(e) {
    // In case of TMP MD and user changes the claim option
    const tmpMdPlanObj = this.state.selectedPlanDetails;
    tmpMdPlanObj.quantity = e.target.value;
    tmpMdPlanObj.claimsSkuId = this.state.selectedPlanDetails.additionalTapList.filter((claim) => claim.devices === e.target.value)[0].skuId;
    tmpMdPlanObj.additionalTAPFeatureAvailable = this.state.selectedPlanDetails.additionalTapList.filter((claim) => claim.devices === e.target.value)[0].additionalTAPFeatureAvailable;
    this.setState({ selectedPlanDetails: tmpMdPlanObj });
  }

  onGotoPrevTabHandler() {
    // history.back();
    window.history.back();
  }

  onShowAllProtectionClickHandler(e) {
    e.preventDefault();
    const showAllPlans = !this.state.showAllPlans;
    this.setState({ showAllPlans });
  }

  setDefaultTapSelections() {
    let item = this.state.selectedPlanDetails;
    const claimList = this.getClaimsList(item);
    const preSelectedClaim = claimList ? claimList.filter((claim) => claim.preSelected === true) : [];
    let selectedClaim = claimList ? claimList.filter((claim) => claim.additionalTAPFeatureAvailable === true) : [];
    if (preSelectedClaim.length > 0) {
      selectedClaim = preSelectedClaim;
    }
    if (selectedClaim.length) {
      item = Object.assign({}, item, { claimsSkuId: selectedClaim[0].skuId, quantity: selectedClaim[0].devices, additionalTAPFeatureAvailable: selectedClaim[0].additionalTAPFeatureAvailable });
    } else if (!selectedClaim.length && item.additionalTapList) {
      item = Object.assign({}, item, { claimsSkuId: item.additionalTapList[0].skuId, quantity: item.additionalTapList[0].devices, additionalTAPFeatureAvailable: item.additionalTapList[0].additionalTAPFeatureAvailable });
    }
    // eslint-disable-next-line
    (this.state.selectedOption === item.sfoSkuId) ? this.setState({ selectedPlanDetails: item }) : this.setState({ selectedPlanDetails: this.state.prevSelectedProtectionDetails });
    // To set default value in dropdown
    this.props.initialize({
      [`claims-${item.sfoSkuId}`]: item.quantity,
    });
  }

  setTmpMdStates(obj) {
    // In case of TMP MD
    const prevSelected = this.state.selectedPlanDetails;

    if (obj.tmpMdPlan || obj.vzMdPlan) {
      this.setState({ showAddProtectionModal: true, vzMDSelected: obj.vzMdPlan, tmpMDB2BSelected: obj.tmpB2BMdPlan });
    } else if (prevSelected.tmpMdPlan || prevSelected.vzMdPlan) {
      this.setState({ showRemoveProtectionModal: true });
    }
  }

  getClaimsList(item) {
    // In case of TMP MD- claims Drop down needs to be displayed
    if (item.additionalTapList) {
      item.additionalTapList.forEach((claim) => {
        claim.label = claim.devices + ' Devices, ' + claim.claims + ' Claims for - ' + (claim.price !== 'Included' ? '$' : '') + claim.price;  // eslint-disable-line
        claim.value = claim.devices; // eslint-disable-line
      });
    }
    return item.additionalTapList;
  }

  getLinkStatus = () => {
    const {
      protectionTypes, tapExist, vzProtectEnabled, vzProtectState,
    } = this.props;
    return ((tapExist && !vzProtectEnabled && protectionTypes.multi.length > 1) || (!tapExist && ((protectionTypes.multi && protectionTypes.multi.length > 1) || protectionTypes.single.length > 2)) || ((tapExist && vzProtectEnabled && ((vzProtectState === 'AL' && protectionTypes.multi.length > 2) || (vzProtectState !== 'AL' && protectionTypes.multi.length > 1)))) || ((!tapExist && vzProtectEnabled && ((vzProtectState === 'AL' && protectionTypes.single.length > 3) || (vzProtectState !== 'AL' && protectionTypes.single.length > 2)))));
  }

  tiggerIneligibleOvelay() {
    if (typeof (document.getElementById('seeDetails')) !== 'undefined' && document.getElementById('seeDetails')) {
      document.getElementById('seeDetails').addEventListener('click', () => { this.setState({ showIneligibleModal: true }); });
    }
  }

  pushAppleCareRequest(requestParams) {
    const { appleCare } = this.props;
    let accessoriesParams = {};
    //  construction of apple care request params
    if (this.props.appleCare) {
      accessoriesParams = {
        action: 'add',
        accQty: '1',
        accName: appleCare.name,
        accProdId: appleCare.productid,
        accSkuId: appleCare.skuid,
        incart: appleCare.incart,
        commerceItemId: appleCare.commerceItemId,
      };
      accessoriesParams.action = 'add';
      switch (this.props.appleCare.incart) { // true/false
        case true:
          if (this.state.appleCareSelected === 'None') {
            accessoriesParams.action = 'remove';
          } /* else {
          } */
          break;
        case false:
          if (this.state.appleCareSelected === 'None') {
            accessoriesParams.action = 'remove';
          } /* else {
          } */
          break;
        default:
          break;
      }
      requestParams.accessories.push(accessoriesParams);
    }
  }

  pushBundleBuilderRequest(requestParams) {
    let accessoriesParams = {};
    // construction of accessories bundle requirest params
    if (this.props.bundleItemInCart) {
      if (!this.state.selectedBundleDetails || (this.state.selectedBundleDetails && (this.state.selectedBundleDetails.skuId !== this.props.bundleItemInCart.skuId))) {
        accessoriesParams = {
          action: 'remove',
          accQty: '1',
          accName: this.props.bundleItemInCart.displayName,
          accProdId: this.props.bundleItemInCart.skuId,
          accSkuId: this.props.bundleItemInCart.skuId,
          incart: true,
          commerceItemId: this.props.bundleItemInCart.commerceItemId,
        };
        requestParams.accessories.push(accessoriesParams);
      }
      if (this.state.selectedBundleDetails && (this.state.selectedBundleDetails.skuId !== this.props.bundleItemInCart.skuId)) {
        accessoriesParams = {
          action: 'add',
          accQty: '1',
          accName: this.state.selectedBundleDetails.displayName,
          accProdId: this.state.selectedBundleDetails.skuId,
          accSkuId: this.state.selectedBundleDetails.skuId,
          incart: false,
          commerceItemId: '',
        };
        requestParams.accessories.push(accessoriesParams);
      }
    } else if (this.state.selectedBundleDetails && this.state.selectedBundleDetails.skuId) {
      accessoriesParams = {
        action: 'add',
        accQty: '1',
        accName: this.state.selectedBundleDetails.displayName,
        accProdId: this.state.selectedBundleDetails.skuId,
        accSkuId: this.state.selectedBundleDetails.skuId,
        incart: false,
        commerceItemId: '',
      };
      requestParams.accessories.push(accessoriesParams);
    }
  }

  submitProtectionHandler() {
    const requestParams = {
      additionalTAPFeatureAvailable: this.state.selectedPlanDetails.additionalTAPFeatureAvailable,
      quantity: this.state.selectedPlanDetails.quantity,
      featureSkuId: this.state.selectedOption ? this.state.selectedOption : '',
      featureType: this.state.selectedPlanDetails.tmpMdPlan ? 'SPO' : 'INSURANCE',
      commerceItemId: this.props.commerceItemId ? this.props.commerceItemId : '',
      deviceSkuId: this.props.deviceSkuId ? this.props.deviceSkuId : '',
      existingFeature: false,
      deviceProtectionRequired: this.props.deviceProtectionRequired,
      fromEditDeviceForEUP: this.props.fromEditDeviceForEUP,
      mtn: this.props.mtn ? this.props.mtn : '',
      tapExist: this.props.tapExist,
      tapEligible: this.props.tapEligible,
      editProtection: this.props.editProtection ? this.props.editProtection : false,
      claimsSkuId: this.state.selectedPlanDetails.claimsSkuId,
      isTmpMdPlan: this.state.selectedPlanDetails.tmpMdPlan,
      sfoSORId: this.state.selectedPlanDetails.sfoSORId,
      editCart: this.props.editCart,
      bundleSkuId: this.state.selectedBundleDetails && this.state.selectedBundleDetails.skuId,
      accessories: [],
    };
    this.pushAppleCareRequest(requestParams);
    this.pushBundleBuilderRequest(requestParams);

    this.props.addSelectedProtection(
      this.props.saveUrl,
      requestParams,
      this.props.legacyPlanFlag,
      this.props.cpcskip
    );
  }

  addTotalMobileProtection = (data) => {
    this.setState({ showAddProtectionModal: false });
    if (data === 'REJECT') {
      this.setState({ selectedOption: this.state.prevSelectedProtectionOption, selectedPlanDetails: this.state.prevSelectedProtectionDetails });
    } else {
      this.setState({ selectedPlanDetails: this.state.presentSelectedProtectionDetails });
    }
  };

  removeTotalMobileProtection = (data) => {
    this.setState({ showRemoveProtectionModal: false });
    if (data === 'REJECT') {
      this.setState({ selectedOption: this.state.prevSelectedProtectionOption, selectedPlanDetails: this.state.prevSelectedProtectionDetails });
    } else {
      this.setState({ selectedPlanDetails: this.state.presentSelectedProtectionDetails });
    }
  };


  _showAllPlans() {
    this.setState({ showAllPlans: true });
  }

  closeTcModal = () => {
    this.setState({ showDetails: false });
  };

  toggleView(event) {
    event.preventDefault();
    this.setState({ showDetails: true });
  }

  _protectionOptionChange = (obj) => {
    const { selectedOption, selectedPlanDetails } = this.state;
    this.setState({
      prevSelectedProtectionOption: selectedOption,
      presentSelectedProtectionDetails: obj,
      prevSelectedProtectionDetails: selectedPlanDetails,
    });
    this.setTmpMdStates(obj);
    this.setState({ selectedOption: obj.sfoSkuId, selectedPlanDetails: obj });
    if (obj.tmpMdPlan) this.setDefaultTapSelections();
  };

  _appleCareOnChange = (obj) => {
    const selectedOpt = (typeof obj === 'object' ? obj.skuid : obj);
    this.setState({
      appleCareSelected: obj,
      selectedAppleCareOpt: selectedOpt,
    });
  };

  renderModals() {
    const { cqContent, inEligibleOverlay, vzMdRestrictedDevice } = this.props;
    let modalHTML;
    if (this.state.showAddProtectionModal) {
      modalHTML = (
        <div>
          <AddTotalMobileProtectionModal
            addTotalMobileProtection={this.addTotalMobileProtection}
            showModal="true"
            cqContent={cqContent}
            vzMDSelected={this.state.vzMDSelected}
            tmpMDB2BSelected={this.state.tmpMDB2BSelected}
            selectedProtection={this.state.selectedPlanDetails}
          />
        </div>);
    } else if (this.state.showRemoveProtectionModal) {
      modalHTML = (
        <div>
          <RemoveTotalMobileProtectionModal
            removeTotalMobileProtection={this.removeTotalMobileProtection}
            showModal="true"
            cqContent={cqContent}
            stateProps={this.state}
            vzMDSelected={this.state.vzMDSelected}
          />
        </div>);
    } else if (this.state.showDetails) {
      modalHTML =
        (<DeviceProtectionDetails
          cqHTML={cqContent.html}
          cqLabel={cqContent.label}
          closeModal={this.closeTcModal}
          showModal="true"
        />);
    } else if (this.state.showIneligibleModal) {
      modalHTML =
        (
          <IneligibleModal
            closeModal={() => this.setState({ showIneligibleModal: false })}
            inEligibleOverlay={inEligibleOverlay}
            vzMdRestrictedDevice={vzMdRestrictedDevice}
          />
        );
    }
    return modalHTML;
  }

  renderClaimsList(claimsObj) {
    // In case of TMP MD- claims Drop down needs to be displayed
    const { item, claimsList } = claimsObj;
    const disableClaim = claimsList && claimsList.filter((claim) => claim.additionalTAPFeatureAvailable === true);
    return (
      item.additionalTapList && (
        <Col xs={12} className="margin20 onlyTopMargin">
          <div className="priceLabel floatNone margin36 onlyLeftMargin">
            <p className="bold margin6 onlyBottomMargin fontSize_5">{this.props.cqContent.label.DT_OD_DEVICE_PROTECTION_ADDL_TEXT}</p>
            <form
              name="claimsForm"
              style={{
                backgroundColor: 'transparent',
                fontSize: '16px',
                display: 'inline-block',
                position: 'relative',
                lineHeight: '24px',
                fontFamily: 'Roboto, sans-serif',
                transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                cursor: 'auto',
              }}
            >
              <div className="tapClaimsDD protection">
                <Field
                  aria-label="Claims"
                  name={`claims-${item.sfoSkuId}`}
                  id="claims"
                  label="Claims"
                  className="claimsSelectDD pad12 noSidePad"
                  disabled={!(this.state.selectedOption === item.sfoSkuId) || (disableClaim.length > 0 && this.props.tapExist)}
                  options={claimsList}
                  component={TMPMultiDeviceDropdDown}
                  onChange={(e) => this.onClaimSelection(e)}
                  analyticstrack="additional-device-TMP-list"
                />
              </div>
            </form>
          </div>
        </Col>
      )
    );
  }

  renderMultiDeviceProtection() {
    const { cqContent, protectionTypes, isVzProtectGAState, vzProtectEnabled, vzProtectState } = this.props;
    const protections = (
      <div className="margin30 onlyBottomMargin">
        <h2 className="margin6 onlyBottomMargin fontSize_7">
          {cqContent.label.DT_OD_PROTECTION_TMP_MD_TITLE}
        </h2>
        <p className="alignLeft margin24 onlyBottomMargin">{cqContent.label.DT_OD_PROTECTION_TMP_MD_SUB_TITLE}</p>
        <Row>
          <Col sm={7} lg={6}>
            {protectionTypes.multi.map((protection, i) => { // eslint-disable-line
              if (this.state.showAllPlans || protection.tmpB2BMdPlan || i === 0 || (vzProtectEnabled && vzProtectState && !isVzProtectGAState)) {
                return (
                  <Row key={protection.index} className="pad12 noSidePad">
                    <Col lg={10} sm={9}>
                      <RadioButton
                        name="protectionOption"
                        id={'protectionRadio_' + protection.index}
                        value={protection.sfoSkuId}
                        containerClassName=" "
                        labelClassName="verticalTop displayInlineBlock pad12 onlyLeftPad width90"
                        checked={protection.sfoSkuId === this.state.selectedOption}
                        onChange={this._protectionOptionChange.bind(this, protection)}
                        analyticstrack="select-TMP-plan-radio"
                      >
                        <div className="fontSize_4">
                          <p tabIndex={protection.index} className="bold fontSize_5">{protection.displayName}</p>
                          <p className="pad6 onlyTopPad" tabIndex={protection.index} dangerouslySetInnerHTML={{ __html: `${protection.introText}` }} />
                        </div>
                      </RadioButton>
                    </Col>
                    <Col lg={2} sm={3}>
                      <p tabIndex={protection.index} className="bold fontSize_5 textRight whiteSpaceNoWrap">
                        {protection.hasEcpdDiscount && <span><span className="textDecLineThrough normal">${protection.wasPrice}</span>&nbsp;&nbsp;</span>}${`${protection.price} ${protection.priceTerm}`}</p>
                    </Col>
                    {this.renderClaimsList({
                      item: protection,
                      claimsList: this.getClaimsList(protection),
                    })}
                  </Row>
                );
              }
            })}
          </Col>
          <Col sm={5} lg={6} className="textAlignCenter">
            <img className="margin18 noSideMargin" src="https://www.verizonwireless.com/omni/d/i/3_Devices_TAP.png" alt="MultiDeviceImg" width="250px" />
          </Col>
        </Row>
      </div>
    );
    return protections;
  }

  render() {
    const { cqContent, tapExist, protectionTypes, bundleData, appleCare, deviceDetails, fewPlans, vzProtectState, vzMdEligible, triggerSeeDetailsOverlay, tapEligible, vzMdPlanAvailable } = this.props;
    const singleDeviceProtProps = { cqContent, protectionTypes, deviceDetails };
    return (
      <div>
        { vzMdPlanAvailable && tapEligible && vzMdEligible === false && !triggerSeeDetailsOverlay && this.props.showIneligible(cqContent.html.DT_OD_DEVICE_PROTECTION_INELIGIBLE_NOTIFICATION) }
        {this.renderModals()}
        <Row className="margin20 noSideMargin">
          <Col xs={9}>
            <h1 className="pad10 noSidePad fontSize_10">
              {cqContent.label.DT_OD_DEVICE_PROTECTION_HEADER}
            </h1>
          </Col>
        </Row>
        {this.props.tmprefreshOptionAvailable &&
          <div className="width100 clearfix pad12 noSidePad background_yellow relative margin20 noSideMargin">
            <span className="width5 font-icon_info_circle margin10 onlySideMargin floatLeft" />
            <span className="width90 floatLeft fontSize_1_3 bold" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_PROTECTION_TMP_REFRESH_AVAILABLE }} />
          </div>
        }
        <Row>
          <Col xs={12}>
            {protectionTypes.multi && this.renderMultiDeviceProtection()}
            {!tapExist && protectionTypes.single && protectionTypes.single.length > 0 && <SingDeviceProtection {...singleDeviceProtProps} selectedProtection={this.state.selectedPlanDetails} showAllPlans={this.state.showAllPlans} selectedOption={this.state.selectedOption} onShowAllProtection={this.onShowAllProtectionClickHandler} onProtectionChange={this._protectionOptionChange} fewPlans={fewPlans} toggleView={this.toggleView} vzProtectState={vzProtectState} />}
            {!this.state.showAllPlans && this.getLinkStatus()
              && (
                <p className="margin20">
                  <a className="margin18 onlyTopMargin displayBlock fontSize_4 color_black textDecUnderline" analyticstrack="show-all-protection-plan-link" onClick={(e) => this.onShowAllProtectionClickHandler(e)} href="">
                    {cqContent.label.DT_OD_DEVICE_PROTECTION_SEE_ALL_PLANS_BTN_TXT}
                  </a>
                </p>
              )
            }
            {this.state.showAllPlans
              && (
                <p className="margin20">
                  <a className="margin18 onlyTopMargin displayBlock fontSize_4 color_black textDecUnderline" analyticstrack="show-all-protection-plan-link" onClick={(e) => this.onShowAllProtectionClickHandler(e)} href="">
                    {cqContent.label.DT_OD_DEVICE_PROTECTION_SEE_LESS_PLANS_BTN_TXT}
                  </a>
                </p>
              )
            }
            <section>
              {appleCare && <AppleCare cqContent={cqContent} appleCare={appleCare} appleCareSelected={this.state.appleCareSelected} selectedAppleCareOpt={this.state.selectedAppleCareOpt} onAppleCareChange={this._appleCareOnChange} />}
              <div>
                {(typeof bundleData !== 'undefined' && bundleData !== null && bundleData.length > 0) && <AccessoryBundle defaultSelection={(this.state.selectedBundleDetails && this.state.selectedBundleDetails.skuId) ? this.state.selectedBundleDetails.skuId : false} bundleData={bundleData} cqContent={cqContent} onBundleSelected={(bundle) => this.setState({ selectedBundleDetails: bundle })} />}
              </div>
            </section>
          </Col>
        </Row>
        <Row className="protectionNav background_white">
          <Col xs={12}>
            {!this.state.selectedOption &&
              <Row>
                <Col sm={12} md={12}>
                  <div className="background_orange color_white pad15 fontSize_4 bold">
                    {cqContent.label.DT_OD_PROTECTION_NOT_SELECTED}
                  </div>
                </Col>
              </Row>
            }
            <div className="margin15 noSideMargin clearfix">
              <button className="button primary" analyticstrack="protection-plan-select-CTA" disabled={this.state.selectedPlanDetails === null || Object.keys(this.state.selectedPlanDetails).length === 0 || (this.props.appleCare && !this.state.appleCareSelected)} onClick={this.submitProtectionHandler}>
                {cqContent.label.DT_OD_DEVICE_PROTECTION_SAVE_BTN_TXT}
              </button>
              <button className="button secondary" analyticstrack="protection-plan-back-CTA" onClick={this.onGotoPrevTabHandler}>
                {cqContent.label.DT_OD_DEVICE_PROTECTION_BACK_BTN}
              </button>
              <Anchor onClick={this.toggleView} analyticstrack="protection-plan-terms-conditions-link" className="fontSize_4 color_black textDecUnderline displayInlineBlock margin15 onlyTopMargin cursorPointer">{cqContent.label.DT_OD_PROTECTION_TC_LINK}</Anchor>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}


export default reduxForm({
  // eslint-disable-line no-class-assign
  form: 'claimsForm',
  enableReinitialize: true,
})(ProtectionPlans);

ProtectionPlans.propTypes = {
  cpcskip: PropTypes.node,
  protectionPlans: PropTypes.array,
  protectionTypes: PropTypes.object,
  fewPlans: PropTypes.array,
  cqContent: PropTypes.object,
  commerceItemId: PropTypes.string,
  deviceSkuId: PropTypes.string,
  legacyPlanFlag: PropTypes.bool,
  editProtection: PropTypes.bool,
  tapExist: PropTypes.bool,
  tapEligible: PropTypes.bool,
  mtn: PropTypes.string,
  addSelectedProtection: PropTypes.func,
  saveUrl: PropTypes.string,
  editCart: PropTypes.bool,
  deviceProtectionRequired: PropTypes.bool,
  fromEditDeviceForEUP: PropTypes.bool,
  tmprefreshOptionAvailable: PropTypes.bool,
  initialize: PropTypes.func,
  bundleData: PropTypes.array,
  deviceDetails: PropTypes.object,
  appleCare: PropTypes.object,
  bundleItemInCart: PropTypes.object,
  isVzProtectGAState: PropTypes.bool,
  vzProtectState: PropTypes.string,
  vzProtectEnabled: PropTypes.bool,
  triggerSeeDetailsOverlay: PropTypes.bool,
  inEligibleOverlay: PropTypes.object,
  vzMdEligible: PropTypes.bool,
  showIneligible: PropTypes.func,
  vzMdRestrictedDevice: PropTypes.func,
  vzMdPlanAvailable: PropTypes.bool,
};
