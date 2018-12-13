/**
 * Created by mambig on 8/23/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { reduxForm, getFormValues, getFormSyncErrors } from 'redux-form/immutable';

import Loader from '../../common/Loader/Loader';
import Modal from '../../common/Modal';
import MSelect from '../../common/Select/index';
import AsyncComponent from './../../common/AsyncComponent';

const EmergencyAddressInfo = AsyncComponent(() => import('./EmergencyAddressInfo'));
const GiveOwnNumberModal = AsyncComponent(() => import('./GiveOwnNumberModal'));
const WarningMessage = AsyncComponent(() => import('./WarningMessage'));

class NumberShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleHaveOwnNo: false,
      e911FormData: null,
      limitHeader: props.cqContent.label.DT_OD_NS_CART_LIMIT_EXCEEDED_HEADER,
      limitContent: props.cqContent.label.DT_OD_NS_CART_LIMIT_EXCEEDED_MSG,
      inEligibleUrl: props.numberShare.cartRedirectUrl,

    };

    this.haveOwnNo = this.haveOwnNo.bind(this);
    this.displayHaveOwnNoModal = this.displayHaveOwnNoModal.bind(this);
  }


  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  componentDidMount() {
    const { numberShare } = this.props;
    const { deviceProdId, deviceSkuId } = numberShare;

    this.props.fetchDeviceImage({
      deviceProdId,
      deviceSkuId,
    });

    if (numberShare.eligibleForE911Address) {
      this.props.getEmergencyAddress(numberShare.redirectUrl);
    }


    this.props.selectedMtn(this.getInitialMtn());
  }

  /* onAddDeviceToCartHandler(selectedMtnInfo) {
    const { numberShare } = this.props;
    const redirectUrl = numberShare.redirectUrl;
    const deviceInfo = Object.assign({}, { redirectUrl }, { ...selectedMtnInfo });
    this.props.addDeviceShare(deviceInfo);
  } */

  onSubmit = () => {
    /* const { submmitEmergencyContact, e911Data, numberShare } = this.props; */

    const { numberShare, addDeviceShare } = this.props;
    const { productInfo } = this.state;

    const deviceInfo = Object.assign({}, { redirectUrl: numberShare.redirectUrl, ...productInfo });
    if (numberShare.eligibleForE911Address) {
      deviceInfo.e911FormData = this.props.formValues;
    }
    if (numberShare.devicesList) {
      addDeviceShare(deviceInfo);
    } else {
      window.location = numberShare.cartRedirectUrl;
    }

    // submmitEmergencyContact(Object.assign({}, e911FormData, selectedMtn, { e911AddressValidated: false, updateAddressUrl: e911Data.updateAddressUrl }));
  }

  getInitialMtn() {
    const { numberShare } = this.props;
    const firstMtnItem = numberShare.devicesList ? numberShare.devicesList[0] : numberShare.devicesList;
    const productInfo = numberShare.devicesList ? numberShare.devicesList[0] : numberShare.devicesList;
    if (firstMtnItem) {
      this.setState({
        selectedMtn: firstMtnItem.mtn,
        commerceItemId: firstMtnItem.commerceItemId,
        productInfo,
      });
      return firstMtnItem.mtn;
    }
    return null;
  }

  toggleSubmit = (data) => {
    this.setState({ isEnableSubmit: data.isE911Valid, e911FormData: data.e911FormData });
  }

  modalClose = () => {
    this.setState({ toggleHaveOwnNo: false });
  };

  displayHaveOwnNoModal(data) {
    const isDisplay = data ? data.isDisplay : true;
    this.setState({ toggleHaveOwnNo: isDisplay });
  }

  chooseNo = (e) => {
    const { numberShare } = this.props;
    const productInfo = numberShare.devicesList[e.target.selectedIndex];
    this.setState({
      selectedMtn: e.target.value,
      commerceItemId: productInfo.commerceItemId,
      productInfo,
    });
    this.props.selectedMtn(e.target.value);
    /* if (numberShare.eligibleForE911Address) {
      this.props.addDeviceShare({ redirectUrl: numberShare.redirectUrl, ...productInfo });
    } */
  }

  haveOwnNo() {
    const { numberShare } = this.props;
    window.location.href = numberShare.cartRedirectUrl;
  }

  renderMtnOptions() {
    const {
      cqContent, numberShare, statusCode, inEligibleMessage,
    } = this.props;
    const { devicesList } = numberShare;

    if (inEligibleMessage && Object.keys(inEligibleMessage).length > 0) {
      this.setState({
        limitHeader: inEligibleMessage.title,
        limitContent: inEligibleMessage.description,
        inEligibleUrl: inEligibleMessage.redirectUrl,
      });
    }

    return (
      <div>
        <p className="bold">{cqContent.label.DT_OD_NS_CHOOSE_NO_TITLE}</p>


        {statusCode !== '00' ?
          <div className="background_blue color_FFF pad15 margin10 onlyTopMargin">
            <p className="">{this.state.limitHeader}</p>
          </div>
          :

          <form name="NumberShareForm" >
            <MSelect
              name="chooseNoSelect"
              id="chooseNoSelect"
              onChange={this.chooseNo}
              aria-label={cqContent.label.DT_OD_NS_CHOOSE_NO_TITLE}
              className="bold"
              value={this.state.selectedMtn}
              borderStyle
            >
              {devicesList.map((device, index) => (
                <option key={`device-${index}`} value={device.mtn} dangerouslySetInnerHTML={{ __html: device.numberSharePairDevice || (device.deviceName + '&nbsp;' + device.mtn) }} />
              ))}
            </MSelect>
          </form>
        }
        {!numberShare.eligibleForE911Address &&
          <a
            onClick={this
              .displayHaveOwnNoModal} className="bold textDecUnderline margin20 onlyTopMargin block cursorPointer"
            dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_NS_OWN_NUMBER }}
          />
        }
      </div>);
  }

  renderSubmitBtn() {
    const { cqContent, numberShare } = this.props;
    const { selectedMtn, commerceItemId } = this.state;
    return (
      <div className="clearfix">
        <button
          disabled={numberShare.devicesList && (!selectedMtn && !commerceItemId)}
          className="button bold large margin20 onlyTopMargin block floatRight"
          type="submit"
          onClick={this.onSubmit.bind()}
          dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_NS_PROMPT_NEXT_CTA }}
        />
      </div>
    );
  }

  renderHaveOwnNoModal() {
    const { cqContent, numberShare } = this.props;
    const { nonNumberShareLineAccessCharge } = numberShare;
    const { toggleHaveOwnNo } = this.state;


    return (
      <Modal
        mounted={toggleHaveOwnNo}
        closeFn={this.modalClose}
        style={{ background: 'white' }}
        showCloseX
      >
        <GiveOwnNumberModal cqContent={cqContent} nonNumberShareLineAccessCharge={nonNumberShareLineAccessCharge} onSelectHaveOwnNumber={this.haveOwnNo} onToggleModal={this.displayHaveOwnNoModal} />
      </Modal>
    );
  }


  render() {
    const {
      isFetching, cqContent, deviceDetails, numberShare, emergencyContactInfo,
    } = this.props;

    const { devicesList, eligibleForE911Address, numberShareLineAccessCharge, states } = numberShare;
    const deviceName = deviceDetails ? ((deviceDetails.brandName ? deviceDetails.brandName : '') + ' ' + (deviceDetails.displayName ? deviceDetails.displayName : '') + (deviceDetails.capacity ? (', ' + deviceDetails.capacity) : '') + (deviceDetails.color ? (' in ' + deviceDetails.color) : '')) : '';

    return (
      <div className="pad24  grid positionRelative fontSize_5" >
        {this.renderHaveOwnNoModal()}
        <section>
          {isFetching && <Loader />}
          <Grid>
            <Row>

              <Col xs={4} className="textAlignCenter margin100 onlyTopMargin">
                <div className="bold margin40 onlyTopMargin" dangerouslySetInnerHTML={{ __html: deviceName }} />
                {deviceDetails.displayImageURL ?
                  <img className="pad30 noSidePad " src={deviceDetails.displayImageURL} role="presentation" /> :
                  <img className="pad30 noSidePad " src="https://ss7.vzw.com/is/image/VerizonWireless/null?$device-lg$" role="presentation" />
                }
              </Col>


              <Col md={8} xs={8} className=" pad30 noRightPad">
                {this.renderSubmitBtn()}
                {devicesList ?
                  <div className="margin40 onlyTopMargin">
                    <div className="width70">
                      {numberShareLineAccessCharge ? <div className="bold margin20 onlyBottomMargin">
                        <p dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_NS_LINE_ACCESS }} />
                        <div>${numberShareLineAccessCharge}</div>
                      </div> : ''
                      }
                      <p className="">{cqContent.label.DT_OD_NS_COMPATIBLE}</p>
                      <div className="margin15 noSideMargin">{this.renderMtnOptions()}</div>
                    </div>
                    {eligibleForE911Address && emergencyContactInfo.showEmergencyModal && <EmergencyAddressInfo toggleSubmit={this.toggleSubmit} {...this.props} states={states} />}
                  </div>
                  :
                  <div className="margin30">
                    <WarningMessage cqContent={cqContent} numberShare={numberShare} />
                  </div>
                }
              </Col>
            </Row>


            <Row>
              <Col xs={12}>
                <div className="" dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_NS_GLOBAL_READY }} />
                {this.renderSubmitBtn()}
              </Col>
            </Row>

          </Grid>
        </section>
      </div>
    );
  }
}

NumberShare.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

NumberShare.propTypes = {
  addDeviceShare: PropTypes.func,
  numberShare: PropTypes.object,
  cqContent: PropTypes.object,
  deviceDetails: PropTypes.object,
  fetchDeviceImage: PropTypes.func,
  isFetching: PropTypes.bool,
  statusCode: PropTypes.string,
  inEligibleMessage: PropTypes.string,
  emergencyContactInfo: PropTypes.object,
  selectedMtn: PropTypes.func,
  getEmergencyAddress: PropTypes.func,
  formValues: PropTypes.object,
};

NumberShare = reduxForm({ // eslint-disable-line no-class-assign
  form: 'NumberShareForm',
  enableReinitialize: true,
})(NumberShare);

NumberShare = connect( // eslint-disable-line no-class-assign
  (state) => {
    const formMap = getFormValues('NumberShareForm')(state);
    const formValues = formMap ? formMap.toJS() : {};
    const formErrors = getFormSyncErrors('NumberShareForm')(state);
    return {
      formValues,
      formErrors,
    };
  })(NumberShare);

export default NumberShare;

