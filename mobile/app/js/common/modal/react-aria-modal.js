/* eslint-disablex */
// Forked from https://raw.githubusercontent.com/davidtheclark/react-aria-modal/
// in order to make changes in accordance to Verizon's A11y standards

import React from 'react';
import FocusTrap from 'focus-trap-react';
import displace from 'react-displace';
import noScroll from 'no-scroll';
import PropTypes from 'prop-types';


const focusTrapFactory = React.createFactory(FocusTrap);

let Modal = class Modal extends React.Component {
  static defaultProps = {
    dialogId: 'react-aria-modal-dialog',
    underlayClickExits: true,
    escapeExits: true,
    underlayColor: 'rgba(0,0,0,0.5)',
    includeDefaultStyles: true,
  };

  static propTypes = {
    titleText: PropTypes.string,
    titleId: PropTypes.string,
    getApplicationNode: PropTypes.func,
    onExit: PropTypes.func,
    /* eslint-disable */
    dialogId: PropTypes.string,
    underlayClickExits: PropTypes.bool,
    escapeExits: PropTypes.bool,
    underlayColor: PropTypes.string,
    includeDefaultStyles: PropTypes.bool,
    /* eslint-enable */
  }
  componentWillMount() {
    if (!this.props.titleText && !this.props.titleId) {
      throw new Error('react-aria-modal instances should have a `titleText` or `titleId`');
    }
    noScroll.on();
  }

  componentDidMount() {
    const props = { ...this.props };
    if (props.onEnter) {
      props.onEnter();
    }
    // Timeout to ensure this happens *after* focus has moved
    const applicationNode = this.getApplicationNode();
    setTimeout(() => {
      if (applicationNode) {
        applicationNode.setAttribute('aria-hidden', 'true');
      }
    }, 0);
  }

  componentWillUnmount() {
    noScroll.off();
    const applicationNode = this.getApplicationNode();
    if (applicationNode) {
      applicationNode.setAttribute('aria-hidden', 'false');
    }
  }

  getApplicationNode = () => {
    if (this.props.getApplicationNode) return this.props.getApplicationNode();
    return this.props.applicationNode; //eslint-disable-line
  };

  checkClick = (event) => {
    if (this.dialogNode && this.dialogNode.contains(event.target)) return;
    this.deactivate();
  };

  deactivate = () => {
    this.props.onExit();
  };

  render() {
    const props = { ...this.props };

    let style = {};
    if (props.includeDefaultStyles) {
      style = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1050,
        overflowX: 'hidden',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        textAlign: 'center',
      };

      if (props.underlayColor) {
        style.background = props.underlayColor;
      }

      if (props.underlayClickExits) {
        style.cursor = 'pointer';
      }
    }

    if (props.underlayStyle) {
      for (const key in props.underlayStyle) {
        if (!props.underlayStyle.hasOwnProperty(key)) continue; // eslint-disable-line
        style[key] = props.underlayStyle[key];
      }
    }

    const underlayProps = {
      className: props.underlayClass,
      style,
    };

    if (props.underlayClickExits) {
      underlayProps.onClick = this.checkClick;
    }

    let verticalCenterStyle = {};
    if (props.includeDefaultStyles) {
      verticalCenterStyle = {
        display: 'inline-block',
        height: '100%',
        verticalAlign: 'middle',
      };
    }

    const verticalCenterHelperProps = {
      key: 'a',
      style: verticalCenterStyle,
    };

    let dialogStyle = {};
    if (props.includeDefaultStyles) {
      dialogStyle = {
        display: 'inline-block',
        textAlign: 'left',
        top: 0,
        maxWidth: '100%',
        cursor: 'default',
        outline: (props.focusDialog) ? 0 : null,
      };

      if (props.verticallyCenter) {
        dialogStyle.verticalAlign = 'middle';
        dialogStyle.top = 0;
      }
    }

    if (props.dialogStyle) {
      for (const key in props.dialogStyle) {
        if (!props.dialogStyle.hasOwnProperty(key)) continue; // eslint-disable-line
        dialogStyle[key] = props.dialogStyle[key];
      }
    }

    const dialogProps = {
      key: 'b',
      ref: (el) => {
        this.dialogNode = el;
      },
      // role: props.alert ? 'alertdialog' : 'dialog',
      // role: '',
      id: props.dialogId,
      className: props.dialogClass,
      style: dialogStyle,
    };
    if (props.titleId) {
      dialogProps['aria-labelledby'] = props.titleId;
    } else if (props.titleText) {
      dialogProps['aria-label'] = props.titleText;
    }
    if (props.focusDialog) {
      dialogProps.tabIndex = '-1';
    }

    const childrenArray = [React.createElement('div', dialogProps, props.children)];
    if (props.verticallyCenter) {
      childrenArray.unshift(React.createElement('div', verticalCenterHelperProps));
    }

    return focusTrapFactory(
      {
        focusTrapOptions: {
          initialFocus: props.focusDialog
            ? '#react-aria-modal-dialog'
            : props.initialFocus,
          escapeDeactivates: props.escapeExits,
          onDeactivate: this.deactivate,
        },
      },
      React.createElement('div', underlayProps, childrenArray)
    );
  }
};

Modal = displace(Modal);

Modal.renderTo = (input) => (displace(Modal, { renderTo: input }));

module.exports = Modal;
