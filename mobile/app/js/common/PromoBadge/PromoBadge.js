
import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';


// e0a0
class PromoBadge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      className, animated, children, hasSwiper, badgeTextClass, ...rest
    } = this.props;
    const params = {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        bulletClass: 'is-hidden',
      },
      slidesPerView: 1,
      slidesPerColumn: 1,
      spaceBetween: 20,

      watchOverflow: true,
      runCallbacksOnInit: false,
      setWrapperSize: true,

    };

    const BADGE_TEXT_CLASS = badgeTextClass || 'fontSize_1';

    return (
      <Row {...rest} className={`pad24 onlySidePad background_00 promo positionRelative color_FFF ${className}`} >
        <Col
          xs={12}
          className="margin6 noSideMargin height30 width100"
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            display: 'flex',
            minHeight: '20px',
            overflow: 'hidden',
          }}
        >
          {hasSwiper ?
            <Swiper {...params}>
              {this.props.children}
            </Swiper>
            : <span className={BADGE_TEXT_CLASS}>{this.props.children}</span>
          }
        </Col>
      </Row>
    );
  }
}
PromoBadge.defaultProps = {
  className: '',
  animated: true,
  hasSwiper: false,
};
PromoBadge.propTypes = {
  className: PropTypes.string,
  animated: PropTypes.bool,
  children: PropTypes.any,
  hasSwiper: PropTypes.bool,
  badgeTextClass: PropTypes.string,
};
export default PromoBadge;
