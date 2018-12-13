/**
 * Created by hmahad on 1/10/2017.
 */
/* eslint-disble react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { renderTextField } from '../../common/TextField';
import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule';

const validate = (values) => {
  const errors = {};

  const promoCode = values.get('promoCode');

  if (!promoCode) {
    errors.promoCode = 'Required';
  }

  return errors;
};


class CartPromoCode extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // Accessibility focus fix for hash navigation
    const pageTitle = document.getElementById('section_title');
    if (pageTitle) {
      //  pageTitle.focus();
    }
    this.props.hideNotification();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isFetching) {
      return;
    }
    window.hideLoader();
  }
  render() {
    const {
      handleSubmit, valid, submitting, checkPromoCode,
    } = this.props;
    return (
      <Grid className="pad12 onlyTopPad">
        <Row className="noSideMargin">
          <Col xs={12} className="noSidePad">
            <BackButton to="/" />
          </Col>
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <Row className="noSideMargin ">
              <Col xs={12} className="noSidePad">
                <h1 className=" noSidePad">{this.props.CQLabel.get('OD_CART_PROMO_CODE_TITLE')}</h1>
                <HorizontalRule />
              </Col>
            </Row>
            <form >
              <Row>
                <Col xs={12}>
                  <Field
                    className="leftAlign fontSize_4"
                    name="promoCode"
                    id="promoCode"
                    component={renderTextField}
                    type="text"
                    label={this.props.CQLabel.get('OD_CART_PROMO_CODE')}
                    autoFocus
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="textAlignCenter pad32 noSidePad">
                  <button
                    className="primary button large"
                    type="submit"
                    disabled={!valid || submitting}
                    onClick={
                      handleSubmit((data) => {
                        const formData = data.toJS();
                        checkPromoCode(formData.promoCode);
                      })
                    }
                    analyticstrack="apply-promo-code"
                  >{this.props.CQLabel.get('OD_CART_PROMO_CODE_APPLY_CTA')}
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

CartPromoCode.propTypes = {
  CQLabel: PropTypes.object,
  handleSubmit: PropTypes.func,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  checkPromoCode: PropTypes.func,
  hideNotification: PropTypes.func,
};

export default reduxForm({
  form: 'promoCodeForm',
  validate,
})(CartPromoCode);
