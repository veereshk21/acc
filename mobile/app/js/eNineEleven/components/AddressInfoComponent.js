import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Title from '../../common/Title/Title';
import { renderTextField } from '../../common/TextField/';
import MSelect from '../../common/Select/';
import { hashHistory } from './../../store';
import Loader from '../../common/Loader/Loader';
import HorizontalRule from '../../common/HorizontalRule';

const styles = {
  position: 'relative',
  bottom: '-6px',
  fontSize: '12px',
  lineHeight: '12px',
  color: 'rgb(255, 188, 61)',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
};

const validate = (values, props) => {
  const errors = {};

  const address1 = values.get('address1');
  const city = values.get('city');
  const state = values.get('state');
  const zipcode = values.get('zipcode');
  const firstName = values.get('firstName');
  const lastName = values.get('lastName');

  if (!firstName) {
    errors.firstName = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(firstName)) {
    errors.firstName = props.cqContent.error.OD_ENE_ERROR_FIRSTNAME;
  }
  if (!lastName) {
    errors.lastName = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(lastName)) {
    errors.lastName = props.cqContent.error.OD_ENE_ERROR_LASTNAME;
  }
  if (!address1) {
    errors.address1 = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z0-9\-\. ',#&;/\s]+$/i.test(address1)) { // eslint-disable-line
    errors.address1 = props.cqContent.error.OD_ENE_ERROR_ADDRESS1;
  }
  if (!city) {
    errors.city = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(city)) {
    errors.city = props.cqContent.error.OD_ENE_ERROR_CITY;
  }
  if (!zipcode) {
    errors.zipcode = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^\d{5}-\d{4}$|^\d{5}$/i.test(zipcode)) {
    errors.zipcode = props.cqContent.error.OD_ENE_ERROR_ZIPCODE;
  }

  if (!state || state === 'STATE') {
    errors.state = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  }

  return errors;
};

class AddressInfoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldsTouched: false,
      showWarnings: false,
    };
  }

  componentWillMount() {
    const { pageJSON } = this.props;
    if (pageJSON.addressInfo) {
      hashHistory.push('/addressOptions');
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.showWarnings) {
      this.setState({
        fieldsTouched: false,
        showWarnings: true,
      });
    }
  }

  focus = () => {
    this.setState({
      fieldsTouched: true,
    });
  }
  render() {
    const {
      cqContent, handleSubmit, submitting, isFetching, onUpdateAddress, valid,
    } = this.props;
    const { states, updateAddressUrl } = this.props.pageJSON;
    const { fieldsTouched, showWarnings } = this.state;
    return (
      <Grid className="pad32">
        {isFetching && <Loader />}
        <form>
          <Row>
            <Col xs={12}>
              <Title className="noSidePad">{cqContent.label.OD_ENE_PAGE_TITLE}</Title>
              <p className="fontSize_1_3 pad6 onlyTopPad">{cqContent.label.OD_ENE_PAGE_SUB_TITLE}</p>
              <HorizontalRule />
            </Col>
          </Row>
          <Row >
            <Col xs={12} className="margin12 onlyBottomMargin">
              <Field
                component={renderTextField}
                type="text"
                id="firstName"
                name="firstName"
                label={cqContent.label.OD_ENE_FIRSTNAME}

              />
            </Col>

            <Col xs={12} className="margin12 onlyBottomMargin">
              <Field
                component={renderTextField}
                type="text"
                id="lastName"
                name="lastName"
                label={cqContent.label.OD_ENE_LASTNAME}
              />
            </Col>
            <Col xs={12} className="margin12 onlyBottomMargin">
              <Field
                onFocus={this.focus}
                component={renderTextField}
                type="text"
                id="address1"
                name="address1"
                label={cqContent.label.OD_ENE_ADDRESS1}
                errorText={(!fieldsTouched && showWarnings) && cqContent.error.OD_ENE_ERROR_ADDRESS1}
              />

            </Col>

            <Col xs={12} className="margin12 onlyBottomMargin">
              <Field
                component={renderTextField}
                type="text"
                id="address2"
                name="address2"
                label={cqContent.label.OD_ENE_ADDRESS2}
              />
            </Col>

            <Col xs={12} className="margin12 onlyBottomMargin">
              <Field
                onFocus={this.focus}
                component={renderTextField}
                type="text"
                id="city"
                name="city"
                label={cqContent.label.OD_ENE_CITY}
                errorText={(!fieldsTouched && showWarnings) && cqContent.error.OD_ENE_ERROR_CITY}
              />
            </Col>

            <Col xs={12} className="margin12 onlyBottomMargin">
              <Row>
                <Col xs={6} className="positionRelative">
                  <MSelect
                    name="state"
                    aria-label={cqContent.label.OD_ENE_STATE}
                    id="state"
                    borderStyle
                    required
                    onFocus={this.focus}
                    label={cqContent.label.OD_ENE_STATE}
                    errorText={(!fieldsTouched && showWarnings) && cqContent.error.OD_ENE_ERROR_CITY}
                    analyticstrack="choose-e911-state"
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </MSelect>
                  {(!fieldsTouched && showWarnings) &&
                    <span
                      style={styles}
                    > {cqContent.error.OD_ENE_ERROR_STATE}
                    </span>}
                </Col>
                <Col xs={6}>
                  <Field
                    onFocus={this.focus}
                    component={renderTextField}
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    label={cqContent.label.OD_ENE_ZIPCODE}
                    errorText={(!fieldsTouched && showWarnings) && cqContent.error.OD_ENE_ERROR_ZIPCODE}
                  />

                </Col>
              </Row>
            </Col>

          </Row>
          <div className="clearfix textAlignCenter pad24">
            <button
              type="submit"
              className="button large"
              disabled={!valid || submitting}
              analyticstrack="submit-e911-address"
              onClick={
                handleSubmit((data) => {
                  onUpdateAddress(Object.assign({}, data.toJS(), { e911AddressValidated: false }), updateAddressUrl);// dispatches add new card action
                })
              }
            >Continue
            </button>
          </div>
        </form>
      </Grid>
    );
  }
}

AddressInfoComponent.propTypes = {
  cqContent: PropTypes.object,
  handleSubmit: PropTypes.func,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  isFetching: PropTypes.bool,
  onUpdateAddress: PropTypes.func,
  pageJSON: PropTypes.object,
};

export default reduxForm({
  form: 'addressInfoForm',
  validate,
})(AddressInfoComponent);

