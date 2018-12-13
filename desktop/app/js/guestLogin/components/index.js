import { Field, reduxForm } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { renderTextField } from '../../common/TextField/';
import Checkbox from './../../common/Checkbox/index';
import Button from './../../common/Button/Button';

const styles = {
  place: {
    marginLeft: 15,
    fontSize: 18,
  },
};

const validate = (values, props) => {
  const errors = {};

  const userName = values.get('IDToken1');
  const password = values.get('IDToken2');

  if (!userName) {
    errors.IDToken1 = props.cqContent.error.DT_OD_GUEST_LOGIN_USERNAME_FIELD_REQUIRED_TEXT;
  }

  if (!password) {
    errors.IDToken2 = props.cqContent.error.DT_OD_GUEST_LOGIN_PASSWORD_FIELD_REQUIRED_TEXT;
  }

  return errors;
};

class GuestLogin extends Component {
  static propTypes = {
    cqContent: PropTypes.object,
    ctadisabled: PropTypes.bool,
    submitLogin: PropTypes.func,
    guestCheckoutEnabled: PropTypes.bool,
    guestLogInEnabled: PropTypes.bool,
    guestCheckoutURL: PropTypes.string,
    amLoginURL: PropTypes.string,
    forgotPwdURL: PropTypes.string,
    forgotUsernameURL: PropTypes.string,
    privacyPolicyURL: PropTypes.string,
    amGotoURL: PropTypes.string,
  };

  submitLogin = () => {
    this.props.submitLogin();
  }

  render() {
    const { cqContent, ctadisabled } = this.props;
    return (
      <Grid fluid id="guestLogin">
        <Row style={{ margin: '36px 0' }}>
          <h1>{cqContent.label.DT_OD_GUEST_LOGIN_BEGIN_TITLE}</h1>
        </Row>
        <Row style={{ margin: '12px 0 36px' }}>
          {this.props.guestLogInEnabled &&
            <Col xs={6} className="background_gray_one border_CC" style={{ padding: 60 }}>
              <form action={this.props.amLoginURL} method="post">
                <h2 className="bold fontSize_10 margin12 onlyBottomMargin">
                  {cqContent.label.DT_OD_GUEST_LOGIN_SIGN_IN_TITLE}
                </h2>
                <div className="fontSize_4 margin24 onlyBottomMargin" dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_GUEST_LOGIN_GUEST_IN_TITLE }} />
                <div>
                  <div className="textTransUppercase margin6 onlyBottomMargin" style={{ color: '#808080' }}>
                    {cqContent.label.DT_OD_GUEST_LOGIN_USER_ID_TITLE}
                  </div>
                  <div className="background_white margin12 onlyBottomMargin">
                    <Field
                      component={renderTextField}
                      id="IDToken1"
                      name="IDToken1"
                      type="text"
                      hintText={cqContent.label.DT_OD_GUEST_LOGIN_USER_ID_TITLE}
                      hintStyle={styles.place}
                      required
                    />
                  </div>
                  <div className="textUnderline bold margin24 noSideMargin">
                    <a analyticstrack="forgot-username-link" href={this.props.forgotUsernameURL}>{cqContent.label.DT_OD_GUEST_LOGIN_USER_ID_FORGET_LINK}</a>
                  </div>
                </div>
                <div>
                  <div className="textTransUppercase margin6 onlyBottomMargin" style={{ color: '#808080' }}>
                    {cqContent.label.DT_OD_GUEST_LOGIN_PASSWORD_TITLE}
                  </div>
                  <div className="background_white margin12 onlyBottomMargin">
                    <Field
                      component={renderTextField}
                      id="IDToken2"
                      name="IDToken2"
                      hintText={cqContent.label.DT_OD_GUEST_LOGIN_PASSWORD_TITLE}
                      hintStyle={styles.place}
                      type="password"
                      required
                    />
                  </div>
                  <div className="textUnderline bold margin24 noSideMargin">
                    <a analyticstrack="forgot-password-link" href={this.props.forgotPwdURL}>{cqContent.label.DT_OD_GUEST_LOGIN_PASSWORD_FORGET_LINK}</a>
                  </div>
                </div>
                <div className="margin36 onlyBottomMargin clearfix">
                  <div className="floatLeft" style={{ margin: '4px 16px 0 0' }}>
                    <Checkbox
                      name="rememberMe"
                      id="rememberMe"
                      analyticstrack="remember-me-checkbox"
                    />
                  </div>
                  <div className="floatLeft span_9_of_12 pad6 noLeftPad">
                    <span className="fontSize_4 style={{ color: '#808080' }}">
                      {cqContent.label.DT_OD_GUEST_LOGIN_REMEMBER_ME}&nbsp;(<a className="bold textUnderline" analyticstrack="privacy-policy-link" href={this.props.privacyPolicyURL}>{cqContent.label.DT_OD_GUEST_LOGIN_PRIVACY_POLICY_LINK}</a>)
                    </span>
                  </div>
                </div>
                <Row>
                  <Col xs={6}>
                    <div className="textAlignCenter">
                      <input type="hidden" name="realm" value="vzw" />
                      <input type="hidden" name="gx_charset" value="UTF-8" />
                      <input type="hidden" name="rememberUserNameCheckBoxExists" value="N" />
                      <input type="hidden" name="myVerizonLoginSubmit" value="Sign-In" />
                      <input type="hidden" name="goto" value={this.props.amGotoURL} />
                      <Button
                        type="submit"
                        className={`button primary width100 large ${!ctadisabled ? 'disabled' : ''}`}
                        disabled={!ctadisabled}
                        analyticstrack="login-cta"
                      >
                        {cqContent.label.DT_OD_GUEST_LOGIN_SIGN_IN_TITLE}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </form>
            </Col>
          }
          {this.props.guestCheckoutEnabled &&
            <Col xs={6} className="border_CC positionRelative" style={{ padding: 60 }}>
              <h2 className="bold fontSize_10 margin12 onlyBottomMargin">
                {cqContent.label.DT_OD_GUEST_LOGIN_GUEST_CHECKOUT_TITLE}
              </h2>
              <div className="fontSize_4 margin24 onlyBottomMargin" dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_GUEST_LOGIN_GUEST_CHECKOUT_SUBTITLE }} />
              <a
                href={this.props.guestCheckoutURL}
                className="button secondary guestCheckoutLink"
                analyticstrack="checkout-as-guest-cta"
              >
                {cqContent.label.DT_OD_GUEST_LOGIN_GUEST_CHECKOUT_BUTTON}
              </a>
            </Col>
          }
        </Row>
      </Grid>
    );
  }
}

export default reduxForm({
  form: 'guestLoginForm',
  validate,
})(GuestLogin);
