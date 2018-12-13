import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Loader from '../../common/Loader/Loader';
import Title from '../../common/Title/Title';
import { renderTextField } from '../../common/TextField';
import MSelect from '../../common/Select';
import HorizontalRule from '../../common/HorizontalRule';

const validate = (values, props) => {
  const errors = {};
  const zipCode = values.get('zipCode');
  const selectedMtn = values.get('selectedMtn');
  if (!zipCode || !/^\d{5}-\d{4}$|^\d{5}$/.test(zipCode)) {
    errors.zipCode = 'Please enter a 5-digit zip code.';
  }
  if (!props.mtns || (props.mtns.length === 0 && !selectedMtn)) {
    errors.selectedMtn = 'Currently no numbers are available for this location. Please enter a different ZIP code.';
  } else if (props.mtns.length >= 0 && !selectedMtn) {
    errors.selectedMtn = 'Please select a number';
  }

  return errors;
};

const validateZipCode = (zipCode) => {
  let isValid = true;
  if (!/^\d{5}-\d{4}$|^\d{5}$/.test(zipCode)) {
    isValid = false;
  }
  return isValid;
};

class NpanxxComponent extends Component {
  constructor(props) {
    super(props);
    this.zipCodeChanged = this.zipCodeChanged.bind(this);
    this.state = {
      zipCodeLbl: props.cqContent.label.OD_NPANXX_LABEL_ZIPCODE,
    };
  }


  componentDidMount() {
    const { mtns, touch } = this.props;
    if (mtns.length === 0) {
      touch('selectedMtn');
    }
  }
  shouldComponentUpdate(nextProps) {
    const { touch } = this.props;
    if (nextProps.mtns.length === 0) {
      touch('selectedMtn');
    }
    return true;
  }

  onFieldBlur = (event) => {
    if (validateZipCode(event.target.value)) {
      this.setState({
        zipCodeLbl: this.props.cqContent.label.OD_NPANXX_LABEL_ZIPCODE,
      });
    } else {
      this.setState({
        zipCodeLbl: ' ',
      });
    }
    if (event.target.value === '') {
      this.setState({
        zipCodeLbl: this.props.cqContent.label.OD_NPANXX_LABEL_ZIPCODE,
      });
    }
  }
  onFieldFocus = () => {
    this.setState({
      zipCodeLbl: this.props.cqContent.label.OD_NPANXX_LABEL_ZIPCODE,
    });
  }
  zipCodeChanged(event) {
    if (validateZipCode(event.target.value)) {
      this.setState({
        zipCodeLbl: this.props.cqContent.label.OD_NPANXX_LABEL_ZIPCODE,
      });
      this.props.fetchMtns(event.target.value, this.props.ajaxCallUrl);
    }
  }

  render() {
    const {
      handleSubmit, valid, submitting, isFetching, mtns, orderId, commerceItemId, submitNpanxx, cqContent, submitUrl,
    } = this.props;
    return (
      <Grid className="pad24 noSidePad">
        {isFetching === true && <Loader />}
        <Row className="pad24 onlySidePad">
          <Col xs={12}>
            <Title>{cqContent.label.OD_NPANXX_MAIN_TITLE}</Title>
          </Col>
        </Row>
        <Row className="noSideMargin pad24 onlySidePad">
          <Col xs={12} className="pad12 noSidePad">
            <p className="fontSize_3 ">{cqContent.label.OD_NPANXX_MAIN_SUB_TITLE}</p>
            <HorizontalRule />
          </Col>
        </Row>
        <form>
          <Row className="noSideMargin pad24 onlySidePad">
            <Col xs={12} className="pad12 noSidePad">
              <Field
                component={renderTextField}
                type="text"
                id="zipCode"
                name="zipCode"
                className=""
                maxLength="5"
                onChange={this.zipCodeChanged}
                tabIndex="-1"
                label={this.state.zipCodeLbl}
                aria-label={cqContent.label.OD_NPANXX_LABEL_ZIPCODE}
                ref={(zip) => this.zipCode = zip}
                onBlur={this.onFieldBlur}
                onFocus={this.onFieldFocus}
                analyticstrack="update-zipcode"
              />
            </Col>
          </Row>
          <Row className="noSideMargin pad24 onlySidePad">
            <Col xs={12} className="pad12 noSidePad">
              <MSelect
                name="selectedMtn"
                id="selectedMtn"
                className="fontSize_4 color_000"
                borderStyle
                required
                disabled={mtns.length === 0}
                label={cqContent.label.OD_NPANXX_LABEL_PHONENUMBER}
                analyticstrack="choose-npanxx"
              >
                {mtns.map((mtn, i) => (
                  <option key={mtn + '-' + i} value={mtn}>{mtn}</option>
                ))}
              </MSelect>
            </Col>
          </Row>
        </form>

        <Row className="textAlignCenter pad24">
          <Col xs={12}>
            <button
              className="primary button large"
              type="submit"
              disabled={!valid || submitting || mtns.length === 0}
              analyticstrack="submit-new-number"
              onClick={
                handleSubmit((data) => {
                  submitNpanxx(Object.assign({}, data.toJS()), orderId, commerceItemId, submitUrl);
                })
              }
            >{cqContent.label.OD_NPANXX_NEXT_CTA}
            </button>
          </Col>
        </Row>
      </Grid>
    );
  }
}


NpanxxComponent.propTypes = {
  handleSubmit: PropTypes.func,
  submitNpanxx: PropTypes.func,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  isFetching: PropTypes.bool,
  cqContent: PropTypes.object,
  mtns: PropTypes.array,
  commerceItemId: PropTypes.string,
  orderId: PropTypes.string,
  submitUrl: PropTypes.string,
  fetchMtns: PropTypes.func,
  ajaxCallUrl: PropTypes.string,
  touch: PropTypes.func,
};

export default reduxForm({
  form: 'npanxxForm',
  enableReinitialize: true,
  validate,
})(NpanxxComponent);
