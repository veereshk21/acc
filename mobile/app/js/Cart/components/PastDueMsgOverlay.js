/* eslint-disable react/prefer-stateless-function */
/**
 * Created by hmahad on 5/18/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackButton from '../../common/BackButton/BackButton';
import Title from '../../common/Title/Title';

export default class PastDueMsgOverlay extends Component {
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
    const { cqContent } = this.props;
    return (
      <div className="pad12 onlyTopPad">
        <BackButton to="/">
          Back
        </BackButton>
        <div className="cartPage_dmBrkdwn pad12 onlySidePad">
          <div className="pad12">
            <Title className="h2">{cqContent.label.OD_CART_PAST_DUE_HEADER_TEXT}</Title>
            <div>
              <h6 className="fontSize_3 textAlignCenter margin12 noSideMargin">{cqContent.label.OD_CART_PAST_DUE_HEADER__NEXT_STEP_TEXT}</h6>
              <ol className="noPad noSideMargin" style={{ listStyle: 'none' }}>
                <li className="pad12 noSidePad">{cqContent.label.OD_CART_PAST_DUE_NOTE_FIRST_TEXT}
                </li>
                <li className="pad12 noSidePad">{cqContent.label.OD_CART_PAST_DUE_NOTE_SECOND_TEXT}
                </li>
              </ol>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

PastDueMsgOverlay.propTypes = {
  cqContent: PropTypes.object,
};
