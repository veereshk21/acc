/**
 * Created by mambig on 1/3/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import DeliveryInformationForm from './DeliveryInformationForm';
import Title from '../../common/Title/Title';
import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule';

import Loader from '../../common/Loader/Loader';

class DeliveryInformation extends Component {
  componentDidMount = () => {
    if (this.props.shippingAddressChangeRequired) {
      this.props.showErrorNotification(this.props.cqContent.error.OD_CHECKOUT_ADDRESS_UPDATE_REQUIRED_ERROR);
    }
  }
  notifySecurePinIneligible = () => {
    const { cqContent } = this.props;
    this.props.showErrorNotification(cqContent.error.OD_CHECKOUT_ADDRESS_UPDATE_PROMPT_TEXT);
  }

  submitShippingInfo = (data) => {
    const { selectedShippingInfo, cqContent } = this.props;
    this.props.updateShippingAddress(Object.assign({}, data.toJS(), selectedShippingInfo), cqContent.error.OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT);
  }

  render() {
    const {
      cqContent, addressInfo, shippingAddressRequired, shippingAddressChangeRequired, smsAuthenticationComplete, securePinPageUrl, securePinEligible, states, isFetching,
    } = this.props;

    return (
      <Grid className="pad12 noSidePad">
        {isFetching === true && <Loader />}


        {(shippingAddressRequired === false && shippingAddressChangeRequired === false) &&
          <Row className="noSideMargin">
            <Col xs={12} className="noSidePad">
              <BackButton to="/" >{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton>
            </Col>
          </Row>
        }
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <Row className="noSideMargin ">
              <Col xs={12} className="noSidePad">
                <Title className="h1">{cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_TITLE_TEXT}</Title>
                <p className="color_six_gray fontSize_1_3">{cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_TITLE_DESCRIPTION_TEXT}</p>
                <HorizontalRule />
              </Col>
            </Row>
            <DeliveryInformationForm
              states={states}
              cqContent={cqContent}
              initialValues={addressInfo}
              formEnabled={smsAuthenticationComplete}
              authEnabled={securePinEligible}
              authUrl={securePinPageUrl}
              notifySecurePinIneligible={this.notifySecurePinIneligible}
              onSubmit={this.submitShippingInfo.bind(this)}
              shippingAddressChangeRequired={shippingAddressChangeRequired}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
DeliveryInformation.propTypes = {
  cqContent: PropTypes.object,
  addressInfo: PropTypes.object,
  shippingAddressRequired: PropTypes.bool,
  shippingAddressChangeRequired: PropTypes.bool,
  smsAuthenticationComplete: PropTypes.bool,
  securePinPageUrl: PropTypes.string,
  securePinEligible: PropTypes.bool,
  selectedShippingInfo: PropTypes.any,
  updateShippingAddress: PropTypes.func,
  showErrorNotification: PropTypes.func,
  states: PropTypes.array,
  isFetching: PropTypes.bool,
};
export default DeliveryInformation;
