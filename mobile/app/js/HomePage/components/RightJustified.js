import React from 'react';
import PropTypes from 'prop-types';

class RightJustified extends React.PureComponent {
  render() {
    return (
      <div className="border_CC onlyBottomBorder clearfix landingPage_tiles">
        <div className="table width100">
          <div className="table_tr_flex">
            <div className="table_td_flex_left">
              <p className="fontSize_4 bold">{this.props.promo.title}</p>
              <div dangerouslySetInnerHTML={{ __html: this.props.promo.legalText }} />
              <a className="secondary button margin10 onlyTopMargin large" analyticstrack="shoplanding-cta" href={this.props.promo.URL}>{this.props.promo.CTA ? this.props.promo.CTA : 'Shop'}</a>
            </div>
            <div className="table_td_flex_right">
              <img className="deviceTile_img" src={this.props.promo.imageUrl} alt={this.props.promo.title} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RightJustified;

RightJustified.propTypes = {
  promo: PropTypes.object,
};
