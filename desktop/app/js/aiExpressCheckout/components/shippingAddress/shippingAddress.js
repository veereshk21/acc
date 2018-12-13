import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { normalizePhoneNumber } from '../../../common/validation';
import { EDIT_STATE } from '../../constants';
import EditButton from '../../../common/EditButton/index';
import { capitalize } from '../../../common/Helpers/index';
import AsyncComponent from '../../../common/AsyncComponent';
import ShippingAddressInvalid from './shippingAddressInvalid';

const Modal = AsyncComponent(() => import('../../../common/Modal'));
const InStorePickUp = AsyncComponent(() => import('../../containers/ispu'));

const SecurePin = AsyncComponent(() => import('./securePin'));

class ShippingAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSecurePin: false,
      deviceDetails: [],
      ispuModalVisible: false,
    };
  }
  componentDidMount = () => {
    if (this.props.checkoutStates.poBoxShippingAddress) {
      this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_PO_BOX_ERROR);
    } else if (this.props.checkoutStates.shippingAddressValidationError) {
      this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_VALIDATION_ERROR);
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.asyncCallStatus.data.smsDevicesFetched) {
      if (nextProps.asyncCallStatus.data.output.deviceDetails !== null && nextProps.asyncCallStatus.data.output.deviceDetails.length > 0) {
        this.setState({
          showSecurePin: true,
          deviceDetails: nextProps.asyncCallStatus.data.output.deviceDetails,
          orderID: nextProps.asyncCallStatus.data.output.orderID,
        });
      } else {
        this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_ADDRESS_UPDATE_PROMPT_TEXT);
      }
      this.props.invalidateAsyncFetch();
    }
  }
  onClickEdit = () => {
    if (this.props.authEnabled && !this.props.formEnabled) {
      this.props.fetchSMSDevices();
    } else if (!this.props.authEnabled) {
      this.notifySecurePinIneligible();
    } else {
      this.props.updateEditState(EDIT_STATE.SHIPPING, true);
    }
  }

  closeSecurePinModal = () => {
    this.setState({ showSecurePin: false });
  }

  securePinSuccess = () => {
    this.setState({ showSecurePin: false });
    this.props.updateEditState(EDIT_STATE.SHIPPING, true);
  }

  notifySecurePinIneligible = () => {
    const { cqContent } = this.props;
    this.props.showErrorNotification(cqContent.error.DT_OD_CHECKOUT_ADDRESS_UPDATE_PROMPT_TEXT);
  }

  showIspuModal = () => {
    this.setState({ ispuModalVisible: true });
  }

  closeIspuModal = () => {
    this.setState({ ispuModalVisible: false });
  }
  ispuSuccessful = () => {
    this.setState({ ispuModalVisible: false });
  }
  submitShippingInfo = (data) => {
    const { cqContent } = this.props;
    this.props.updateShippingAddress(data.toJS(), cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_UPDATE_FAILURE_TEXT);
  }

  render() {
    const { cqContent, addressInfo, checkoutStates } = this.props;
    return (
      <div>
        {this.state.ispuModalVisible &&
          <Modal
            mounted
            closeFn={this.closeIspuModal}
            showCloseX
            underlayColor="rgba(0,0,0,0.8)"
          >
            <InStorePickUp
              closeModal={this.ispuSuccessful}
            />
          </Modal>
        }
        {this.state.showSecurePin &&
          <Modal
            mounted
            closeFn={this.closeSecurePinModal}
            underlayColor="rgba(0,0,0,0.8)"
          >
            <SecurePin
              deviceDetails={this.state.deviceDetails}
              orderID={this.props.orderID}
              closeModal={this.closeSecurePinModal}
              initialValues={{ smsDevice: this.props.loginMTN }}
              cqContent={cqContent}
              sendSMS={this.props.sendSMS}
              validateAuthCode={this.props.validateAuthCode}
              asyncCallStatus={this.props.asyncCallStatus}
              invalidateAsyncFetch={this.props.invalidateAsyncFetch}
              securePinSuccess={this.securePinSuccess}
            />
          </Modal>
        }
        {(checkoutStates.poBoxShippingAddress || checkoutStates.shippingAddressValidationError) ?
          <ShippingAddressInvalid
            cqContent={cqContent}
            addressInfo={addressInfo}
            checkoutStates={checkoutStates}
            showIspuModal={this.showIspuModal}
            onClickEdit={this.onClickEdit}
            ispuEligibleFlag={this.props.ispuEligibleFlag}
          />
          : (
            <div style={{ wordWrap: 'break-word' }} >
              {/* Title */}
              <div className="">
                <h3 className="fontSize_5 displayInlineBlock verticalBottom margin10 onlyRightMargin">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SECTION_TITLE}</h3>
                <EditButton
                  onClick={this.onClickEdit}
                  analyticstrack="shipping-edit-CTA"
                >
                  Change
                </EditButton>
              </div>
              {/* Shipping Address */}
              {addressInfo.businessName &&
                <p>{capitalize(addressInfo.businessName)}</p>
              }
              {(addressInfo.firstName || addressInfo.lastName) &&
                <p> {capitalize(addressInfo.firstName)} {capitalize(addressInfo.lastName)}</p>
              }
              {addressInfo.address1 && <p>{capitalize(addressInfo.address1)}</p>}
              {addressInfo.address2 && <p>{capitalize(addressInfo.address2)}</p>}
              {(addressInfo.city || addressInfo.state || addressInfo.zipcode) && <p>{addressInfo.city}, {addressInfo.state}, {addressInfo.zipcode}</p>}
              {addressInfo.phoneNumber && <p>{normalizePhoneNumber(addressInfo.phoneNumber)}</p>}
              {addressInfo.email && <p> {addressInfo.email.toLowerCase()}</p>}
            </div>
          )}
      </div>
    );
  }
}

ShippingAddress.propTypes = {
  cqContent: PropTypes.object,
  addressInfo: PropTypes.object,
  updateEditState: PropTypes.func,
  invalidateAsyncFetch: PropTypes.func,
  loginMTN: PropTypes.string,
  orderID: PropTypes.string,
  sendSMS: PropTypes.func,
  validateAuthCode: PropTypes.func,
  asyncCallStatus: PropTypes.object,
  fetchSMSDevices: PropTypes.func,
  showErrorNotification: PropTypes.func,
  authEnabled: PropTypes.bool,
  formEnabled: PropTypes.bool,
  updateShippingAddress: PropTypes.func,
  // ispuEligibleFlag: PropTypes.bool,
  checkoutStates: PropTypes.object,
  // textUpdateNumber: PropTypes.string,
  // activeSMSCapableMtnList: PropTypes.array,
  ispuEligibleFlag: PropTypes.bool,
};
export default ShippingAddress;
