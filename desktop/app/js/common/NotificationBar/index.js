/**
 * Created by hmahad on 1/24/2017.
 */

/* TODO:Will be split to component and containers*/
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { getNotificationCssClass } from './../Helpers/index';
import ToolTip from './../ToolTip/index';

import * as actions from './actions';

import './../../../css/modules/notification.scss';

class NotificationBar extends React.Component {
  constructor(props) {
    super(props);
    this.currentPage = props.page;
  }
  componentDidMount() {
  //  window.ajaxMessage = this.props.message;
    this.props.checkNotification(this.currentPage);
    // this.hideNotificationAfterDelay({ isNotificationVisible: this.props.isNotificationVisible });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isNotificationVisible) {
      // this.hideNotificationAfterDelay({ isNotificationVisible: nextProps.isNotificationVisible });
    }
  }

  shouldComponentUpdate(nextProps) {
    return !Object.is(this.props, nextProps);
  }

  componentDidUpdate() {
    if (this.props.isNotificationVisible && this.props.section === this.props.targetSection) {
      this.props.setHeight(window.document.getElementsByClassName('notificationBar')[0].offsetHeight);
    }
  }


  hideNotification = () => {
    this.props.hideNotification();
    window.scrollTo(window.scrollX, window.scrollY + 1);
  }


  hideNotificationAfterDelay = (obj) => {
    if (obj.isNotificationVisible) {
      setTimeout(() => {
        this.hideNotification();
      }, 6000);
    }
  }

  render() {
    const { isNotificationVisible, message, page, section, targetSection, toolTip, noClose } = this.props;
    if (this.currentPage !== page) {
      this.props.checkNotification(page);
      this.currentPage = page;
    }

    return (
      <div className="notificationBar notification_wrap clearfix" role="alertdialog" >
        {isNotificationVisible && section === targetSection &&
          <div
            key="120"
            role="alertdialog"
            className={getNotificationCssClass(this.props.type, this.props.section)}
          >
            <div className="notification_wrap grid">
              <span className="notification_iconwrap">
                <span className="notification_icon m-warning fontTextMedium" />
              </span>

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
              </div>
            </div>
            {!noClose &&
              <span role="button" tabIndex="0" aria-label="Close" className="notification_close" onClick={this.hideNotification} />
            }
          </div>
        }
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
  page: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  type: PropTypes.string,
  section: PropTypes.string.isRequired,
  targetSection: PropTypes.string,
  setHeight: PropTypes.func,
  toolTip: PropTypes.string,
  noClose: PropTypes.bool,
};

/** TODO:Take state from reducer instead of ES6 default props*/
const mapStateToProps = (state, props) => ({
  isNotificationVisible: state.get('notification').isNotificationVisible,
  message: state.get('notification').message,
  type: state.get('notification').type,
  section: props.section,
  targetSection: state.get('notification').section,
  noClose: state.get('notification').noClose,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar);
