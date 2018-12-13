import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { hashHistory } from './../../store';
import A from '../../common/A/A';
import Title from '../../common/Title/Title';

export default class ClassName extends Component {
  componentWillMount() {
    if (this.props.orderResponse === null) {
      hashHistory.push('/');
      window.location.reload();
    }
  }
  render() {
    const { orderResponse } = this.props;
    const response = orderResponse.output.pageDetailsVO;
    return (
      <Grid className="pad32">
        <Row >
          <Col xs={12}>
            <Title className="fontSize_8" style={{ fontSize: '10.5vw', lineHeight: '1.1' }}>{response.title}</Title>
            <p className="margin18 onlyTopMargin">{response.subTitle}</p>
          </Col>
        </Row>
        <Row className="footerFixed">
          <Col xs={12}>
            <A href={'tel:' + response.customerServiceNumber} analyticstrack="call-customer-care" className="button margin12 margin12 onlySideMargin" onClick={this.onButtonClick}>{response.buttonText}</A>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ClassName.propTypes = {
  orderResponse: PropTypes.object,
};
