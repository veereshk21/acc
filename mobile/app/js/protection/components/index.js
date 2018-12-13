/**
 * Created by hmahad on 2/16/2017.
 */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';

import PropTypes from 'prop-types';
import { hashHistory } from '../../store';
import HorizontalRule from '../../common/HorizontalRule';
import MSelect from '../../common/Select';
import RadioButton from '../../common/RadioButton/';
import Button from '../../common/Button/Button';
import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';
import DeviceProtectionDetails from '../components/DeviceProtectionDetails';
import AddTotalMobileProtectionModal from '../components/addTotalMobileProtectionModal';
import RemoveTotalMobileProtectionModal from '../components/removeTotalMobileProtectionModal';

export class ProtectionComponent extends React.Component {
  constructor(props) {
    super(props);
    /** Using  preselected json key to set initial checked status */
    const preSelectedItem = props.equipmentProtectionList.find((item) =>
      item.get('preSelected'));

    this.state = {
      selectedProtection: props.tapExist ? props.equipmentProtectionList.get(0).toJS() : typeof preSelectedItem !== typeof undefined ? preSelectedItem.toJS() : {},
      selectedItem: props.tapExist ? props.equipmentProtectionList.get(0).toJS() : typeof preSelectedItem !== typeof undefined ? preSelectedItem.toJS() : {},
      disableListItem: false,
      selectedOption:
        typeof preSelectedItem !== typeof undefined
          ? preSelectedItem.get('sfoSkuId')
          : null,
      showAllPlans: props.editProtection,
      showDetails: false,
      showAddProtectionModal: false,
      showRemoveProtectionModal: false,
      tmpMdPlanDetails: {},
    };

    this._showAllPlans = this._showAllPlans.bind(this);
    // this._protectionOptionChange = this._protectionOptionChange.bind(this);
    this._onSaveProtection = this._onSaveProtection.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }


  componentDidMount() {
    this.tapDefaultSelections();
  }

  onClaimSelection(e) {
    // In case of TMP MD and user changes the claim option
    const devices = e.target.value;
    const list = this.props.equipmentProtectionList.get(0).toJS();
    if (list.additionalTapList) {
      list.additionalTapList.map((listData) => { // eslint-disable-line array-callback-return
        listData.devices === devices && this.setState({ selectedItem: listData });
      });
    }
  }

  getClaimsList(item) {
    // In case of TMP MD- claims Drop down needs to be displayed

    const tapList = [];
    const pItem = item.toJS();
    if (pItem.additionalTapList) {
      for (let i = 0; i < pItem.additionalTapList.length; i++) {
        const priceVal = Number.isInteger(Number.parseInt(pItem.additionalTapList[i].price, 10)) ? '$' + pItem.additionalTapList[i].price : pItem.additionalTapList[i].price;
        const text =
          pItem.additionalTapList[i].devices +
          ' Devices, ' +
          pItem.additionalTapList[i].claims +
          ' Claims for - ' +
          priceVal;
        const tapObj = {};
        tapObj.label = text;
        tapObj.additionalTAPFeatureAvailable = pItem.additionalTapList[i].additionalTAPFeatureAvailable;
        tapObj.selected = pItem.additionalTapList[i].preSelected ? pItem.additionalTapList[i].preSelected : false;
        tapObj.price = pItem.additionalTapList[i].price;
        tapObj.value = pItem.additionalTapList[i].skuId;
        tapObj.devices = pItem.additionalTapList[i].devices;
        tapList.push(tapObj);
      }
    }
    return tapList;
  }

  tapDefaultSelections() {
    let selectedItem = (this.props.tapExist && this.props.equipmentProtectionList.get(0).toJS().additionalTapList) ? this.props.equipmentProtectionList.get(0).toJS().additionalTapList[0] : {};
    let disableClaim = false;
    if (this.props.equipmentProtectionList.get(0).toJS().additionalTapList) {
      this.props.equipmentProtectionList.get(0).toJS().additionalTapList.map((item) => { // eslint-disable-line
        if (item.preSelected) {
          selectedItem = item;
          if (item.additionalTAPFeatureAvailable) {
            disableClaim = true;
          }
          return false;
        }
      });
    }
    if (selectedItem.preSelected) {
      this.props.change('claims', selectedItem.devices);
    }
    this.setState({ selectedItem, disableListItem: disableClaim });

    this.props.equipmentProtectionList.map((itemList) => { // eslint-disable-line array-callback-return
      if (itemList.get('preSelected')) {
        const tmpMdPlanObj = {
          isTmpMdPlan: itemList.get('tmpMdPlan'),
          claimsSkuId: itemList.get('sfoSkuId'),
        };
        this.setState({
          tmpMdPlanDetails: tmpMdPlanObj,
          selectedOption: itemList.get('sfoSkuId'),
        });
      }
    });
    if (this.state.selectedItem && this.state.selectedItem.sorSfoType) {
      this.props.updateBtnState();
    }
  }

  _protectionOptionChange(item, e) {
    // Restore Previous plan
    this.props.updateBtnState();
    const prevPlanObject = {
      prev_tmpMdPlanDetails: this.state.tmpMdPlanDetails,
      prevOption: this.state.selectedOption,
    };
    this.setState({
      prevProtectionObject: prevPlanObject,
      selectedProtection: item.toJS(),
    });

    // In case of TMP MD
    const isTmpMdPlan = e.target.getAttribute('data-isTmpMdPlan');
    const isDeclineOption = e.target.getAttribute('data-isdecline');
    // data-isdecline={item.get('sorSfoType') === 'INSUR,D'}
    const prevSelected = this.state.tmpMdPlanDetails;
    const claimsElem = document.getElementById('claims');

    const tmpMdPlanObj = {
      isTmpMdPlan,
      claimsSkuId: claimsElem ? claimsElem.value : null,
    };

    if (isTmpMdPlan === true || isTmpMdPlan === 'true') {
      this.setState({ showAddProtectionModal: true });
    } else if (
      prevSelected.isTmpMdPlan === true ||
      prevSelected.isTmpMdPlan === 'true'
    ) {
      this.setState({ showRemoveProtectionModal: true, isdecline: isDeclineOption });
    }

    this.setState({
      selectedOption: e.target.value,
      tmpMdPlanDetails: tmpMdPlanObj,
    });
  }

  addTotalMobileProtection = (data) => {
    this.setState({ showAddProtectionModal: false });
    if (data === 'Back') {
      this.state.selectedOption = this.state.prevProtectionObject.prevOption;
      this.state.tmpMdPlanDetails = this.state.prevProtectionObject.prev_tmpMdPlanDetails;
    }
  };

  removeTotalMobileProtection = (data) => {
    this.setState({ showRemoveProtectionModal: false });
    if (data === 'NO') {
      this.state.selectedOption = this.state.prevProtectionObject.prevOption;
      this.state.tmpMdPlanDetails = this.state.prevProtectionObject.prev_tmpMdPlanDetails;
    }
  };

  _showAllPlans() {
    this.setState({ showAllPlans: true });
  }

  toggleView(event) {
    event.preventDefault();
    this.setState({
      showDetails: !this.state.showDetails,
      showAllPlans: this.state.showDetails,
    });
    if (this.state.showDetails) {
      this.setState({ showDetails: false, showAllPlans: true });
    } else {
      this.setState({ showDetails: true, showAllPlans: false });
    }
  }

  _onSaveProtection() {
    // In case of TMP MD- claims,tmpMdPlan needs to be passed
    const { applecare } = this.props;
    const requestParams = {
      additionalTAPFeatureAvailable: this.state.selectedItem.additionalTAPFeatureAvailable,
      quantity: this.state.selectedItem.devices,
      featureSkuId: this.state.selectedOption ? this.state.selectedOption : '',
      featureType: this.state.selectedProtection.tmpMdPlan ? 'SPO' : 'INSURANCE',
      commerceItemId: this.props.commerceItemId ? this.props.commerceItemId : '',
      deviceSkuId: this.props.deviceSkuId ? this.props.deviceSkuId : '',
      existingFeature: false,
      deviceProtectionRequired: this.props.deviceProtectionRequired,
      fromEditDeviceForEUP: this.props.fromEditDeviceForEUP,
      mtn: this.props.mtn ? this.props.mtn : '',
      tapExist: this.props.tapExist,
      tapEligible: this.props.tapEligible,
      editProtection: this.props.editProtection ? this.props.editProtection : false,
      claimsSkuId: this.state.selectedItem.skuId,
      isTmpMdPlan: this.state.selectedProtection.tmpMdPlan,
    };
    if (applecare.length > 0) {
      this.props.getSelectedProtectionData(requestParams);
      hashHistory.push('/appleCare');
    } else {
      this.props.addSelectedProtection(this.props.saveUrl, Object.assign(requestParams, { accessories: [] }));
    }
  }


  renderClaimsList(claimsObj) {
    // In case of TMP MD- claims Drop down needs to be displayed

    const { item } = claimsObj;
    const { claimsList } = claimsObj;

    return (
      item.get('additionalTapList') && (
        <Row style={{ justifyContent: 'flex-end' }}>
          <Col
            xs={11}
            className={`(${this.state.selectedOption !== item.get('sfoSkuId')} ? ' opacityRemove' : (this.state.disableListItem && ' opacityHalf')  )`}
          >
            <div className="pad16 onlyLeftPad ">
              <MSelect
                name="claims"
                id="claims"
                onChange={(e) => this.onClaimSelection(e)}
                className="fontSize_2"
                style={{ fontSize: '1.2rem' }}
                borderStyle
                disabled={
                  this.state.selectedOption === item.get('sfoSkuId')
                    ? this.state.disableListItem
                    : true
                }
              >
                {claimsList.map((optionLabel, id) => (
                  <option
                    key={id}
                    value={optionLabel.devices}
                  >
                    {optionLabel.label}
                  </option>
                ))}
              </MSelect>
            </div>
          </Col>
        </Row>
      )
    );
  }

  render() {
    const showAllPlansCTA = this.props.equipmentProtectionList.toJS().length > 2;
    const self = this;

    if (this.state.showAddProtectionModal) {
      return (
        <div>
          <AddTotalMobileProtectionModal
            cqHTML={this.props.cqHTML}
            cqLabel={this.props.cqLabel}
            addTotalMobileProtection={this.addTotalMobileProtection}
          />
        </div>
      );
    } else if (this.state.showRemoveProtectionModal) {
      return (
        <div>
          <RemoveTotalMobileProtectionModal
            removeTotalMobileProtection={this.removeTotalMobileProtection}
            cqLabel={this.props.cqLabel}
            isDeclineOption={this.state.isdecline}
          />
        </div>
      );
    }

    if (this.state.showDetails) {
      return (<DeviceProtectionDetails
        cqHTML={this.props.cqHTML}
        cqLabel={this.props.cqLabel}
        onClick={this.toggleView}
      />);
    }


    return (
      <Grid className="pad32">
        {this.props.isFetching ? <Loader /> : ''}

        <div>
          <Title
            id="section_title"
            tabIndex="0"

          >
            {this.props.cqLabel.get('OD_DEVICE_PROTECTION_HEADER')}
          </Title>
          <Row>
            <Col xs={12}>
              <p className="pad16 onlyTopPad">
                {this.props.cqLabel.get('OD_DEVICE_PROTECTION_SUBTITLE')}
              </p>
              <HorizontalRule />
            </Col>
          </Row>
          {this.props.tmprefreshOptionAvailable &&
            <Row >
              <Col xs={12} dangerouslySetInnerHTML={{ __html: this.props.cqLabel.get('OD_PROTECTION_TMP_REFRESH_AVAILABLE') }} />
            </Row>}
          <Row>
            <Col xs={12}>
              <form action="" method="POST" name="protectionForm">
                {this.props.equipmentProtectionList.map((item, index) => {
                  const claimsList = self.getClaimsList(item);
                  return (
                    <Row key={index} className={(this.state.showAllPlans || this.props.showAllPlans) ? '' : index === 0 || index === this.props.equipmentProtectionList.size - 1 ? ' ' : ' is-hidden '}>

                      <Col xs={12}>
                        {((this.props.tapExist &&
                          item.get('sorSfoType') === 'SPO') || !this.props.tapExist) && (
                            <div>
                              <RadioButton
                                checked={
                                  this.state.selectedOption ===
                                  item.get('sfoSkuId')
                                }
                                aria-labelledby={
                                  'labelof' + item.get('sfoSkuId')
                                }
                                analyticstrack="choose-protection"
                                value={item.get('sfoSkuId')}
                                data-isTmpMdPlan={item.get('tmpMdPlan')}
                                data-isdecline={item.get('sorSfoType') === 'INSUR,D'}
                                id={item.get('sfoSkuId')}
                                name="dppOptions"
                                onChange={this._protectionOptionChange.bind(
                                  this,
                                  item
                                )}
                              >
                                <span
                                  className="boldText displayBlock"
                                  id={'labelof' + item.get('sfoSkuId')}
                                >
                                  <span className="margin6 onlyRightMargin">
                                    {(parseFloat(item.get('wasPrice')) > parseFloat(item.get('price'))) && <span className="color_red textDecLineThrough margin6 onlyRightMargin">${item.get('wasPrice')}</span>}
                                    ${item.get('price')}
                                    {item.get('priceTerm')}
                                  </span>
                                  {item.get('displayName')}
                                </span>
                                <span
                                  className="color_666 clearfix"
                                  dangerouslySetInnerHTML={{
                                    __html: item.get('introText'),
                                  }}
                                />
                              </RadioButton>
                              {self.renderClaimsList({ item, claimsList })}
                              <HorizontalRule y={1} color="#D8DADA" />
                            </div>
                          )}
                      </Col>
                    </Row>
                  );
                })}
              </form>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="margin102 onlyBottomMargin">
              <p className="fontSize_2">
                {this.props.cqLabel.get('OD_TMPD_DISCLOSURE_TXT')}
              </p>
              <div className="pad6 noSidePad" dangerouslySetInnerHTML={{ __html: this.props.cqHTML.get('OD_PROTECTION_CRACKED_SCREEN_DISCLOSURE') }} />
            </Col>
          </Row>
          <div className="footerFixed">
            {this.props.btnState && <div className="background_Orange pad10 margin10 onlyMarginBottom color_white textAlignLeft">{this.props.cqLabel.get('OD_PROTECTION_NOT_SELECTED')}</div>}
            <div className="centerBlock textAlignCenter">
              {!this.props.tapExist && showAllPlansCTA && (
                <Button
                  type="button"
                  analyticstrack="show-all-protection-options"
                  className={
                    this.state.showAllPlans || this.props.showAllPlans
                      ? 'button large secondary margin12 onlyRightMargin is-hidden'
                      : 'button large secondary margin12 onlyRightMargin'
                  }
                  onClick={this._showAllPlans}
                >
                  {this.props.cqLabel.get('OD_DEVICE_PROTECTION_SEE_ALL_PLANS_BTN_TXT')}
                </Button>
              )}

              <Button
                type="button"
                className="button large primary margin12 onlyRightMargin "
                role="button"
                disabled={this.props.btnState}
                onClick={this._onSaveProtection}
                analyticstrack="save-protection-options"
              >
                {this.props.cqLabel.get('OD_DEVICE_PROTECTION_SAVE_BTN_TXT')}
              </Button>


            </div>

            <div className="textAlignCenter fontSize_2 pad12 noBottomPad">
              <span>
                {this.props.cqLabel.get('OD_PROTECTION_MOREINFO_TEXT')}{' '}
                <Link role="link" to="/" className="link" onClick={this.toggleView} analyticstrack="more-info">
                  {this.props.cqLabel.get('OD_PROTECTION_MOREINFO_LINK')}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </Grid>
    );
  }
}

ProtectionComponent.propTypes = {
  tmprefreshOptionAvailable: PropTypes.bool,
  addSelectedProtection: PropTypes.func,
  saveUrl: PropTypes.string,
  mtn: PropTypes.string,
  tapExist: PropTypes.bool,
  tapEligible: PropTypes.bool,
  isFetching: PropTypes.bool,
  cqLabel: PropTypes.object,
  equipmentProtectionList: PropTypes.object,
  cqHTML: PropTypes.object,
  editProtection: PropTypes.bool,
  commerceItemId: PropTypes.string,
  deviceSkuId: PropTypes.string,
  deviceProtectionRequired: PropTypes.bool,
  fromEditDeviceForEUP: PropTypes.bool,
  showAllPlans: PropTypes.bool,
  getSelectedProtectionData: PropTypes.func,
  applecare: PropTypes.array,
  change: PropTypes.func,
  btnState: PropTypes.bool,
  updateBtnState: PropTypes.func,
};

export default reduxForm({
  // eslint-disable-line no-class-assign
  form: 'protectionForm',
  enableReinitialize: true,
})(ProtectionComponent);
