/**
 * Component renders a simple list item with a arrow icon for selection.
 * */

import React from 'react';
import PropTypes from 'prop-types';

export default class SelectListItem extends React.Component { // eslint-disable-line
  render() {
    return (
      <div className={`${this.props.className} clearfix  fontSize_6`}>
        <a analyticstrack={this.props.analyticstrack} aria-label={`${this.props.title} ${(this.props.value ? this.props.value : '')}`} className="block color_000 clearfix" role="button" href="df" onClick={this.props.onClickMethod}>
          <div className="">
            <div className=" clearfix">
              <div className=" verticalAlignMiddle textAlignLeft floatLeft">
                <div className=""><span className="bold  textDecUnderline">{this.props.title}</span>
                  {this.props.linkText &&
                  <a role="button" onClick={this.props.linkAction} className="pad5 block">{this.props.linkText}</a>}
                </div>
              </div>
              <div className=" verticalAlignMiddle textAlignRight  fontSize_4 floatLeft">
                <p className="floatRight price m-downArrow m-cpcPlanArrow"><span dangerouslySetInnerHTML={{ __html: this.props.value }} />
                  <span className={this.props.hideCTA ? 'bold  fontSize_3' : '  margin5 noBottomMargin displayInlineBlock bold arrowCTA fontSize_1'} />
                </p>
                {this.props.subtext &&
                <p className="clearRight floatRight  textAlignRight color_4B4B4B fontSize_2">{this.props.subtext}</p>}
              </div>
            </div>
          </div>
        </a>
      </div>);
  }
}

SelectListItem.propTypes = {
  title: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  className: PropTypes.string,
  subtext: PropTypes.string,
  value: PropTypes.any,
  onClickMethod: PropTypes.func,
  linkAction: PropTypes.func,
  hideCTA: PropTypes.bool,
  analyticstrack: PropTypes.string,
};
