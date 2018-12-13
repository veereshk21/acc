/**
 * Component renders a simple list item with a arrow icon for selection.
 * */

import React from 'react';
import PropTypes from 'prop-types';

export default class SelectListItem extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log('Error:', error, '\n Info:', info);
    // You can also log the error to an error reporting service
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong.</div>;
    }
    return (
      <li className="clearfix pad18 onlySidePad">
        <a
          aria-label={`${this.props.title} ${(this.props.value ? this.props.value : '')}`}
          className="color_000 clearfix border_grey onlyBottomBorder block pad18 noSidePad"
          role="button"
          onClick={this.props.onClickMethod}
        >
          <p className="floatLeft">
            <span className="fontTextBold">{this.props.title}</span>
            {(this.props.linkText && this.props.linkAction) &&
              <span> <br />
                <span
                  role="button"
                  onClick={this.props.linkAction}
                  className="link"
                >{this.props.linkText}
                </span>
              </span>}
          </p>
          <p className="floatRight">
            <span className="">{this.props.value}</span>
            <span className={this.props.hideCTA ? 'is-hidden color_red bold arrowCTA' : 'color_red bold arrowCTA'} />
          </p>
          {this.props.subtext &&
            <p className="clearRight floatRight width50 textAlignRight color_4B4B4B fontSize_2">{this.props.subtext}</p>}
        </a>
      </li>);
  }
}


SelectListItem.propTypes = {
  title: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  value: PropTypes.any,
  onClickMethod: PropTypes.func,
  linkAction: PropTypes.func,
  hideCTA: PropTypes.bool,
  subtext: PropTypes.string,
};
