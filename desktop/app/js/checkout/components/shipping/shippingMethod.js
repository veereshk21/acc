import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form/immutable';
import RadioButton from '../../../common/RadioButton/index';
import MSelect from '../../../common/Select/index';
import AsyncComponent from '../../../common/AsyncComponent';


const Modal = AsyncComponent(() => import('../../../common/Modal'));
const InStorePickUp = AsyncComponent(() => import('../../containers/ispu'));
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
    };
  }

  // componentWillReceiveProps = (nextProps) => {
  //   if (nextProps.selectedShippingMethod.shippingOptionId === 'ISPU') {
  //     this.showIspuModal();
  //   }
  // }
  componentDidUpdate(prevProps) {
    const { selectedShippingMethod, selectedShippingRadio, selectedDeliveryWindow } = this.props;
    if (prevProps.selectedShippingRadio !== selectedShippingRadio && (prevProps.selectedShippingRadio || !selectedShippingMethod)) {
      if (selectedShippingRadio === 'ISPU') {
        this.showIspuModal();
      } else if (selectedShippingRadio === 'SDD_SAMEDAY') {
        this.showSddDropdown();
        if (selectedDeliveryWindow && selectedDeliveryWindow !== 'title' && selectedDeliveryWindow !== '') {
          this.submitShippingInfo();
        }
      } else {
        this.hideSddDropdown();
        this.submitShippingInfo();
      }
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

  showSddDropdown = () => {
    this.setState({ sddDropdownVisible: true });
  }

  hideSddDropdown = () => {
    this.setState({ sddDropdownVisible: false });
  }

  changeShipping(e) {
    if (e.target.value !== 'title') {
      this.setState({ selectedWindow: e.target.value }, () => this.submitShippingInfo());
    }
  }

  submitShippingInfo() {
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
  }

  renderOptions = () => {
    const { shippingInfo, cqContent } = this.props;
    const renderedOptions = shippingInfo.shippingTypesInfo.map((option, index) => {
      const radioName = `shippingRadio${index}`;
      const radioBTNClass = (option.ispuOption === true && ((shippingInfo.contactInfo.activeSMSCapableMtnList === null) || (shippingInfo.contactInfo.activeSMSCapableMtnList.length === 0)));
      return (
        <Row key={index} className="pad6 noSidePad">
          <Col xs={5}>
            <RadioButton
              disabled={radioBTNClass}
              name="shippingRadio"
              id={radioName}
              value={option.shippingOptionId}
              containerClassName=" "
              labelClassName="displayInlineBlock onlyLeftPad pad12 verticalCenter width85 radioLabel"
              analyticstrack="shipping-shippingMethod-radio"
            >
              <p>{option.shippingDescription}</p>
            </RadioButton>
            {/* ISPU, Empty contact info error */}
            {(option.ispuOption === true && ((shippingInfo.contactInfo.activeSMSCapableMtnList === null) || (shippingInfo.contactInfo.activeSMSCapableMtnList.length === 0))) && <div className="normalText pad10 onlySidePad textAlignJustify"> {cqContent.error.OD_CHECKOUT_EMPTY_CONTACT_NUMBER_ERROR}</div>}
          </Col>
          <Col xs={3}>
            <p className="pad3 noSidePad">{parseInt(option.shippingCost, 10) > 0 ? `$${option.shippingCost}` : 'Free'}</p>
          </Col>
          <Col xs={4}>
            <p className="pad3 noSidePad">{option.estimatedDeliveryDateText}</p>
          </Col>
        </Row>
      );
    });
    return renderedOptions;
  }

  render() {
    const { cqContent, shippingInfo, poboMessage, selectedShippingRadio, useISPUCC } = this.props;
    const sddJSON = shippingInfo.shippingTypesInfo.filter((option) => option.shippingOptionId === 'SDD_SAMEDAY');
    const availWindows = sddJSON && sddJSON.length === 1 ? sddJSON[0] : sddJSON;

    return (
      <div>
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
        <div className="margin20 noSideMargin">
          <Row>
            <Col xs={5}>
              <p className="h3">
                {cqContent.label.DT_OD_CHECKOUT_SHIPPING_METHOD_HEADER_SHIPPING_OPTION}
              </p>
            </Col>
            <Col xs={3}>
              <p className="h3">
                {cqContent.label.DT_OD_CHECKOUT_SHIPPING_METHOD_HEADER_PRICE}
              </p>
            </Col>
            <Col xs={4}>
              <p className="h3">
                {cqContent.label.DT_OD_CHECKOUT_SHIPPING_METHOD_HEADER_DELIVERY_ESTIMATE}
              </p>
            </Col>
          </Row>
        </div>
        <fieldset className="noMargin noPad" style={{ border: 'none' }}>
          <legend className="is-visuallyHidden">Shipping Methods</legend>
          {this.renderOptions()}
        </fieldset>

        {this.state.sddDropdownVisible && sddJSON.length === 1 && availWindows.sddAvailableWindows &&
          <div className="margin45 onlyTopMargin width60">
            <MSelect
              name="availWindows"
              id="availWindows"
              onChange={this.changeShipping.bind(this)}
              borderStyle
              label={'Choose a delivery window'}
              labelClassName="bold fontSize_5 color_00"
              labelStyle={{ color: '#000000', fontSize: '16px' }}
              value={this.state.selectedWindow}
            >
              <option key="-1" value="title">Pick delivery time</option>
              {availWindows.sddAvailableWindows.map((option, index) => (
                <option key={index} value={option.id} >{option.formattedWindow}</option>
              ))}
            </MSelect>
          </div>
        }
        {/* PO/BO Message */}
        {poboMessage && selectedShippingRadio !== 'ISPU' &&
          <p className="margin36 onlyTopMargin">{poboMessage}</p>
        }
        {/* Shipping Method Disclaimer */}
        <div className="margin20 noSideMargin" dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CHECKOUT_SHIPPING_METHOD_DISCLAIMER }} />
      </div>
    );
  }
}

ShippingMethod.propTypes = {
  cqContent: PropTypes.object,
  shippingInfo: PropTypes.object,
  selectedShippingMethod: PropTypes.object,
  selectedShippingRadio: PropTypes.string,
  flow: PropTypes.string,
  standaloneAccessories: PropTypes.bool,
  updateShippingInfo: PropTypes.func,
  selectedDeliveryWindow: PropTypes.string,
  poboMessage: PropTypes.string,
  change: PropTypes.func,
  asyncFetch: PropTypes.func,
  useISPUCC: PropTypes.bool,
};
// export default ShippingMethod;
export default reduxForm({
  form: 'chooseShippingMethod',
  enableReinitialize: true,
  // validate,
})(ShippingMethod);
