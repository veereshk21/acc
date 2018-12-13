/**
 * Created by mambig on 5/21/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from '../../common/Loader/Loader';
import { interceptRequests, keepSessionAlive, extendSession, extendSessionSucess, extendSessionFalied } from './actions';
import AsyncComponent from '../../common/AsyncComponent';

const Modal = AsyncComponent(() => import('../../common/Modal/index'));


class SessionOutModal extends Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.tickDuration = 1000;// in milli seconds
    this.sessionTime = Number(props.timeout);// in minutes - replace this by cookie name once it is set by backend
    this.warningTime = Number(this.sessionTime) - Number(props.warning);// in minutes - replace this by cookie name once it is set by backend
    this.state = { showModal: false, sessionTimedOut: false };

    this.onExtendSessionHandler = this.onExtendSessionHandler.bind(this);
    this.onClickLoginHandler = this.onClickLoginHandler.bind(this);
  }

  componentDidMount() {
    if (this.warningTime > 0) {
      this.startTimer(this.sessionTime * 60);

      interceptRequests((response) => {//eslint-disable-line
        this.setState({ showModal: false });
        clearInterval(this.interval);
        this.startTimer(this.sessionTime * 60);
      }, (error) => {
        console.log('interceptRequests error', error);//eslint-disable-line
      });
    }
  }

  onExtendSessionHandler() {
    let continueSessionURL = '';
    if (this.isLoggedIn()) {
      continueSessionURL = this.props.continueSessionURL;
    } else {
      continueSessionURL = this.props.guestContinueSessionURL;
    }
    this.props.extendSession();
    this.props.keepSessionAlive(continueSessionURL).then((res) => {//eslint-disable-line
      this.setState({ showModal: false });
      clearInterval(this.interval);
      this.startTimer(this.sessionTime * 60);
      this.props.extendSessionSucess();
    }).catch((err) => {//eslint-disable-line
      // show time out modal on API failure
      clearInterval(this.interval);
      this.props.extendSessionFalied();
      this.setState({ showModal: true, sessionTimedOut: true });
    });
  }

  onClickLoginHandler() {
    this.setState({ showModal: false });
    clearInterval(this.interval);

    window.location.href = this.isLoggedIn() ? this.props.cancelSessionURL : this.props.clearSession;
  }
  getCookiebyName(name) {
    const pair = document.cookie.match(new RegExp(name + '=([^;]+)'));
    return pair ? pair[1] : null;
  }

  isLoggedIn() {
    let isLoggedIn = true;
    try {
      if (window.gnav) {
        isLoggedIn = window.gnav.getCookie('loggedIn') && true;
      }
    } catch (e) {
      console.log(e);
    }
    return isLoggedIn;
  }

  addPad(number) {
    return number < 10 ? '0' + number : number;
  }

  startTimer(duration) {
    let timer = duration;
    let minutes;
    let seconds;

    this.interval = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      this.setState({ elapsedTime: `${this.addPad(minutes)}:${this.addPad(seconds)}` });

      if (--timer < 0) {//eslint-disable-line
        timer = duration;
      }
      if (minutes === this.warningTime && seconds === 0) {
        this.setState({ showModal: true });
      } else if (minutes === 0 && seconds === 0) {
        clearInterval(this.interval);
        this.setState({ sessionTimedOut: true });
      }
    }, this.tickDuration);
  }

  render() {
    const { sessionExtension } = this.props;
    const isLoggedIn = this.isLoggedIn();
    return (
      <div>
        {sessionExtension.isSessionExtended === false && <Loader />}
        <Modal
          mounted={this.state.showModal}
          style={{ width: '350px' }}
          showCloseX={false}
        >
          <div>
            {this.state.sessionTimedOut === false &&
              <div className="margin0 noPad">
                <Row>
                  <Col xs={12} sm={12} lg={12}>
                    <h1 className="fontSize_7 height160 border_black onlyBottomBorder lineHeight18">
                      {isLoggedIn ? 'It looks like your session is about to expire.' : 'Just a heads up that your current session will expire in ' + this.state.elapsedTime + ' minutes because of inactivity.'}
                    </h1>
                    <div className="margin6 onlyTopMargin height96">
                      {isLoggedIn ?
                        <div>
                          <p>You will be logged out of your in&nbsp;<span>{this.state.elapsedTime}</span>.</p>
                          <p>Do you want to continue with your session?</p>
                        </div>
                        :
                        <p>You'll lose the items in your cart if your session expires.</p>
                      }
                    </div>
                    <button className="button primary margin24 onlyTopMargin" onClick={this.onExtendSessionHandler}>
                      {isLoggedIn ? 'Continue' : 'Ok, thank you'}
                    </button>
                  </Col>
                </Row>

              </div>}

            {this.state.sessionTimedOut === true &&
              <div className="margin0 noPad">
                <Row>
                  <Col xs={12} sm={12} lg={12}>
                    <h1 className="fontSize_7 height160 border_black onlyBottomBorder lineHeight18">
                      {isLoggedIn ? 'Oops. Looks like your session has timed out.' : 'Oops. Looks like your session expired because of inactivity.'}
                    </h1>
                    <p className="margin6 onlyTopMargin height96">
                      {isLoggedIn ? 'Your session isn\'t active anymore because of inactivity. Don\'t worry though, just log back in and start a new one.' : 'You\'ll have to start your transaction over.'}
                    </p>
                    <button className="button primary  margin24 onlyTopMargin" onClick={this.onClickLoginHandler}>
                      {isLoggedIn ? 'Log in' : 'Ok, thank you'}
                    </button>
                  </Col>
                </Row>
              </div>
            }
          </div>
        </Modal>
      </div>


    );
  }
}

SessionOutModal.propTypes = {
  sessionExtension: PropTypes.object,
  extendSession: PropTypes.func,
  extendSessionSucess: PropTypes.func,
  extendSessionFalied: PropTypes.func,
  timeout: PropTypes.number,
  warning: PropTypes.number,
  continueSessionURL: PropTypes.string,
  cancelSessionURL: PropTypes.string,
  clearSession: PropTypes.string,
  guestContinueSessionURL: PropTypes.string,
};

const mapStateToProps = (state) => {
  const sessionExtension = state.get('sessionExtension');
  return { sessionExtension };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ keepSessionAlive, extendSession, extendSessionSucess, extendSessionFalied }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SessionOutModal);
