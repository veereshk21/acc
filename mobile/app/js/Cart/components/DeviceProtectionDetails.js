/**
 * Created by hmahad on 2/1/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackButton from '../../common/BackButton/BackButton';
import Title from '../../common/Title/Title';

export default class DeviceProtectionDetails extends Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log('Error:', error, '\n Info:', info);
    // You can also log the error to an error reporting service
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong.</div>;
    }
    return (
      <div className="pad12 onlyTopPad">
        <BackButton to="/" >
          {this.props.CQLabel.get('OD_CART_BACK_CTA')}
        </BackButton>
        <div className="cartPage_dmBrkdwn pad12 onlySidePad">
          <div className="pad12">
            <Title className="h2 clearLeft fontSize_3 noSideMargin">{this.props.CQHtml.get('OD_CART_PROTECTION_INFO_TITLE')}</Title>

            <div
              dangerouslySetInnerHTML={{ __html: this.props.CQHtml.get('OD_CART_PROTECTION_INFO_CONTENT') }}
            />

          </div>
        </div>
      </div>
    );
  }
}

DeviceProtectionDetails.propTypes = {
  CQHtml: PropTypes.object,
  CQLabel: PropTypes.object,
};
