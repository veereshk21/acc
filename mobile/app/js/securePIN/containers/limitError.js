import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import A from '../../common/A/A';

export default class LimitError extends React.Component { // eslint-disable-line

  render() {
    return (
      <Grid className="pad32">
        <Row >
          <Col xs={12}>
            <h1 className="fontSize_7">
              You’re out of attempts to enter the code.
            </h1>
          </Col>
          <Col xs={12}>
            <p className="pad24 noSidePad">
              You can finish your purchase with your account address or call us at 800.922.0204.
            </p>
          </Col>
          <Col xs={12} className="footerFixed">
            {/* TODO: cart url */}
            <A className="button secondary width40 margin6" href={window.securePinUrls.cartDetailsURL} analyticstrack="review-my-order" >Review my order</A>
            <A className="button large width40 margin6" href="tel:1-800-922-0204" analyticstrack="call-customer-service">Call us</A>
          </Col>
        </Row>
      </Grid>
    );
  }
}
