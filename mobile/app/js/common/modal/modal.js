import React from 'react';
import PropTypes from 'prop-types';
import AriaModal from './react-aria-modal';
import '../../../css/base/base.css';
import '../../../css/base/fonts.css';
import '../../../css/modules/ariaModal.css';
import '../../../css/modules/buttons.css';
import '../../../css/modules/singles.css';
import '../../../css/states/states.css';

function getApplicationNode() {
  return document.getElementById('app');
}

function Modal(props) {
  const {
    children, closeFn, showCloseX, style, className,
  } = props;
  const closeX = (
    <button
      className={'floatRight fontSize_5 cursorPointer width24 height24' + (showCloseX ? '' : ' is-visuallyHidden')}
      style={{
        border: 0,
        marginLeft: '10px',
        position: 'absolute',
        background: 'transparent',
        borderSize: 0,
        top: 3,
        right: 3,
      }}
      aria-label="Close modal overlay"
      onClick={showCloseX && closeFn}
    >
      <span className="icon-close displayInlineBlock floatRight modalCloseIcon" style={{ top: '-15px' }} />
    </button>
  );

  return (
    <AriaModal
      titleText="Modal"
      getApplicationNode={getApplicationNode}
      onExit={() => { }}
      underlayClickExits
      verticallyCenter
      escapeExits
      {...props}
    >
      <div
        className={`modal pad20 ${className}`}
        style={style}
      >
        {closeX}
        {children}
      </div>
    </AriaModal>
  );
}

Modal.defaultProps = {
  closeFn: () => { },
  showCloseX: true,
  style: {},
};

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  closeFn: PropTypes.func,
  showCloseX: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Modal;
