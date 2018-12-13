/**
 * CartEmpty - renders a empty cart page
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';

import EmptyCartImg from '../../../images/empty-cart-w80.svg';

export default class CartEmpty extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidMount() {
    /* Removing any visible notifications once cart is cleared */
    this.props.hideNotification();
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
      <div className="pad20">
        <section className="section group ">
          <h4 className="pad12 textAlignCenter noSideMargin">{this.props.lonelyCartHeading}</h4>
          <p className="fontSize_1_3 textAlignCenter">{this.props.lonelyCartSub}</p>
        </section>
        <form method="GET" name="emptyCartForm" action={this.props.shopMoreLink}>
          <section className="section group vh60 ">
            <div className="media_splash pad20 emptyCartImage background_lightOrange">
              <img src={EmptyCartImg} alt="Upgrade right here, right now." className="img_boxShadow" />
            </div>
          </section>
          <section className="section group textAlignCenter">
            <Button type="submit" role="button" className="button primary large" analyticstrack="empty-cart-shop">{this.props.shopbtn}</Button>
          </section>
        </form>
      </div>);
  }
}

CartEmpty.propTypes = {
  lonelyCartHeading: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  lonelyCartSub: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  shopMoreLink: PropTypes.string,
  shopbtn: PropTypes.string,
  hideNotification: PropTypes.func,
};
