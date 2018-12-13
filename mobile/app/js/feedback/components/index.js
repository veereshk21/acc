import React, { Component, PropTypes } from 'react';
import request from 'axios';
import { hashHistory } from './../../store';
import ReactStars from './ReactStars';
import A from '../../common//A/A';
import Title from '../../common/Title/Title';
import BackButton from '../../common/BackButton/BackButton';

class Feedback extends Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = { usability: null, overall: null, comment: '' };
  }

  onchange(event) {
    this.setState({ comment: event.target.value });
  }

  usabilityRatingChanged(usability) {
    this.setState({ usability });
  }

  overallRatingChanged(overall) {
    this.setState({ overall });
  }

  goBack() {
    hashHistory.goBack();
  }

  postFeedback() {
    return request({
      method: 'post',
      url: '/digital/feedback/customer/save',
      data: this.state,
    }).then(() => {
      window.location = hashHistory.goBack();
    }).catch(() => {
    });
  }
  render() {
    const { cqContent } = this.props;
    const { usability, overall } = this.state;
    return (
      <div>
        <div className="pad12 onlyTopPad">
          <BackButton onClick={this.goBack.bind(this)} />
        </div>
        <div className="textAlignCenter pad24">
          <div>
            <Title>{cqContent.label.OD_FEEDBACK_TITLE}</Title>
            <div className="fontSize_3 bold">{cqContent.label.OD_FEEDBACK_SUBTITLE}</div>
          </div>
          <form onSubmit={this.props.handleSubmit}>
            <div className="pad30 noSidePad">
              <div className="fontSize_3">How difficult or easy was it for you to use this website?</div>
              <div className="pad30 onlyLeftPad">
                <ReactStars count={5} onChange={this.usabilityRatingChanged.bind(this)} size={55} color2="#ffd700" half={false} value={usability} />
                <span className="floatLeft">Difficult</span>
                <span className="floatRight">Easy</span>
              </div>
            </div>
            <div className="pad30 noSidePad">
              <div className="fontSize_3">How do you feel about your website experience?</div>
              <div className="pad30 onlyLeftPad">
                <ReactStars count={5} onChange={this.overallRatingChanged.bind(this)} size={55} color2="#ffd700" half={false} value={overall} />
                <span className="floatLeft">Frustrated</span>
                <span className="floatRight">Happy</span>
              </div>
            </div>
            <div>
              <div className="pad12 noSidePad">
                <textarea className="pad12 noSidePad width80" type="text" placeholder={cqContent.label.OD_FEEDBACK_COMMENT_TEXT} style={{ padding: 12 }} onChange={this.onchange.bind(this)} />
              </div>
              <div className="pad18">
                <A className="button large secondary margin12 onlyRightMargin" onClick={this.goBack.bind(this)} >{cqContent.label.OD_FEEDBACK_CANCEL_CTA}</A>
                <A className="button large" onClick={this.postFeedback.bind(this)}>{cqContent.label.OD_FEEDBACK_SUBMIT_CTA}</A>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
Feedback.propTypes = {
  cqContent: PropTypes.object,
  handleSubmit: PropTypes.func,
};
export default Feedback;
