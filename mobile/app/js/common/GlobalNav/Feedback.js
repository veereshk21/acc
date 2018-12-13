import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from 'axios';
import { hashHistory } from './../../store';
import ReactStars from './ReactStars';
import A from '../A/A';
import Title from '../Title/Title';
import BackButton from '../BackButton/BackButton';
import '../../../css/pages/feedback/feedback.css';

class Feedback extends Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      usability: null, overall: null, comments: '', placeholder: 'Tell us how great we are or how we can improve.',
    };
  }

  onchange(event) {
    this.setState({ comments: event.target.value });
  }


  onFocus() {
    this.setState({ placeholder: '' });
  }

  onBlur() {
    this.setState({ placeholder: 'Tell us how great we are or how we can improve.' });
  }

  overallRatingChanged(overall) {
    this.setState({ overall });
  }

  goBack() {
    hashHistory.goBack();
  }

  postFeedback() {
    delete this.state.placeholder;
    return request({
      method: 'post',
      url: '/digital/feedback/customer/save',
      data: this.state,
    }).then(() => {
      window.location.reload();
    }).catch(() => {
    });
  }
  usabilityRatingChanged(usability) {
    this.setState({ usability });
  }
  render() {
    const {
      usability, overall, comments, placeholder,
    } = this.state;
    return (
      <div>
        <div className="pad12 onlyTopPad">
          <BackButton onClick={this.props.closeFeedback.bind(this)} />
        </div>
        <div className="textAlignCenter pad24">
          <div>
            <Title>Rate your experience.</Title>
            <div className="fontSize_3 bold">Your feedback means a lot to us, good or bad.</div>
          </div>
          <form onSubmit={this.props.handleSubmit}>
            <div >
              <div className="pad18 noSidePad clearBoth">
                <div className="fontSize_3">How difficult or easy was it for you to use this website?</div>
              </div>
              <div className="centerBlock feedBackContainer">
                <ReactStars count={5} onChange={this.usabilityRatingChanged.bind(this)} size={45} color2="#ffd700" half={false} value={usability} />
                <span className="floatLeft">Difficult</span>
                <span className="floatRight">Easy</span>
              </div>
              <div className="pad18 noSidePad clearBoth">
                <div className="fontSize_3">How do you feel about your website experience?</div>
              </div>
              <div className="centerBlock feedBackContainer">
                <ReactStars count={5} onChange={this.overallRatingChanged.bind(this)} size={45} color2="#ffd700" half={false} value={overall} />
                <span className="floatLeft">Frustrated</span>
                <span className="floatRight">Happy</span>
              </div>
              <div>
                <div className="pad18 noSidePad clearBoth">
                  <textarea className="pad12 noSidePad width100" placeholder={placeholder} style={{ padding: 12 }} rows="4" onChange={this.onchange.bind(this)} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} />
                </div>
              </div>
              <div className="textAlignCenter">
                <A className="button large secondary margin12 onlyRightMargin" onClick={this.props.closeFeedback.bind(this)} >Cancel</A>
                {(usability === null && comments === '' && overall === null) ? <A className="button large disabled margin12 noSideMargin">Submit</A> : <A className="button large margin12 noSideMargin" onClick={this.postFeedback.bind(this)}>Submit</A>}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
Feedback.propTypes = {
  closeFeedback: PropTypes.func,
  handleSubmit: PropTypes.func,
};
export default Feedback;
