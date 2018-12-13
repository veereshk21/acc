import React from 'react';
import PropTypes from 'prop-types';
import AriaModal from './react-aria-modal';
import '../../../css/base/base.scss';
import '../../../css/base/fonts.scss';
import '../../../css/modules/ariaModal.scss';
import '../../../css/modules/buttons.scss';
import '../../../css/modules/singles.scss';
import '../../../css/states/states.scss';
import closeIcon from '../../../images/close.svg';


function getApplicationNode() {
  return document.getElementById('app');
}

function Modal(props) {
  const {
    children, closeFn, showCloseX, style, className, classNameX, modalId,
  } = props;
  const closeX = (
    <button
      className={(showCloseX ? '' : 'is-visuallyHidden ') + 'floatRight fontSize_5 cursorPointer width24 height24'}
      style={{
        border: 0,
        position: 'absolute',
        background: 'transparent',
        borderSize: 0,
        top: 10,
        right: 10,
        outline: showCloseX || 'none',
      }}
      aria-label="Close modal overlay"
      onClick={showCloseX && closeFn}
    >
      <span className={`${classNameX} icon-close displayInlineBlock floatRight`} style={{ backgroundImage: "url('" + closeIcon + "'), none" }} />
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
      dialogId={modalId}
      {...props}
    >
      <div
        className={`modal pad20 relative ${className}`}
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
  classNameX: '',
};

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  closeFn: PropTypes.func,
  showCloseX: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  classNameX: PropTypes.string,
  modalId: PropTypes.string,
};

export default Modal;
