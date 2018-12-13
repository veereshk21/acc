import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import React, { Component } from 'react';
import ReactModal from 'react-modal';

import * as feedbackActions from './actions';
import FeedbackFrom from './FeedbackForm';

import './../../../css/base/base.scss';
import './../../../css/base/fonts.scss';
import './../../../css/layout/layout.scss';
import './../../../css/modules/buttons.scss';
import './../../../css/modules/modal.css';
import './../../../css/modules/modules.css';
import './../../../css/modules/singles.scss';

class Feedback extends Component {
  static propTypes= {
    showFeedbackForm: Proptypes.bool,
    hideFeedback: Proptypes.func,
  };

  static defaultProps = {

  };

  constructor() {
    super();

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal(e) {
    e.preventDefault();
    this.props.hideFeedback();
  }

  render() {
    const { showFeedbackForm, hideFeedback } = this.props;
    return (
      <ReactModal
        isOpen={showFeedbackForm}
        contentLabel=""
        onRequestClose={this.handleCloseModal}
        className="modal"
        overlayClassName="overlay"
      >
        <FeedbackFrom hideFeedback={hideFeedback} />
        <a onClick={this.handleCloseModal} className="modalCloseIcon" role="link">close</a>
      </ReactModal>
    );
  }
}

const mapStateToProps = (state) => ({
  showFeedbackForm: state.get('showFeedbackForm'),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...feedbackActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
