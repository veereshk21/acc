import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getNotificationCssClass } from './../Helpers/index';
import ToolTip from './../ToolTip/index';
import './../../../css/modules/notificationStatic.css';

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
    this.setState({ isVisible: !this.state.isVisible });
    this.props.onClose();
  }

  render() {
    const { message } = this.props;
    const { isVisible } = this.state;
    const showClose = this.props.noClose || false;
    const {
      toolTip, learnMore, learnURL, analyticstrack,
    } = this.props;
    return (
      <div className="width100">
        {isVisible &&
          <div className="staticNotification_wrap clearfix" role="alertdialog">
            <div
              key="120"
              role="alertdialog"
              className={getNotificationCssClass(this.props.type)}
            >
              <div className="staticNotification_wrap grid">
                <div className="notification_content fontTextMedium">
                  <p dangerouslySetInnerHTML={{ __html: message }} className="displayInlineBlock" />
                  {toolTip &&
                    <ToolTip
                      id="upgradeFee-tooltip"
                      className="margin3 white onlyLeftMargin"
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
                    >Learn more
                    </Link>
                  }
                </div>
              </div>
              {!showClose &&
              <span
                role="button"
                tabIndex="0"
                aria-label="Close"
                className="staticNotification_close"
                onClick={this.onCloseNotification}
              />
              }
            </div>
          </div>}
      </div>
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
};

export default Notification;
