import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import AsyncComponent from '../../../../common/AsyncComponent';

const Modal = AsyncComponent(() => import('../../../../common/Modal'));
const BlockRadio = AsyncComponent(() => import('../../../../common/BlockRadio/index'));
const RadioButton = AsyncComponent(() => import('../../../../common/RadioButton'));
const Loader = AsyncComponent(() => import('../../../../common/Loader/Loader'));
const RemoveProtection = AsyncComponent(() => import('./removeProtection'));
const ProtectionOptionsMD = AsyncComponent(() => import('./protectionOptionsMD'));

class Protection extends Component {
  constructor(props) {
    super(props);
    this.confirmSelection = this.confirmSelection.bind(this);
    this.closeProtectionModal = this.closeProtectionModal.bind(this);
    this.handleDevicesCountChange = this.handleDevicesCountChange.bind(this);
    this.displayProtectionList = this.displayProtectionList.bind(this);
    this.declineProtection = this.declineProtection.bind(this);
    this.state = {
      showAllPlans: false,
      showChangeModal: false,
      showRemoveModal: false,
      planSelection: true,
      claimsSkuId: '',
      action: (props.appleCare && props.appleCare.incart) ? 'add' : 'remove',
      appleCareSelected: !(props.preSelectedProtection && props.preSelectedProtection.appleCareEnabled),
      selectedSkuId: !isEmpty(props.preSelectedProtection) ? props.preSelectedProtection.sfoSkuId : null,
      selectedChangePlanList: props.protectionChangeList && props.protectionChangeList.mtnDeviceInfo.equipmentProtectionList && (props.protectionChangeList.mtnDeviceInfo.equipmentProtectionList.filter((list) => list.preSelected)[0] || props.protectionChangeList.mtnDeviceInfo.equipmentProtectionList[0]),
    };
  }
  componentWillReceiveProps(nextProps) {
    const selectedProtection = nextProps.protectionChangeList && nextProps.protectionChangeList.mtnDeviceInfo.equipmentProtectionList && (nextProps.protectionChangeList.mtnDeviceInfo.equipmentProtectionList.filter((list) => list.preSelected)[0] || nextProps.protectionChangeList.mtnDeviceInfo.equipmentProtectionList[0]);
    this.setState({
      devices: selectedProtection && selectedProtection.additionalTapList && selectedProtection.additionalTapList.filter((claim) => claim.preSelected === true)[0].devices,
      showChangeModal: nextProps.protectionModalStatus,
      // showChangeModal: nextProps.showChangeModal,
      showRemoveModal: nextProps.showRemoveModal,
      selectedChangePlanList: selectedProtection,
      selectedSkuId: selectedProtection && selectedProtection.sfoSkuId,
    });
  }

  onShowAllProtectionClickHandler(e) {
    e.preventDefault();
    const showAllPlans = !this.state.showAllPlans;
    this.setState({ showAllPlans });
  }

  getLinkStatus = () => {
    const {
      protectionTypes, tapExist, vzProtectEnabled, vzProtectState,
    } = this.props;
    return ((tapExist && !vzProtectEnabled && (protectionTypes && protectionTypes.multi && protectionTypes.multi.length > 1)) || (!tapExist && ((protectionTypes && protectionTypes.multi && protectionTypes.multi.length > 1) || (protectionTypes && protectionTypes.single && protectionTypes.single.length > 2))) || ((tapExist && vzProtectEnabled && ((vzProtectState === 'AL' && (protectionTypes && protectionTypes.multi && protectionTypes.multi.length > 2)) || (vzProtectState !== 'AL' && (protectionTypes && protectionTypes.multi && protectionTypes.multi.length > 1))))) || ((!tapExist && vzProtectEnabled && ((vzProtectState === 'AL' && (protectionTypes && protectionTypes.single && protectionTypes.single.length > 3)) || (vzProtectState !== 'AL' && (protectionTypes && protectionTypes.single && protectionTypes.single.length > 2))))));
  }

  protectionSelection(list) {
    const protectionChangeItem = this.props.protectionChangeList && this.props.protectionChangeList.mtnDeviceInfo.equipmentProtectionList;
    if (protectionChangeItem) {
      protectionChangeItem.map((item) => {
        let obj = {};
        obj = item;
        obj.preSelected = false;
        if (item.sfoSkuId === list.sfoSkuId) {
          obj.preSelected = true;
        }
        return obj;
      });
    }
  }
  handleAppleCare = (e) => {
    if (e.target.id === 'noAppleCare') {
      this.setState({ action: 'remove' });
    } else if (e.target.id === 'addAppleCare') {
      this.setState({ action: 'add' });
    }
  }
  closeProtectionModal = () => {
    this.props.updateState({ showChangeModal: false, showRemoveModal: false });
    this.setState({ planSelection: true });
    this.props.showProtectionModal(false);
  }
  handleDevicesCountChange = (e, index) => {
    const { additionalTapList } = this.state.selectedChangePlanList;
    this.setState({
      devices: e.target.value,
      claimsSkuId: additionalTapList && additionalTapList.filter((claim) => claim.devices === e.target.value)[0].skuId,
      selectedClaimIndex: index,
    });
  }
  confirmSelection() {
    const { commerceItemId, deviceSkuId, editProtection, deviceProtectionRequired, fromEditDeviceForEUP, editCart } = this.props.protectionChangeList;
    const { mtn, tapExist, tapEligible } = this.props.protectionChangeList.mtnDeviceInfo;
    
    if (this.state.appleCareSelected || !(this.props.preSelectedProtection && this.props.preSelectedProtection.appleCareEnabled)) {
      this.props.updateState({ showChangeModal: false, showRemoveModal: false });
      this.props.showProtectionModal(false);
      this.setState({ planSelection: true, appleCareSelected: false });
      if (!this.state.selectedChangePlanList) {
        this.setState({ selectedChangePlanList: tapExist ? this.props.protectionTypes.multi && this.props.protectionTypes.multi[0] : this.props.protectionTypes.single && this.props.protectionTypes.single[0] });
      }
      const tapSelection = (this.state.selectedChangePlanList && this.state.selectedChangePlanList.additionalTapList) ? this.state.selectedChangePlanList.additionalTapList.filter((tap) => tap.preSelected) : '';
      let selectedClaim = this.state.selectedChangePlanList && this.state.selectedChangePlanList.additionalTapList ? this.state.selectedChangePlanList.additionalTapList.filter((claim) => claim.additionalTAPFeatureAvailable === true) : [];

      const accessories = [];
      let accparams = {};
      if (this.props.appleCare) {
        accparams = {
          action: this.state.action,
          accQty: '1',
          accName: this.props.appleCare.name,
          accProdId: this.props.appleCare.productid,
          accSkuId: this.props.appleCare.skuid,
          incart: this.props.appleCare.incart,
          commerceItemId: this.props.appleCare.commerceItemId,
        };
        accessories.push(accparams);
      }
      if (tapSelection.length > 0) {
        selectedClaim = tapSelection;
      }
      const claimsExists = this.state.selectedChangePlanList && this.state.selectedChangePlanList.sorSfoType === 'SPO' && this.state.selectedClaimIndex === this.state.selectedChangePlanList.index;
      const claimsSkuId = (this.state.claimsSkuId && claimsExists) ? this.state.claimsSkuId : (selectedClaim && selectedClaim.length > 0 && selectedClaim[0].skuId);
      // const deviceQuantity = this.state.selectedChangePlanList && this.state.selectedChangePlanList.additionalTapList ? this.state.selectedChangePlanList.additionalTapList.filter((claim) => claim.skuId === claimsSkuId) : [];

      const obj = {
        format: 'JSON',
        additionalTAPFeatureAvailable: tapSelection ? tapSelection.additionalTAPFeatureAvailable : false,
        quantity: this.state.devices,
        existingFeature: false,
        commerceItemId,
        featureSkuId: this.state.selectedChangePlanList && this.state.selectedChangePlanList.sfoSkuId,
        deviceSkuId,
        claimsSkuId,
        mtn: mtn || '',
        tapExist,
        tapEligible,
        isTmpMdPlan: (this.state.selectedChangePlanList && this.state.selectedChangePlanList.tmpMdPlan) || false,
        featureType: (this.state.selectedChangePlanList && this.state.selectedChangePlanList.tmpMdPlan) ? 'SPO' : 'INSURANCE',
        sfoSORId: this.state.selectedChangePlanList && this.state.selectedChangePlanList.sfoSORId,
        accessories,
        editProtection: editProtection || false,
        deviceProtectionRequired,
        fromEditDeviceForEUP,
        editCart,
      };

      this.props.updateProtection(this.state.selectedChangePlanList, obj);
    } else {
      const appleCareEnabled = this.props.preSelectedProtection.appleCareEnabled;
      if (appleCareEnabled) {
        this.setState({ planSelection: !this.state.planSelection, appleCareSelected: true });
      }
    }
  }
  displayProtectionList(protection, index, selectedItem) {
    const { tapExist } = this.props;
    return (
      <Col key={`${protection.sfoSkuId}-index`} xs={12} className="displayInlineBlock pad10 noSidePad">
        {((!tapExist) || (tapExist && protection.sorSfoType === 'SPO')) &&
          <BlockRadio
            id={`protection_${protection.sfoSkuId}`}
            name={`protection_${protection.sfoSkuId}_list`}
            onClick={() => this.protectionSelection(protection)}
            value={protection.displayName}
            checked={selectedItem ? (selectedItem.sfoSkuId === protection.sfoSkuId) : (index === 0)}
          >
            {protection.displayName && <div className="pad20 onlyBottomPad">
              <Row className="fontSize_5 bold">
                <Col xs={9} className="textAlignLeft">
                  {protection.displayName}
                </Col>
                <Col xs={3} className="textAlignRight">
                  {`$${protection.price}`}{protection.priceTerm && <span>{protection.priceTerm}</span>}
                </Col>
              </Row>
            </div>}
            <p className="protectionIntroText" dangerouslySetInnerHTML={{ __html: protection.introText }} />
            <ProtectionOptionsMD
              {...this.props}
              item={protection}
              style={null}
              className=""
              indexItem={index}
              selectedSkuId={this.state.selectedSkuId}
              handleDevicesCountChange={this.handleDevicesCountChange}
            />
          </BlockRadio>
        }
      </Col>
    );
  }
  declineProtection() {
    const appleCareEnabled = this.props.preSelectedProtection && this.props.preSelectedProtection.appleCareEnabled;
    if (this.state.appleCareSelected || !(appleCareEnabled)) {
      if (this.props.protectionTypes.decline && this.props.protectionTypes.decline.length > 0) {
        this.protectionSelection(this.props.protectionTypes.decline[0]);
        this.confirmSelection();
      }
    } else if (appleCareEnabled) {
      this.setState({ planSelection: !this.state.planSelection, appleCareSelected: true });
    }
  }
  render() {
    const { protectionChangeList, appleCare, protectionTypes, isFetching, cqContent, fewPlans } = this.props;
    const protectionChangeItem = protectionChangeList && protectionChangeList.mtnDeviceInfo.equipmentProtectionList;
    const selectedItem = protectionChangeItem && (protectionChangeItem.filter((list) => list.preSelected)[0] || protectionChangeItem[0]);
    const singleDeviceProtections = this.state.showAllPlans ? protectionTypes && protectionTypes.single : fewPlans;
    return (
      <section>
        {isFetching === true && <Loader />}
        <Modal
          mounted={this.state.showChangeModal}
          closeFn={this.closeProtectionModal}
          showCloseX
          underlayColor="rgba(0,0,0,0.8)"
          style={{ maxWidth: 500 }}
        >
          <div className="pad20 noTopPad">
            <p className="h2 width80 pad30 onlyBottomPad">{cqContent.label.DT_OD_CHECKOUT_PROTECTION_MODAL_TITLE}</p>
            <p className="pad24 onlyTopPad border_black onlyBottomBorder" />
            {this.state.planSelection ?
              <Row className="pad20 noSidePad">
                {protectionTypes && protectionTypes.multi && <Col xs={12}>
                  <Row>
                    <h3 className="pad10 onlyLeftPad">{cqContent.label.DT_OD_CHECKOUT_PROTECTION_MODAL_MT_TITLE}</h3>
                    {protectionTypes.multi.map((protection, index) => this.displayProtectionList(protection, index, selectedItem))}
                  </Row>
                </Col>}
                {singleDeviceProtections && <Col xs={12}>
                  <Row>
                    <h3 className="pad10 onlyLeftPad margin20 onlyTopMargin">{cqContent.label.DT_OD_CHECKOUT_PROTECTION_MODAL_SL_TITLE}</h3>
                    {singleDeviceProtections.map((protection, index) => this.displayProtectionList(protection, index, selectedItem))}
                  </Row>
                </Col>}
                {!this.state.showAllPlans && this.getLinkStatus()
                  && (
                    <p className="margin10">
                      <a className="displayBlock fontSize_4 color_black textDecUnderline" analyticstrack="show-all-protection-plan-link" onClick={(e) => this.onShowAllProtectionClickHandler(e)} href="">
                        {cqContent.label.DT_OD_DEVICE_PROTECTION_SEE_ALL_PLANS_BTN_TXT}
                      </a>
                    </p>
                  )
                }
                {this.state.showAllPlans
                  && (
                    <p className="margin10">
                      <a className="displayBlock fontSize_4 color_black textDecUnderline" analyticstrack="show-all-protection-plan-link" onClick={(e) => this.onShowAllProtectionClickHandler(e)} href="">
                        {cqContent.label.DT_OD_DEVICE_PROTECTION_SEE_LESS_PLANS_BTN_TXT}
                      </a>
                    </p>
                  )
                }
                <Col xs={12} className="pad10 noSidePad">
                  <p className="fontSize_2">
                    1 - Cracked-screen repair available for select devices and subject to parts availability. Visit phoneclaim.com/verizon to check eligibility and the repair option available in your area.
                  </p>
                  <p className="fontSize_2">
                    2 - Fulfillment options vary based upon location and availability.
                    {' '}
                  </p>
                </Col>
              </Row>
              :
              <Row className="pad20 noSidePad">
                <Col xs={12} className="displayInlineBlock pad20 noSidePad">
                  {appleCare && <div className="pad20 noSidePad">
                    <Row className="fontSize_5 bold">
                      <Col xs={2} className="textAlignLeft">
                        {appleCare.imageurl && <img src={`${appleCare.imageurl}&wid=70&hei=60`} srcSet={`${appleCare.imageurl}&wid=70&hei=60 1x`} alt={appleCare.name} />}
                      </Col>
                      <Col xs={6} className="bold textAlignLeft">
                        {appleCare.name}
                      </Col>
                      <Col xs={4} className="textAlignRight">
                        {appleCare.price && <p className="bold">{`$${appleCare.price}`}{appleCare.priceTerm && <span>{appleCare.priceTerm}</span>}</p>}
                        {appleCare.price && <p>due today</p>}
                      </Col>
                    </Row>
                    <hr className="border_black" />
                  </div>}
                  <p className="protectionIntroText">Get up to two years of technical support and hardware repair coverage for your Apple devices.</p>
                  <Row className="margin24 noSideMargin">
                    <Col xs={12} className="pad10 noSidePad">
                      <RadioButton
                        id="noAppleCare"
                        name="appleCare"
                        value="none"
                        analyticstrack="no-apple-care-radio"
                        labelClassName="displayInlineBlock verticalcenter pad12 onlyLeftPad fontSize_5 radioLabel"
                        onClick={this.handleAppleCare.bind(this)}
                        checked={this.state.action === 'remove'}
                      >
                        <span className="">None</span>
                      </RadioButton>
                    </Col>
                    <Col xs={12} className="pad10 noSidePad">
                      <RadioButton
                        id="addAppleCare"
                        name="appleCare"
                        value="Add AppleCare"
                        analyticstrack="add-apple-care-radio"
                        labelClassName="displayInlineBlock verticalcenter pad12 onlyLeftPad fontSize_5 radioLabel"
                        onClick={this.handleAppleCare.bind(this)}
                        checked={this.state.action === 'add'}
                      >
                        <span className="">Add AppleCare+</span>
                      </RadioButton>
                    </Col>
                  </Row>
                </Col>
              </Row>
            }
            <div className={`pad20 noSidePad  ${(this.state.planSelection) ? '' : 'textAlignCenter'}`}>
              {protectionTypes && protectionTypes.decline && this.state.planSelection &&
                <button type="button" analyticstrack="decline-protection-cta" onClick={this.declineProtection.bind(this)} className="button box margin15 onlyRightMargin">
                  {cqContent.label.DT_OD_DEVICE_PROTECTION_DECLINE_PROTECTION_BTN_TXT}
                </button>
              }
              <button type="button" analyticstrack="confirm-selection-cta" onClick={this.confirmSelection.bind(this)} className={`button box margin15 onlyLeftMargin ${(this.state.planSelection) ? 'floatRight' : ''}`}>
                {cqContent.label.DT_OD_DEVICE_CONFIRM_SELECTION_BTN_TXT}
              </button>
            </div>
          </div>
        </Modal>
        <RemoveProtection
          {...this.props}
          confirmSelection={this.confirmSelection}
          protectionChangeClick={this.props.protectionChangeClick}
          closeProtectionModal={this.closeProtectionModal}
          showRemoveModal={this.state.showRemoveModal}
        />
      </section>
    );
  }
}

Protection.propTypes = {
  // cqContent: PropTypes.object,
  preSelectedProtection: PropTypes.object,
  protectionChangeClick: PropTypes.func,
  updateState: PropTypes.func,
  mtn: PropTypes.string,
  isFetching: PropTypes.bool,
  commerceItemId: PropTypes.string,
  updateProtection: PropTypes.func,
  protectionChangeList: PropTypes.object,
  appleCare: PropTypes.object,
  tapExist: PropTypes.bool,
  protectionTypes: PropTypes.object,
  cqContent: PropTypes.object,
  vzProtectEnabled: PropTypes.bool,
  vzProtectState: PropTypes.string,
  fewPlans: PropTypes.array,
  showProtectionModal: PropTypes.func,
};
export default reduxForm({
  enableReinitialize: true,
})(connect((state) => ({ forms: state.get('form').toJS() }))(Protection));
