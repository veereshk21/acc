/* eslint-disable no-class-assign,no-nested-ternary */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { renderTextField } from '../../common/TextField';
import Button from '../../common/Button/Button';
import Title from '../../common/Title/Title';
import Loader from './../../common/Loader/Loader';
import HorizontalRule from '../../common/HorizontalRule';

const validate = (values, props) => {
  const errors = {};
  const simId = values.get('simId');
  if (!simId) {
    errors.simId = props.cqJSON.label.OD_BYOD_FIELD_REQUIRED;
  }
  return errors;
};

class IMEIComponent extends Component {
  submitSIM = (obj) => {
    const { validateSIM, deviceId, validateSIMUrl } = this.props;
    validateSIM(Object.assign({}, obj, { deviceId }), validateSIMUrl);
  };
  isNumberKey = (e) => {
    const key = e.keyCode ? e.keyCode : e.which;
    if (!([8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
      (key === 65 && (e.ctrlKey || e.metaKey)) ||
      (key >= 35 && key <= 40) ||
      (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
      (key >= 96 && key <= 105)
    )) {
      e.preventDefault();
    }
  }
  render() {
    const {
      cqJSON, handleSubmit, valid, submitting, isFetching,
    } = this.props;
    return (
      <Grid className="pad32">
        {isFetching && <Loader />}
        <Row>
          <Col xs={12}>
            <Title >{cqJSON.label.OD_BYOD_SIM_YOUR_ID}</Title>
            <HorizontalRule />
          </Col>
        </Row>
        <Row >
          <Col xs={12}>
            <Field
              className="leftAlign width100 fontSize_4"
              name="simId"
              id="simId"
              component={renderTextField}
              type="number"
              label="Enter SIM Number"
              autoFocus
              onKeyDown={this.isNumberKey}
              pattern="[0-9]*"
              maxLength="25"
            />
          </Col>
          <Col xs={12} className="margin24 noSideMargin">
            <div dangerouslySetInnerHTML={{ __html: cqJSON.html.OD_BYOD_SIM_INSTRUCTIONS }} />
          </Col>
          <Col xs={12} className="footerFixed">
            <Button
              className="button primary width40"
              type="submit"
              disabled={!valid || submitting}
              analyticstrack="submit-exixiting-sim"
              onClick={
                handleSubmit((data) => {
                  const formData = data.toJS();
                  this.submitSIM(Object.assign({}, formData));
                })
              }
            >{cqJSON.label.OD_BYOD_NEXT_CTA_TEXT}
            </Button>
          </Col>
        </Row>

      </Grid>
    );
  }
}

IMEIComponent.propTypes = {
  validateSIM: PropTypes.func,
  deviceId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  cqJSON: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  validateSIMUrl: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
};
IMEIComponent = reduxForm({
  form: 'imeiVerification',
  validate,
})(IMEIComponent);

export default IMEIComponent;
