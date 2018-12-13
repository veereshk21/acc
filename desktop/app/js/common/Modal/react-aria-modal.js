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
    dialogId: PropTypes.string,
    dialogClass: PropTypes.string,
    underlayClickExits: PropTypes.bool,
    escapeExits: PropTypes.bool,
    underlayColor: PropTypes.string,
    includeDefaultStyles: PropTypes.bool,
    underlayClass: PropTypes.string,
    underlayStyle: PropTypes.object,
    verticallyCenter: PropTypes.bool,
    focusDialog: PropTypes.bool,
    initialFocus: PropTypes.string,
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
    const {
      includeDefaultStyles,
      underlayColor,
      underlayClickExits,
      underlayStyle,
      underlayClass,
      verticallyCenter,
      dialogId,
      dialogClass,
      focusDialog,
      titleId,
      titleText,
      escapeExits,
      initialFocus,
    } = this.props;

    let style = {};
    if (includeDefaultStyles) {
      style = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 99999999999,
        overflowX: 'hidden',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        textAlign: 'center',
      };

      if (underlayColor) {
        style.background = underlayColor;
      }

      if (underlayClickExits) {
        style.cursor = 'pointer';
      }
    }

    if (underlayStyle) {
      for (const key in underlayStyle) {
        if (!underlayStyle.hasOwnProperty(key)) continue; // eslint-disable-line
        style[key] = underlayStyle[key];
      }
    }

    const underlayProps = {
      className: underlayClass,
      style,
    };

    if (underlayClickExits) {
      underlayProps.onClick = this.checkClick;
    }

    let verticalCenterStyle = {};
    if (includeDefaultStyles) {
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
    if (includeDefaultStyles) {
      dialogStyle = {
        display: 'inline-block',
        textAlign: 'left',
        top: 0,
        maxWidth: '100%',
        cursor: 'default',
        outline: (focusDialog) ? 0 : null,
      };

      if (verticallyCenter) {
        dialogStyle.verticalAlign = 'middle';
        dialogStyle.top = 0;
      }
    }

    if (dialogStyle) {
      for (const key in dialogStyle) {
        if (!dialogStyle.hasOwnProperty(key)) continue; // eslint-disable-line
        dialogStyle[key] = dialogStyle[key];
      }
    }

    const dialogProps = {
      key: 'b',
      ref: (el) => {
        this.dialogNode = el;
      },
      // role: props.alert ? 'alertdialog' : 'dialog',
      // role: '',
      id: dialogId,
      className: dialogClass,
      style: dialogStyle,
    };
    if (titleId) {
      dialogProps['aria-labelledby'] = titleId;
    } else if (titleText) {
      dialogProps['aria-label'] = titleText;
    }
    if (focusDialog) {
      dialogProps.tabIndex = '-1';
    }

    const childrenArray = [React.createElement('div', dialogProps, props.children)];
    if (verticallyCenter) {
      childrenArray.unshift(React.createElement('div', verticalCenterHelperProps));
    }

    return focusTrapFactory(
      {
        focusTrapOptions: {
          initialFocus: focusDialog
            ? '#react-aria-modal-dialog'
            : initialFocus,
          escapeDeactivates: escapeExits,
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
