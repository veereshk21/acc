import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { history } from './../../store';
import Button from '../../common/Button/Button';
import Title from '../../common/Title/Title';
import HorizontalRule from '../../common/HorizontalRule';

export default class InactiveMethodsLearnMore extends React.Component { // eslint-disable-line

  render() {
    return (
      <Grid className="pad32">
        <Row className="">
          <Col xs={12}>
            <Title>
              Some options aren’t available right now.
            </Title>
            <HorizontalRule />
          </Col>
          <Col xs={12}>
            If you made updates to any lines on your account, or added new numbers in the last 30 days, you can’t text those numbers to authorize your account.
          </Col>
          <Col xs={12} className="footerFixed">
            <Button className="large width40" onClick={() => history.goBack()} analyticstrack="inactive-mtns-got-it">Got it</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}
