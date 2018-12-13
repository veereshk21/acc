import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import classnames from 'classnames';
import ToolTip from './../ToolTip/index';

import './../../../css/modules/notification.css';

class GlobalPromo extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: true };
    this.onCloseNotification = this.onCloseNotification.bind(this);
  }
  onCloseNotification() {
    const { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
    this.props.onClose();
  }
  render() {
    const { message, className } = this.props;
    const { isVisible } = this.state;
    const showClose = this.props.noClose;
    const { toolTip } = this.props;
    const classes = classnames('width100', className);
    return (
      <div className={classes}>{isVisible &&
        <div className="notification_wrap clearfix" role="alertdialog">
          <div
            key="120"
            role="alertdialog"
            className="width100 pad6 height54 m-info"
            style={{ backgroundColor: '#0088cc', color: '#fff' }}
          >
            <Row className="notification_wrap grid">
              <Col xs={12} className="notification_content fontTextMedium">
                <p dangerouslySetInnerHTML={{ __html: message }} className="displayInlineBlock " />
                {toolTip &&
                  <ToolTip
                    id="upgradeFee-tooltip"
                    className="margin3 onlyLeftMargin white"
                    ariaLabel="Upgrade fee information tooltip"
                    text={toolTip}
                    noRenderHTML
                  />
                }
              </Col>
            </Row>
            {!showClose &&
              <span
                role="button"
                tabIndex="0"
                aria-label="Close"
                className="notification_close"
                onClick={this.onCloseNotification}
              />
            }
          </div>
        </div>
      }
      </div>
    );
  }
}

GlobalPromo.propTypes = {
  message: PropTypes.string,
  noClose: PropTypes.bool,
  onClose: PropTypes.func,
  toolTip: PropTypes.string,
  className: PropTypes.string,
};

GlobalPromo.defaultProps = {
  noClose: true,
};

export default GlobalPromo;
