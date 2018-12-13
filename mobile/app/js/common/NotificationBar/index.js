/**
 * Created by hmahad on 1/24/2017.
 */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, no-unused-expressions */
/* TODO:Will be split to component and containers */
import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';

import './../../../css/modules/notification.css';

class NotificationBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.hideNotification = this.hideNotification.bind(this);
  }

  componentDidMount() {
    this.props.checkNotification(this.props.page);
  }

  componentWillReceiveProps(nextProps) {
    const { page } = nextProps;
    if (page && this.props.page !== page) {
      this.props.checkNotification(page);
    }
  }

  hideNotification() {
    this.props.hideNotification();
  }


  render() {
    const {
      isNotificationVisible, type, message,
    } = this.props;
    const gnDiv = document.getElementById('vzw-gn');
    if (gnDiv) {
      if (this.props.isNotificationVisible) {
        gnDiv.classList.add('gNav');
      } else {
        gnDiv.classList.remove('gNav');
      }
    }


    // const _message = (typeof message !== typeof undefined) ? message : '<span></span>';
    let html = <div />;
    if (isNotificationVisible) {
      html = (type === 'error' ?

        (
          <div key="120" role="alertdialog" className="notification m-warning">
            <div className="notification_wrap">
              <span className="notification_iconwrap">
                <span className="notification_icon">
                  <span className="m-warning" />
                </span>
              </span>

              <div className="notification_content fontTextMedium">
                <div dangerouslySetInnerHTML={{ __html: message }} />
              </div>
              <span role="button" tabIndex="0" aria-label="Close" className="notification_close" />
            </div>
          </div>) :
        (
          <div key="121" role="alertdialog" className="notification m-info">
            <div className="notification_wrap">
              <span className="notification_iconwrap">
                <span className="notification_icon">
                  <span className="m-info" />
                </span>
              </span>
              <div className="notification_content fontTextMedium" dangerouslySetInnerHTML={{ __html: message }} />
              <span role="button" tabIndex="0" aria-label="Close" className="notification_close" />
            </div>
          </div>));
    }
    return (
      <div
        className={`notification_wrap clearfix ${isNotificationVisible ? 'notificationVisible' : ''}`}
        role="alertdialog"
        onClick={this.hideNotification}
      >
        <ReactCSSTransitionGroup
          transitionName="notification"
          transitionEnterTimeout={50}
          transitionLeaveTimeout={50}
        >
          {html}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

NotificationBar.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  checkNotification: PropTypes.func,
  hideNotification: PropTypes.func,
  isNotificationVisible: PropTypes.bool,
  page: PropTypes.any,
  type: PropTypes.string,
};

/** TODO:Take state from reducer instead of ES6 default props */
const mapStateToProps = (state) => ({
  isNotificationVisible: state.get('notification').isNotificationVisible,
  message: state.get('notification').message,
  type: state.get('notification').type,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar);
