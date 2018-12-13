import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class NotEligible extends Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      limitHeader: props.cqJSON.label.OD_NS_CART_LIMIT_EXCEEDED_HEADER,
      limitContent: props.cqJSON.label.OD_NS_CART_LIMIT_EXCEEDED_MSG,
      linkText: props.cqJSON.label.OD_NS_VIEW_CART_LBL,
      url: props.cartURL,
      icon: 'f-icon_sad',
    };
  }
  componentWillMount() {
    const { inEligibleMessage } = this.props.data;
    if (inEligibleMessage && !isEmpty(inEligibleMessage)) {
      this.setState({
        limitHeader: inEligibleMessage.title,
        limitContent: inEligibleMessage.description,
        url: inEligibleMessage.redirectUrl,
        linkText: this.props.cqJSON.label.OD_NS_NEXT,
        icon: 'font-icon_error',
      });
    }
  }
  render() {
    const {
      limitContent, limitHeader, url, linkText,
    } = this.state;

    return (
      <Grid className="pad32">
        <Row >
          <Col>
            <h1>{limitHeader}</h1>
            <p className="fontSize_1_3 pad18 noSidePad">{limitContent}</p>
          </Col>

        </Row>
        <Row className="footerFixed">
          <Col xs={12}>
            <a className="button primary large width40 bold" href={url} analyticstrack="numbershare-not-eligible">{linkText}</a>
          </Col>
        </Row>
      </Grid>
    );
  }
}

NotEligible.propTypes = {
  cqJSON: PropTypes.object,
  cartURL: PropTypes.string,
  data: PropTypes.object,
};
