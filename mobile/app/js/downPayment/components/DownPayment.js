import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Title from '../../common/Title/Title';
import A from '../../common/A/A';
import Loader from '../../common/Loader/Loader';

class DownPayment extends Component {
  constructor(props) {
    super(props);
    this._onCheckout = this._onCheckout.bind(this);
  }

  _onCheckout(event) {
    event.preventDefault();
    this.props.initiateCheckout();
  }

  render() {
    const {
      downpayment, cqContent, isFetching,
    } = this.props;
    return (
      <Grid className="pad32">
        {isFetching === true && <Loader />}
        <Row>
          <Col>
            <Title className="fontSize_6 textAlignLeft ">{downpayment.title}</Title>
            <div className="pad24 fontSize_1_3 onlyTopPad" dangerouslySetInnerHTML={{ __html: downpayment.titleDescription }} />
          </Col>
          <Col className="footerFixed">
            <A href={downpayment.cartRedirectUrl} className="button large secondary margin6 onlyRightMargin bold" analyticstrack="back-to-cart">{cqContent.label.OD_DOWN_PAYMENT_BUTTON_CTA}</A>
            <A onClick={this._onCheckout} className="button primary large bold" analyticstrack="initialte-checkout">{cqContent.label.OD_DOWN_PAYMENT_BUTTON_TEXT}</A>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DownPayment;

DownPayment.propTypes = {
  initiateCheckout: PropTypes.func,
  downpayment: PropTypes.object,
  isFetching: PropTypes.bool,
  cqContent: PropTypes.object,
};
