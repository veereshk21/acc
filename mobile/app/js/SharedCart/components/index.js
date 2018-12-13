import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
/* Common components */
import HorizontalRule from '../../common/HorizontalRule';
import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';
import Button from '../../common/Button/Button';

/**
 * sharedCart Component
 * @class AccessoriesPage
 * @extends {Component}
 */
/* eslint-disable react/prefer-stateless-function */
class SharedCart extends Component {
  constructor(props) {
    super(props);
    this.onClickViewCTA = this.onClickViewCTA.bind(this);
    this.onClickClearCTA = this.onClickClearCTA.bind(this);
  }

  onClickClearCTA() {
    this.props.asyncFetch();
    this.props.clearCart('CLEAR', this.props.clearCartLink);
  }

  onClickViewCTA() {
    this.props.asyncFetch();
    window.location.href = this.props.cartLink;
  }

  render() {
    const {
      title, subTitle, items, isFetching, cqContent,
    } = this.props;
    return (
      <Grid className="pad32">
        {isFetching === true && <Loader />}
        <Row>
          <Col xs={12}>
            <Title>{title}</Title>
            <p className="pad12 onlyTopPad">{cqContent.label.OD_SHARED_CART_DEVICE_ADDED_TEXT}{subTitle}</p>
            <HorizontalRule />
          </Col>
          <Col xs={12}>
            {items.map((item, index) => {
              const img = item.deviceImageUrl.indexOf('?') > -1 ? item.deviceImageUrl.split('?')[0] : item.deviceImageUrl;
              return (
                <Row key={index + 'item'}>
                  <Col xs={6}>
                    <h3 className="fontSize_1_3" dangerouslySetInnerHTML={{ __html: item.brandName }} />
                    <h3 className="fontSize_1_3" dangerouslySetInnerHTML={{ __html: item.displayName }} />
                  </Col>
                  <Col xs={6} className="textAlignRight">
                    <img src={`${img}?wid=60&hei=100`} srcSet={`${img}?wid=120&hei=200 2x`} alt={item.displayName} />
                  </Col>
                  <Col xs={12}>
                    <HorizontalRule y={1} color="#D8DADA" />
                  </Col>
                </Row>
              );
            })}
          </Col>
          <Col xs={12} className="footerFixed sharedCartFooter">
            <Button
              type="button"
              onClick={this.onClickClearCTA}
              role="link"
              className="button secondary width40 margin6 onlySideMargin"
              analyticstrack="clear-saved-cart"
            >
              {cqContent.label.OD_SHARED_CART_CLEAR_CART_BUTTON_TEXT}
            </Button>
            <Button
              type="button"
              onClick={this.onClickViewCTA}
              role="link"
              className="button width40 primary margin6 onlySideMargin"
              analyticstrack="view-saved-cart"
            >
              {cqContent.label.OD_SHARED_CART_VIEW_CART_BUTTON_TEXT}
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

SharedCart.defaultProps = {
  isFetching: false,
};

SharedCart.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  items: PropTypes.array,
  isFetching: PropTypes.bool,
  asyncFetch: PropTypes.func,
  clearCart: PropTypes.func,
  cqContent: PropTypes.object,
  cartLink: PropTypes.string,
  clearCartLink: PropTypes.string,
};

export default SharedCart;
