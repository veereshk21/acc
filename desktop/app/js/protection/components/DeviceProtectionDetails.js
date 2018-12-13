import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../common/Modal';

export default class DeviceProtectionDetails extends Component {
  static propTypes ={
    showModal: PropTypes.string,
  }

  componentDidMount() {
    /* Used to scroll the window to top , to prevent middleware behaviour in router */
    window.scrollTo(0, 0);
  }

  closeModal = () => {
    this.props.closeModal();
  }

  render() {
    const { showModal, cqHTML } = this.props;

    return (
      <Modal
        mounted={showModal}
        closeFn={this.closeModal}
        style={{ background: 'white', width: '55%' }}
        modalId="protectionTandC"
        showCloseX
      >
        <div className="pad12 onlyTopPad">
          <div className="protectionTcWrap pad12 onlySidePad">
            <div className="pad12">
              <div dangerouslySetInnerHTML={{ __html: cqHTML.DT_OD_DEVICE_PROTECTION_MODAL_HTML }} />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

DeviceProtectionDetails.propTypes = {
  // cqLabel: PropTypes.object,
  cqHTML: PropTypes.object,
  closeModal: PropTypes.func,
};
