import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Title from '../../common/Title/Title';

export default class LimitExceeded extends Component { // eslint-disable-line
  render() {
    const { inEligibilityCode, data } = this.props;
    const { cqJSON } = this.props;
    let _limitContentHeader = '';
    let _limitContent = '';
    let url = '';
    let linkText = '';
    console.log(data);
    if (inEligibilityCode === 'ACCT_LINE_LIMIT') {
      _limitContentHeader = cqJSON.label.OD_MDN_ACCT_LINE_LIMIT_TITLE;
      _limitContent = cqJSON.label.OD_MDN_ACCT_LINE_LIMIT_CONTENT;
      url = cqJSON.label.OD_MDN_ACCT_LINE_LIMIT_URL;
      linkText = cqJSON.label.OD_MDN_ACCT_LINE_LIMIT_LINK_TXT;
    } else if (inEligibilityCode === 'MIXED_CART') {
      _limitContentHeader = 'Sorry, you have to finish adding a line first';
      _limitContent = cqJSON.label.OD_MDN_MIXED_CART_CONTENT;
      url = cqJSON.label.OD_MDN_MIXED_CART_LINK_TXT;
      linkText = 'View cart';
    } else if (inEligibilityCode === 'CART_DEVICE_MAX_LIMIT_REACHED') {
      _limitContentHeader = 'You\'ve hit the maximum number of devices for this transaction.';
      _limitContent = cqJSON.label.OD_MDN_CART_DEVICE_LIMIT_CONTENT;
      url = cqJSON.label.OD_MDN_CART_DEVICE_LIMIT_TXT;
      linkText = 'View cart';
    } else if (inEligibilityCode === 'TVPSL_SMARTPHONE_MAX_LIMIT_EXCEEDED') {
      _limitContentHeader = 'You\'ve hit the maximum number of devices for this transaction.';
      _limitContent = cqJSON.label.OD_MDN_CART_DEVICE_LIMIT_CONTENT;
      url = cqJSON.label.OD_MDN_CART_DEVICE_LIMIT_TXT;
      linkText = 'View cart';
    } else if (inEligibilityCode === 'CASH_ONLY') {
      _limitContentHeader = cqJSON.label.OD_MDN_USER_BLOCKED;
      _limitContent = cqJSON.label.OD_MDN_USER_BLOCKED_TXT;
    } else if (inEligibilityCode === 'DEVICE_CAP') {
      _limitContentHeader = data.accountLevelInEligibleMessage;
      url = '#/';
      linkText = 'Got it';
    }

    return (
      <Grid className="pad32">
        <Row>
          <Col xs={12}>
            <Title className="fontSize_7" style={{ fontSize: '9.5vw', lineHeight: '1.1' }}>{_limitContentHeader}</Title>
            <p className="margin18 onlyTopMargin">{_limitContent}</p>
          </Col>
        </Row>
        {
          linkText !== '' &&
          <Row className="footerFixed">
            <Col xs={12}>
              <a className="button primary large width40" href={url} analyticstrack="limit-exceeded">{linkText}</a>
            </Col>
          </Row>
        }
      </Grid>
    );
  }
}

LimitExceeded.propTypes = {
  inEligibilityCode: PropTypes.string,
  cqJSON: PropTypes.object,
  data: PropTypes.object,
};
