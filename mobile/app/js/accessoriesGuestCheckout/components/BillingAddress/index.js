/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import { Grid, Row, Col } from 'react-flexbox-grid';
import * as validation from '../../../common/validation';
import Title from './../../../common/Title/Title';
import HorizontalRule from '../../../common/HorizontalRule';
import BillingAddressForm from './BillingAddressForm';
import BackButton from '../../../common/BackButton/';
import Loader from '../../../common/Loader/Loader'

class BillingAddress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {}

  }

  handleSubmitBillingForm = (data) => {
    const billingAddress = Object.assign(data, {}, { sameAsShipping: this.props.sameAsShipping });
    this.props.updateBillingAddress({billingAddress});
  }
  render() {
    const { isFetching, cq, stepsCompleted } = this.props;

    return (
      <Grid className="noSidePad pad12">
        {isFetching === true && <Loader />}
        {stepsCompleted.billingAddress && <BackButton to="/" />}
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <Title className="noSidePad marin24 onlyTopMargin">{cq.label.OD_CHECKOUT_BILLING_ADDRESS_TEXT}</Title>
            <HorizontalRule />
          </Col>
        </Row>
        <BillingAddressForm
          {...this.props}
          handleBusinessAddressChange={this.handleBusinessAddressChange}
          sameAsShipping={this.props.sameAsShipping}
          handleSubmitBillingForm={this.handleSubmitBillingForm}
        />

      </Grid >);
  }
}

BillingAddress.propTypes = {
  cq: PropTypes.object,
  updateBillingAddress: PropTypes.func,
  states: PropTypes.array,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

BillingAddress.defaultProps = {};
export default BillingAddress;
