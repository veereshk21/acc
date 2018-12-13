
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import Button from './../../common/Button/Button';

class CreditHoldError extends React.PureComponent {
  static propTypes = {
    details: PropTypes.object,
    initiateCheckout: PropTypes.func,
  };

  constructor(props) {
    super();
    this.timer = 0;
    this.state = {
      time: {},
      seconds: props.details.refreshTimer - 1, // So that page doesnt render with 20:0 as time, instead 19:59
      timerDisabled: false,
    };
  }

  componentWillMount() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
    const timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({
      time: timeLeftVar,
    });
  }

  secondsToTime(secs) {
    const hours = Math.floor(secs / (60 * 60));

    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);

    const obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    const seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer);
      this.setState({ timerDisabled: true });
    }
  }
  _onConfirm = (event) => {
    event.preventDefault();
    if (this.props.details.goToCheckout) {
      this.props.initiateCheckout();
    } else {
      window.location = this.props.details.confirmURL;
    }
  }

  render() {
    // Add condition for link instead of initiate checkout from confirm button
    const { details } = this.props;
    return (
      <section>
        <Row>
          <Col xs={12}>
            <div className=" textAlignLeft width100 pad24 noSidePad noTopPad">
              <div className="pad12 onlyTopPad" dangerouslySetInnerHTML={{ __html: details.description }} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            { details.refreshTimer ?
              <div className="pad18 noSidePad noTopPad">
                <span className="textUnderline">Refresh this screen in</span>
                <span className="" style={{ color: '#0c6a0cad', fontSize: '30px', fontWeight: 'normal' }}s>{this.state.time.m}:{this.state.time.s}</span>
              </div> : ''
            }
          </Col>
        </Row>
        <Row className="width100 pad36 noSidePad">
          {details.showConfirmButton &&
            <Col xs={3}>
              <Button
                type="button"
                className="button primary large"
                onClick={this._onConfirm}
                disabled={this.state.timerDisabled}
                analyticstrack="credit-hold-confirm-cta"
              >{details.confirmButton}
              </Button>
            </Col>
          }
          {details.showCancelButton &&
            <Col xs={2}>
              <button className="button tertiary m-big sideMarginOnly bold" analyticstrack="credit-hold-cancel-link" style={{ padding: '12px' }} href={details.cancelURL}>{details.cancelButton}</button>
            </Col>
          }
        </Row>
      </section>
    );
  }
}

export default CreditHoldError;
