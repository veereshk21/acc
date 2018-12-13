import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CountdownClock extends Component {
  constructor(props) {
    super(props);
    const __counter = (typeof window.duration !== 'undefined') ? window.duration : 0;
    this.state = {
      time: new Date(this.props.givenDate) / 1000,
      duration: __counter,
      // time: new Date('2017-08-25T20:56-0400')/1000,
    };
  }

  componentWillMount() {
    clearInterval(this.decr);
  }

  componentDidMount() {
    this.decr = setInterval(this.update, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.decr);
  }
  clockFormat = (days, hours, mins, secs, completed) => { // eslint-disable-line
    let format = null;
    const { cssClass, styleName } = this.props;
    if (completed === false) { // This is to detect if countdown completed;
      if (days > 0) { // helps detect if there 0 days left. If so we shouldnt show days anymore, just hour, min, sec
        format = (
          <span className={`black fontTextMedium fontSize_1 color_000 ${cssClass}`} style={styleName}>
            <span style={{ width: '45px' }}>{days}<sup className="fontSize_6">D </sup></span>
            <span style={{ width: '45px' }}>{hours}<sup className="fontSize_6">H </sup></span>
            <span style={{ width: '45px' }}>{mins}<sup className="fontSize_6">M</sup></span>
          </span>);
        // {days + ':' + hours + ':' + mins}
      } else {
        format = (
          <span className={`black fontTextMedium fontSize_1 color_000 ${cssClass}`} style={styleName}>
            {hours}:{mins}:{secs}
          </span>
        );
      }
      return format;
    }
    // clearInterval(this.decr);
  }

  update = () => {
    const newTime = this.state.time - 1; // minus one sec from initial time
    const duration = this.state.duration - 1000;
    this.setState({
      time: newTime,
      duration,
    });
    this.isCountDownCompleted();
  }

  isCountDownCompleted = () => {
    const timeObj = this.calculateTimeRemaining();
    if (timeObj.completed) {
      this.props.onComplete();
    }
  }
  calculateTimeRemaining = () => {
    const { duration } = this.state;
    const formattedGivenDate = new Date(this.props.givenDate);
    const today = new Date();
    const msDiff = (typeof window.duration !== 'undefined') ? duration : (formattedGivenDate - today);
    let days = parseInt(msDiff / (24 * 3600 * 1000), 10);
    let hours = parseInt((msDiff / (3600 * 1000)) - (days * 24), 10);
    let mins = parseInt((msDiff / (60 * 1000)) - (days * 24 * 60) - (hours * 60), 10);
    let secs = parseInt((msDiff / (1000)) - (mins * 60) - (days * 24 * 60 * 60) - (hours * 60 * 60), 10);
    if (msDiff < 0) { // when is past the givenDate then countdown is completed
      return {
        days: 0, hours: 0, mins: 0, secs: 0, completed: true,
      };
    }
    if (days < 10) days = '0' + days;
    if (hours < 10) hours = '0' + hours;
    if (mins < 10) mins = '0' + mins;
    if (secs < 10) secs = '0' + secs;
    return {
      days, hours, mins, secs, completed: false,
    };
  }
  render() {
    const {
      days, hours, mins, secs, completed,
    } = this.calculateTimeRemaining();
    return (
      <span>
        {this.clockFormat(days, hours, mins, secs, completed)}
      </span>
    );
  }
}

CountdownClock.propTypes = {
  givenDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  onComplete: PropTypes.func,
  cssClass: PropTypes.string,
  styleName: PropTypes.object,
};

export default CountdownClock;
