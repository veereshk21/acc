/**
 * Created by hmahad on 5/2/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

const slideStyle = {
  maxHeight: '80vh',
  minHeight: '75vh',
  paddingBottom: '36px',
};

const contentStyle = {
  maxHeight: '45vh',
  overflow: 'hidden',
};

export default class PromoSlide extends React.PureComponent {
  render() {
    const { index, totalSlides } = this.props;
    return (
      <section className="group pad24  positionRelative" style={slideStyle}>
        {totalSlides > 1 && (
          <div>
            Promotion {index + 1} of {totalSlides}
          </div>
        )}
        <div className="fontSize_5 fontWeightBold margin24 noSideMargin" dangerouslySetInnerHTML={{ __html: this.props.promoitem.title }} />

        <div
          className="fontSize_2 pdp_promoReadMore"
          role="contentinfo"
          style={contentStyle}
          dangerouslySetInnerHTML={{ __html: this.props.promoitem.bodyText }}
        />
      </section>
    );
  }
}

PromoSlide.propTypes = {
  promoitem: PropTypes.object,
  index: PropTypes.number,
  totalSlides: PropTypes.number,
};
