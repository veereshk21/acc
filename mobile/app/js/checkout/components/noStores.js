import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from './../../store';

export default class NoStores extends Component {
  getFree2DayShipping() {
    hashHistory.push('/shippingMethod');
  }

  render() {
    const { cqContent } = this.props;
    return (
      <div>
        <div className="section group pad24 onlyTopPad">
          <div className="pad24 onlySidePad">
            <div className="vh70">
              <h2 className="textAlignCenter pad20 onlySidePad">{cqContent.label.OD_CHECKOUT_ISPU_NO_SEARCH_RESULTS_TITLE_TEXT}</h2>
              <div className="smallText textAlignCenter pad36">{cqContent.label.OD_CHECKOUT_ISPU_NO_SEARCH_RESULTS_DESCRIPTION_TEXT}</div>
            </div>
            <div className="textAlignCenter margin36 noSideMargin width100 floatLeft">
              <button className="button large" onClick={this.getFree2DayShipping.bind(this)}>Get free 2-day shipping</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
NoStores.propTypes = {
  cqContent: PropTypes.object,
};
