
import PropTypes from 'prop-types';
import React from 'react';
import renderHTML from 'react-render-html';

import AsyncComponent from './../../../common/AsyncComponent';

const Modal = AsyncComponent(() => import('./../../../common/Modal/index'));

const CustomerAgreementModal = (props) => (
  <Modal
    mounted
    closeFn={props.onCloseModal}
    showCloseX
    underlayColor="rgba(0,0,0,0.8)"
    className="agreementModal"
    style={{
      minHeight: '95%',
      minWidth: '95%',
    }}
  >
    {props.terms && props.terms.map((term) => (
      <div
        className="margin12 noSideMargin pad12 terms_external"
        dangerouslySetInnerHTML={{ __html: props.renderHTML ? renderHTML(term) : term }}
      />
    ))
    }
  </Modal>
);

CustomerAgreementModal.propTypes = {
  // cqContent: PropTypes.object,
  onCloseModal: PropTypes.func,
  terms: PropTypes.array,
  renderHTML: PropTypes.bool,
};

export default CustomerAgreementModal;
