import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Title from '../../common/Title/Title';
import TitleHorizontalRule from './../../common/HorizontalRule';
import RadioButton from './../../common/RadioButton/';

export default class GuestCheckout extends Component {
  static propTypes = {
    cqJSON: PropTypes.object,
    pageJSON: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      radioChecked: false,
      flow: 'guestCustomer',
    };
  }
  handleOnChange = (e) => {
    this.setState({
      radioChecked: e.target.checked,
      flow: e.target.value,
    });
  }
  handleOnClick = () => {
    const { pageJSON } = this.props;
    const { flow } = this.state;
    window.location.href = (flow === 'guestCustomer') ? pageJSON.guestCheckoutURL : pageJSON.amLoginURL + pageJSON.amRedirectCheckoutURL;
  }
  render() {
    const { cqJSON, pageJSON } = this.props;
    return (
      <div className="pad18">
        <Grid>
          <Row className="noSideMargin">
            <Col xs={12} >
              <Title className="noSideMargin noSidePad">{cqJSON.label.OD_GC_LOGIN_TITLE}</Title>
              <p className="fontSize_4" dangerouslySetInnerHTML={{ __html: cqJSON.label.OD_GC_LOGIN_TITLE_SUBHEAD }} />
              <TitleHorizontalRule />
            </Col>
          </Row>
          {pageJSON.guestLogInEnabled &&
            <Row className="noSideMargin">
              <Col xs={12} className="border_grey onlyBottomBorder pad18 noSidePad">
                <RadioButton
                  name="customerType"
                  id="existingCustomer"
                  value="existingCustomer"
                  onChange={this.handleOnChange}
                  analyticstrack="continue-existing-customer"
                >
                  <div>
                    <span className="fontDisplayMedium block fontSize_4">
                      {cqJSON.label.OD_GC_LOGIN_EXISTING_CUSTOMER_LABEL}
                    </span>
                    <span
                      className="color_666 clearfix "
                      dangerouslySetInnerHTML={{
                        __html: cqJSON.label.OD_GC_LOGIN_EXISTING_CUSTOMER_MESSAGE,
                      }}
                    />
                  </div>
                </RadioButton>
              </Col>
            </Row>}
          {pageJSON.guestCheckoutEnabled &&
            <Row className="noSideMargin">
              <Col xs={12} className="border_grey onlyBottomBorder pad24 noSidePad">
                <RadioButton
                  name="customerType"
                  id="guest"
                  value="guestCustomer"
                  onChange={this.handleOnChange}
                  analyticstrack="continue-guest-customer"
                >
                  <div>
                    <span className="fontDisplayMedium block fontSize_4">
                      {cqJSON.label.OD_GC_LOGIN_GUEST_CUSTOMER_LABEL}
                    </span>
                    <span
                      className="color_666 "
                      dangerouslySetInnerHTML={{
                        __html: cqJSON.label.OD_GC_LOGIN_GUEST_CUSTOMER_MESSAGE,
                      }}
                    />
                  </div>
                </RadioButton>
              </Col>
            </Row>
          }
          <Row className="noSideMargin footerFixed" >
            <Col xs={12}>
              <a href={pageJSON.cartURL} className="button secondary large margin6 onlySideMargin" analyticstrack="back-to-track">
                {cqJSON.label.OD_GC_LOGIN_BACK_TO_CART}
              </a>
              <button
                className="button primary large margin6 onlySideMargin"
                disabled={!this.state.radioChecked}
                onClick={this.handleOnClick}
                analyticstrack="continue-to-login"
              >
                {cqJSON.label.OD_GC_LOGIN_CONTINUE}
              </button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
