/* eslint-disable no-class-assign,no-nested-ternary */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form/immutable';

import { renderTextField } from '../../common/TextField/';
import Button from '../../common/Button/Button';
import Title from '../../common/Title/Title';
import MyDevices from './MyDevices';
import HorizontalRule from '../../common/HorizontalRule';

const validate = (values, props) => {
  const errors = {};
  const deviceId = values.get('deviceId');
  if (!deviceId) {
    errors.deviceId = props.cqJSON.label.OD_BYOD_FIELD_REQUIRED;
  } else if (!/^[0-9]{11,16}|[a-fA-F0-9]{8,14}$/.test(deviceId)) {
    errors.deviceId = 'dvefd';
  }
  return errors;
};


class IMEIComponent extends Component {
  submitIMEI = (obj) => {
    const { validateIMEI, validateIMEIUrl } = this.props;
    validateIMEI(obj, validateIMEIUrl);
  };
  render() {
    const {
      cqJSON, handleSubmit, valid, submitting, model, mydevices, previousDevicesAvailable,
    } = this.props;

    let _make = 'OD_BYOD_DEVICE_INSTRUCTIONS_GENERIC';
    if (typeof model !== 'undefined' && model !== null && typeof model.os !== 'undefined' && model.os !== null) {
      if (model.deviceCategory !== 'Smartwatch') {
        _make = 'OD_BYOD_DEVICE_INSTRUCTIONS_' + model.os.toUpperCase();
      } else {
        _make = 'OD_BYOD_DEVICE_INSTRUCTIONS_WEARABLE';
      }
    } else {
      _make = 'OD_BYOD_DEVICE_INSTRUCTIONS_GENERIC';
    }
    return (
      <Grid >
        <Row className="background_00 pad6 noBottomPad clearfix" >
          <Col xs={12}>
            <a
              href="#imei"
              className={`byod_tab ${!mydevices && 'm-active'}`}
              style={{ marginBottom: '0px' }}
              analyticstrack="show-imei-tab"
            >{cqJSON.label.OD_BYOD_DEVICE_ID_LABEL}
            </a>
            {previousDevicesAvailable &&
              <a
                href="#imei/mydevices"
                className={`byod_tab ${mydevices && 'm-active'}`}
                style={{ marginBottom: '0px' }}
                analyticstrack="show-mydevices-tab"
              >{cqJSON.label.OD_BYOD_MY_DEVICES}
              </a>
            }
          </Col>
        </Row>

        {!mydevices ?
          <Row className="pad32">
            <Col xs={12}>
              <Title dangerouslySetInnerHTML={{ __html: cqJSON.label.OD_BYOD_IMEI_PAGE_TITLE }} />
              <HorizontalRule />
            </Col>
            <Col xs={12}>
              <Field
                className="leftAlign width100 fontSize_4"
                name="deviceId"
                id="deviceId"
                component={renderTextField}
                type="text"
                placeholder={cqJSON.label.OD_BYOD_DEVICE_ID_IMEI_LABEL}
                autoFocus
                pattern="[0-9]*"
                maxLength="18"
              />
              <div className="pad24 noSidePad">
                <div dangerouslySetInnerHTML={{ __html: cqJSON.html[_make] }} />
              </div>
            </Col>
            <Col className="footerFixed textAlignCenter">
              <Button
                className="button primary width40"
                type="submit"
                disabled={!valid || submitting}
                analyticstrack="submit-imei"
                onClick={
                  handleSubmit((data) => {
                    const formData = data.toJS();
                    this.submitIMEI(Object.assign({}, formData));
                  })
                }
              >{cqJSON.label.OD_BYOD_NEXT_CTA_TEXT}
              </Button>
            </Col>
          </Row> :
          <MyDevices {...this.props} submitIMEI={this.submitIMEI} />}
      </Grid>
    );
  }
}

IMEIComponent.propTypes = {
  validateIMEI: PropTypes.func,
  cqJSON: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  model: PropTypes.object,
  validateIMEIUrl: PropTypes.string.isRequired,
  selectedDevice: PropTypes.string,
  previousDevicesAvailable: PropTypes.bool,
  mydevices: PropTypes.bool,
};
IMEIComponent = reduxForm({
  form: 'imeiVerification',
  validate,
})(IMEIComponent);

export default IMEIComponent;
