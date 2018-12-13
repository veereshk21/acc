/**
 * Created by mambig on 8/23/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from 'react-flexbox-grid';

import Loader from '../../common/Loader/Loader';
import Modal from '../../common/Modal';
import AsyncComponent from './../../common/AsyncComponent';
import SelectionBox from '../../common/SelectionBox';

const GiveOwnNumberModal = AsyncComponent(() => import('./GiveOwnNumberModal'));
const WarningMessage = AsyncComponent(() => import('./WarningMessage'));

class NumberShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleHaveOwnNo: false,
      deviceList: props.numberShare.devicesList,
      productInfo: null,
      // e911FormData: null,
    };
    this.displayHaveOwnNoModal = this.displayHaveOwnNoModal.bind(this);
    this.haveOwnNo = this.haveOwnNo.bind(this);
  }

  componentDidMount() {
    // set default number to productInfo state
    this.selectDefaultNumber();
  }

  // gets called click of CTA
  onSubmit = () => {
    const { numberShare, addDeviceShare } = this.props;
    const { productInfo } = this.state;
    const deviceInfo = Object.assign({}, { redirectUrl: numberShare.redirectUrl, ...productInfo });

    //  Redirecting to cart when there is no compatible devices
    if (!productInfo) {
      window.location = numberShare.cartRedirectUrl;
    } else if (numberShare.eligibleForE911Address) {
      //  Adds selected device to state and
      //  routes to e911 address form
      //  on it componentDidMount it makes AJAX call to retrieve e911 address
      this.props.emergencyInfoLLP();
    } else {
      //  makes AJAX call for the selected device
      //  if it is not apple watch
      addDeviceShare(deviceInfo);
    }
    // submmitEmergencyContact(Object.assign({}, e911FormData, selectedMtn, { e911AddressValidated: false, updateAddressUrl: e911Data.updateAddressUrl }));
  }

  modalClose = () => {
    this.setState({ toggleHaveOwnNo: false });
  };

  displayHaveOwnNoModal() {
    this.setState({ toggleHaveOwnNo: true });
  }

  selectDefaultNumber() {
    const { numberShare } = this.props;
    const productInfo = numberShare.devicesList && numberShare.devicesList[0];
    if (productInfo) {
      productInfo.index = 0;
    }
    this.setState({
      productInfo,
    });
    if (productInfo) this.props.selectedMtn(productInfo);
  }

  selectDevices = (data) => {
    this.setState({
      productInfo: data,
    });
    this.props.selectedMtn(data);
  }

  haveOwnNo() {
    const { numberShare } = this.props;
    window.location.href = numberShare.cartRedirectUrl;
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
        <GiveOwnNumberModal cqContent={cqContent} nonNumberShareLineAccessCharge={nonNumberShareLineAccessCharge} onSelectHaveOwnNumber={this.haveOwnNo} onToggleModal={this.modalClose} />
      </Modal>
    );
  }

  renderNSListHLLP() {
    const { numberShare, cqContent } = this.props;
    let deviceHtml = null;
    deviceHtml = numberShare.devicesList.map((item, index) => (
      <div key={index}>
        <SelectionBox
          name="compatabileRioDevices"
          id={item.displayMtn ? item.displayMtn : `${index + 1}`}
          headerText={item.nickname ? item.nickname : item.deviceName}
          // rightHeaderText={formattedPrice}
          bodyText={item.displayMtn}
          disabled={!item.isSelectEnabled}
          showBodyNoSpace
          infoMsgHeader={parseInt(item.totalNumberShare, 10) > 0 && `${item.totalNumberShare} ${cqContent.label.DT_OD_NUMBER_SHARE_EXTENSION_LBL}`}
          infoMsgFooter={!item.isSelectEnabled && ((parseInt(item.totalNumberShare, 10) === 5) ? cqContent.label.DT_OD_NUMBER_SHARE_EXTENSION_LBL_EXCEEDED : cqContent.label.DT_OD_ENABLE_VOLTE)}
          selectFn={item.isSelectEnabled && this.selectDevices.bind(this, Object.assign({}, { ...item, index }))}
          value={item.mtn}
          selected={index === (this.state.productInfo && this.state.productInfo.index)}
          analyticstrack="equipment-selectCompatibelRioDevices"
        />
        <div className="margin10 onlyTopMargin" />
      </div>
    ));

    return (
      <div>
        {deviceHtml}
      </div>
    );
  }

  render() {
    const {
      isFetching, cqContent, numberShare,
    } = this.props;
    const { devicesList, numberShareLineAccessCharge, numberShareOptional } = numberShare;
    return (
      <div className="positionRelative vhm80">
        {this.renderHaveOwnNoModal()}
        <section>
          {isFetching && <Loader />}
          <Grid fluid>
            <Row>
              <Col xs={7} className="margin15 noSideMargin">
                <Row>
                  <Col lg={8} sm={12} md={12}>
                    <h1 className="fontSize_11 h2 pad10 noSidePad" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_NS_LINE_CHOOSE }} />
                  </Col>
                </Row>
                <Row>
                  <Col lg={11} sm={12} md={12}>
                    <p className="pad10 noSidePad" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_NS_DESCRIPTION }} />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={7} className="margin15 noSideMargin">
                {devicesList ?
                  <div className="width100">
                    <div className="bold margin40 onlyBottomMargin">
                      <span className="pad5 onlyRightPad fontSize_7" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_NS_LINE_ACCESS }} />
                      <span className="fontSize_7">${numberShareLineAccessCharge}</span>
                    </div>
                    <div className="margin15 noSideMargin">{this.renderNSListHLLP()}</div>
                  </div> :
                  <div>
                    <WarningMessage cqContent={cqContent} numberShare={numberShare} />
                  </div>
                }
                <Row>
                  <button
                    className="button bold margin20 onlyTopMargin block"
                    style={{ width: '200px' }}
                    type="submit"
                    onClick={this.onSubmit.bind()}
                    analyticstrack="select-numberShare-deviceLine-CTA"
                    disabled={this.state.productInfo && !this.state.productInfo.isSelectEnabled}
                    dangerouslySetInnerHTML={{ __html: devicesList ? cqContent.label.DT_OD_NS_SELECT_LINE_CTA : cqContent.label.DT_OD_NS_PROMPT_NEXT_CTA }}
                  />
                  <div className="pad20 onlyLeftPad">
                    {numberShareOptional && <a
                      onClick={this.displayHaveOwnNoModal}
                      analyticstrack="select-ownNumber-modal-link"
                      className="textDecUnderline margin40 onlyTopMargin block cursorPointer"
                      dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_NS_OWN_NUMBER }}
                    />}
                  </div>
                </Row>
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
  // deviceDetails: PropTypes.object,
  // fetchDeviceImage: PropTypes.func,
  isFetching: PropTypes.bool,
  // statusCode: PropTypes.string,
  // inEligibleMessage: PropTypes.string,
  // emergencyContactInfo: PropTypes.object,
  selectedMtn: PropTypes.func,
  emergencyInfoLLP: PropTypes.func,
  // formValues: PropTypes.object,
};

/*
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
  })(NumberShare); */

export default NumberShare;
