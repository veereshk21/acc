import axios from 'axios';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

import FeedbackStars from './FeedbackStars';

class Feedback extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  static propTypes = {
    hideFeedback: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      usabilityRating: 0,
      overallRating: 0,
      comment: '',
    };
    this.onUsabilityRatingChangeHandler = this.onUsabilityRatingChangeHandler
      .bind(this);
    this.onOverallRatingChangeHandler = this.onOverallRatingChangeHandler.bind(
      this);
    this.onCommentChangeHandler = this.onCommentChangeHandler.bind(this);
    this.onCancelHandler = this.onCancelHandler.bind(this);
    this.onPostFeedbackHandler = this.onPostFeedbackHandler.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme),
    };
  }

  onUsabilityRatingChangeHandler(usabilityRating) {
    this.setState({
      usabilityRating,
    });
  }

  onOverallRatingChangeHandler(overallRating) {
    this.setState({
      overallRating,
    });
  }

  onCommentChangeHandler(event) {
    this.setState({
      comment: event.target.value.toString().trim(),
    });
  }

  onPostFeedbackHandler() {
    axios({
      method: 'post',
      url: '/od/cust/auth/feedback/customer/save',
      data: this.state,
    }).then(() => {
      this.props.hideFeedback();
    }).catch((error) => {
      console.log(error);
    });
  }

  onCancelHandler() {
    this.props.hideFeedback();
  }

  render() {
    const styles = {

      parentDiv: {
        minHeight: 50,
        width: '100%',
        float: 'left',
        margin: '30px 0 50px 0',
      },

      input: {
        marginTop: 0,
        border: '1px solid',
        borderColor: '#dbdddd',
        borderBottom: 0,
        borderRadius: 0,
        paddingLeft: 12,
        width: '100%',
      },
      underlineDefault: {
        bottom: '-2px',
        borderWidth: 2,
        borderColor: '#000000',
      },

      underlineFocus: {
        bottom: '-2px',
        borderColor: '#00AC3E',
      },
      hintStyle: {
        top: 0,
        padding: '15px',
      },
    };

    const { usabilityRating, overallRating } = this.state;
    return (<div className="pad20">
      <h1>Rate your experience</h1>
      <div className="border_black onlyBottomBorder margin6 onlyTopMargin" />
      <p className="margin6 noSideMargin">Your feedback means a lot to us, good or bad</p>

      <h2 className="fontSize_5 margin18 noSideMargin">How difficult or easy was it for you to use this website?</h2>

      <div className="clearfix">
        <FeedbackStars
          onChange={this.onUsabilityRatingChangeHandler}
          count={5}
          size={36}
          color2={'#eaa243'}
          half={false}
          value={usabilityRating}
        />
        <div style={{ width: '216px' }} className="bold">
          <span className="floatLeft">Difficult</span>
          <span className="floatRight">Easy</span>
        </div>
      </div>

      <div className="border_e6 onlyBottomBorder clearfix margin18 noSideMargin" />

      <h2 className="fontSize_5 margin18 noSideMargin">How do you feel about your website experience?</h2>

      <div className="clearfix">
        <FeedbackStars
          onChange={this.onOverallRatingChangeHandler}
          count={5}
          size={36}
          color2={'#eaa243'}
          half={false}
          value={overallRating}
        />
        <div style={{ width: '220px' }} className="bold">
          <span className="floatLeft">Frustrated</span>
          <span className="floatRight">Happy</span>
        </div>

      </div>


      <TextField
        style={{ ...styles.parentDiv }}
        inputStyle={{
          ...styles.input,

        }}
        hintStyle={{ ...styles.hintStyle }}
        hintText="Feedback text..."
        multiLine
        rows={2}
        underlineStyle={styles.underlineDefault}
        underlineFocusStyle={(styles.underlineFocus)}
        onChange={this.onCommentChangeHandler}
      />

      <div className="clearfix margin42 onlyTopMargin">
        <button className="button secondary margin30 onlyRightMargin" onClick={this.onCancelHandler}>Cancel</button>
        <button className="button primary" disabled={!(this.state.overallRating > 0 && this.state.usabilityRating > 0)} onClick={this.onPostFeedbackHandler}>Submit</button>
      </div>

    </div>);
  }
}

export default Feedback;
