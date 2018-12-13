import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import AsyncComponent from '../../../common/AsyncComponent';
import ShippingOptions from './shipTypes';
import { EDIT_STATE } from '../../constants';

const Modal = AsyncComponent(() => import('../../../common/Modal'));
const InStorePickUp = AsyncComponent(() => import('../../containers/ispu'));
const DeliveryOptions = AsyncComponent(() => import('./deliveryMethods'));
const ISPUModalCC = AsyncComponent(() => import('../../containers/ispu/ISPUModalCC'));


class ShippingMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingType: props.selectedShippingMethod,
      showISPUEdit: false,
      ispuModalVisible: false,
      sddDropdownVisible: (props.selectedShippingMethod ? props.selectedShippingMethod.sddAvailableWindows : null),
      selectedWindow: props.selectedDeliveryWindow,
      showDeliveryOptions: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { selectedShippingMethod, selectedShippingRadio } = this.props;
    if (prevProps.selectedShippingRadio !== selectedShippingRadio && (prevProps.selectedShippingRadio || !selectedShippingMethod)) {
      if (selectedShippingRadio === 'ISPU') {
        this.showIspuModal();
      } else {
        // this.submitShippingInfo();
      }
    }
  }
  onISPUClick = () => {
    if (this.props.selectedShippingRadio === 'ISPU') {
      this.showIspuModal();
    } else {
      this.props.change('shippingRadio', 'ISPU');
    }
  }
  showIspuModal = () => {
    this.setState({ ispuModalVisible: true });
    this.props.asyncFetch();
  }

  closeIspuModal = () => {
    this.setState({ ispuModalVisible: false });
    this.props.change('shippingRadio', (this.props.selectedShippingMethod ? this.props.selectedShippingMethod.shippingOptionId : ''));
  }
  ispuSuccessful = () => {
    this.setState({ ispuModalVisible: false });
  }

  submitShippingInfo = () => {
    const {
      shippingInfo, selectedShippingRadio, flow, standaloneAccessories, selectedDeliveryWindow,
    } = this.props;
    const param = {
      ...shippingInfo.addressInfo,
      shippingType: selectedShippingRadio,
      shippingAddressType: 'shipToMe',
      shipToType: (shippingInfo.addressInfo.businessName !== null) ? 'business' : 'residence',
      flow,
      showUpdatedAddress: true,
      standaloneAccessories,
      deliveryWindow: (selectedDeliveryWindow && selectedShippingRadio === 'SDD_SAMEDAY') ? selectedDeliveryWindow : null,
      shipOptionChangeOnly: true,
    };
    for (const prop in param) {
      if (param[prop] === null) {
        delete param[prop];
      }
    }
    if (shippingInfo.shippingTypesInfo.length > 1) {
      this.props.updateShippingInfo(param);
    }
    this.props.updateEditState(EDIT_STATE.DELIVERY, false);
  }


  render() {
    const { editState, useISPUCC } = this.props;
    return (
      <div id="shippingMethodSection">
        {!useISPUCC && this.state.ispuModalVisible &&
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
        {useISPUCC && this.state.ispuModalVisible &&
          <ISPUModalCC
            ispuSuccessful={this.ispuSuccessful}
            toggleModal={this.closeIspuModal}
            ispuModalVisible={this.state.ispuModalVisible}
          />
        }
        {/* Shipping Method Selection */}

        {!editState[EDIT_STATE.DELIVERY] &&
          <ShippingOptions
            {...this.props}
            onISPUClick={this.onISPUClick}
          />
        }
        {editState[EDIT_STATE.DELIVERY] &&
          <DeliveryOptions
            {...this.props}
            submitShippingInfo={this.submitShippingInfo}
          />

        }
      </div>
    );
  }
}

ShippingMethod.propTypes = {
  // cqContent: PropTypes.object,
  updateEditState: PropTypes.func,
  shippingInfo: PropTypes.object,
  selectedShippingMethod: PropTypes.object,
  selectedShippingRadio: PropTypes.string,
  flow: PropTypes.string,
  standaloneAccessories: PropTypes.bool,
  updateShippingInfo: PropTypes.func,
  selectedDeliveryWindow: PropTypes.string,
  change: PropTypes.func,
  asyncFetch: PropTypes.func,
  editState: PropTypes.object,
  useISPUCC: PropTypes.bool,
};

// export default ShippingMethod;
export default reduxForm({
  form: 'chooseShippingMethod',
  enableReinitialize: true,
  // validate,
})(ShippingMethod);
