import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getNotificationCssClass } from './../Helpers/index';
import ToolTip from './../ToolTip/index';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: true };

    this.onCloseNotification = this.onCloseNotification.bind(this);
  }
  componentDidMount() {
    window.ajaxMessage = this.props.message;
  }
  componentWillUnmount() {
    window.ajaxMessage = null;
  }
  onCloseNotification() {
    const isVisible = this.state.isVisible;
    this.setState({ isVisible: !isVisible });
    this.props.onClose();
  }

  render() {
    const { message } = this.props;
    const { isVisible } = this.state;
    const showClose = this.props.noClose || false;
    const { toolTip, learnMore, learnURL, analyticstrack, mmplanEnabled, tooltipClass } = this.props;
    return (
      <div className="width100">{isVisible && <div className="notification_wrap clearfix" role="alertdialog">
        <div
          key="120"
          role="alertdialog"
          className={getNotificationCssClass(this.props.type)}
        >
          <div className="notification_wrap grid">
            <div className="notification_content fontTextMedium">
              {mmplanEnabled && <span className="font-icon icon-apple onlyRightMargin margin3" />}
              <p dangerouslySetInnerHTML={{ __html: message }} className="displayInlineBlock" />
              {toolTip &&
                <ToolTip
                  id="upgradeFee-tooltip"
                  className={`margin3 white onlyLeftMargin ${tooltipClass !== undefined ? tooltipClass : ''}`}
                  ariaLabel="Upgrade fee information tooltip"
                  text={toolTip}
                  needPadding="pad8"
                  noRenderHTML
                />
              }
              {learnMore &&
                <Link
                  role="link"
                  to="/"
                  onClick={() => learnMore(learnURL)}
                  className="fontSize_4 color_white textDecUnderline pad5 onlyLeftPad"
                  analyticstrack={analyticstrack}
                >
                  Learn more
                </Link>
              }
            </div>
          </div>
          {!showClose &&
          <span
            role="button"
            tabIndex="0"
            aria-label="Close"
            className="notification_close" onClick={this.onCloseNotification}
          />
          }
        </div>
      </div>}</div>
    );
  }
}
Notification.defaultProps = {
  type: 'info',
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  noClose: PropTypes.bool,
  toolTip: PropTypes.string,
  onClose: PropTypes.func,
  learnMore: PropTypes.func,
  learnURL: PropTypes.string,
  analyticstrack: PropTypes.string,
  mmplanEnabled: PropTypes.bool,
  tooltipClass: PropTypes.string,
};

export default Notification;
