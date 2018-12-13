/**
 * Created by hmahad on 5/4/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from './../../store';

export default class PromoFullDescription extends Component {
  closeOverlay() {
    if (typeof this.props.closeOverlay !== 'undefined') {
      this.props.closeOverlay();
    } else {
      hashHistory.goBack();
    }
  }

  render() {
    return (
      <div
        className="positionFixed pad24 background_FF"
        style={{
          top: '60px', bottom: 0, left: 0, right: 0, zIndex: '10001',
        }}
      >
        <a className="secondaryCTA m-back boldText color_000" onClick={this.closeOverlay.bind(this)} analyticstrack="back-promo-description">Back</a>
        {this.props.promoitem &&
          <section className="group   positionRelative">
            <div className="fontSize_5 fontWeightBold margin24 noSideMargin">
              {this.props.promoitem.title}
            </div>
            <div className="fontSize_2" dangerouslySetInnerHTML={{ __html: this.props.promoitem.bodyText }} />
          </section>}
      </div>);
  }
}

PromoFullDescription.propTypes = {
  promoitem: PropTypes.object,
  closeOverlay: PropTypes.func,
};
