import React from 'react';
import PropTypes from 'prop-types';
import AriaModal from 'react-aria-modal';

function getApplicationNode() {
  return document.getElementById('app');
}

const Modal = (props) => {
  const { children, closeFn, showCloseX, style } = props; // eslint-disable-line

  const closeX = (
    <button
      className={'background_white borderSize_0 floatRight fontSize_5 modalCloseIcon ' + (showCloseX ? '' : ' is-visuallyHidden')}
      aria-label={'Close modal' + (showCloseX ? '' : ' button disabled')}
      onClick={showCloseX && closeFn}
    />
  );

  return (
    <AriaModal
      titleText="test"
      getApplicationNode={getApplicationNode}
      onExit={() => {}}
      underlayClickExits
      verticallyCenter
      {...props}
    >
      <div
        className="modal pad15"
        style={style}
      >
        {closeX}
        {children}
      </div>
    </AriaModal>
  );
};

Modal.defaultProps = {
  closeFn: () => {},
  showCloseX: true,
  style: {},
};

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  closeFn: PropTypes.func,
  showCloseX: PropTypes.bool,
  style: PropTypes.object,
};

export default Modal;
