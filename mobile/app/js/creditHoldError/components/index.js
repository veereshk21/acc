
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Title from '../../common/Title/Title';
import A from '../../common/A/A';

class CreditHoldError extends React.PureComponent {
  constructor(props) {
    super();
    this.timer = 0;
    this.state = {
      time: {},
      seconds: props.details.refreshTimer - 1, // So that page doesnt render with 20:0 as time, instead 19:59
      timerDisabled: '',
    };
  }

  componentWillMount() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
    const timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }
  componentDidMount() {
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
      this.setState({ timerDisabled: 'disabled' });
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
      <Grid className="pad32">
        <Row>
          <Col>
            <Title className="fontSize_6 textAlignLeft ">{details.title}</Title>
            <div className="pad24 fontSize_1_3 onlyTopPad" dangerouslySetInnerHTML={{ __html: details.description }} />
          </Col>
          {details.refreshTimer &&
            <Col xs={12} className="pad72 noSidePad noTopPad">
              Refresh in <span className="bold">{this.state.time.m}:{this.state.time.s}</span>
            </Col>}

          <Col className="footerFixed">
            {details.showCancelButton && <A href={details.cancelURL} className="secondary button width40 margin6 sideMarginOnly" analyticstrack="cancel-order">{details.cancelButton}</A>}
            {details.showConfirmButton &&
              <A
                ref={(c) => { this.confirm = c; }}
                onClick={this._onConfirm}
                className={'primary button width40 margin6 sideMarginOnly ' + this.state.timerDisabled}
                analyticstrack="confirm-credit"
              >{details.confirmButton}
              </A>
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default CreditHoldError;
CreditHoldError.propTypes = {
  details: PropTypes.object,
  initiateCheckout: PropTypes.func,
};
