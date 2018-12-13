import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackButton from '../../common/BackButton/BackButton';

class ShipByModal extends Component { // eslint-disable-line
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
      <div className="pad12 onlyTopPad">
        <BackButton to="/" >
          {this.props.cqLabel.get('OD_CART_BACK_CTA')}
        </BackButton>
        <div className="pad36">
          <h5 className="margin12 onlyTopMargin width90 textAlignCenter centerBlock">{this.props.cqLabel.get('OD_CART_EST_SHIPDATE_TITLE')} {this.props.shipsByDate}</h5>
          <div className="margin24 noSideMargin border_EB onlyBottomBorder pad20 onlyBottomPad">
            <div className="fontTextBold fontSize_3">{this.props.cqLabel.get('OD_CART_SHIPBY_ITEMAVAIL_TITLE')}</div>
            <div className="color_959595 fontSize_2">{this.props.cqLabel.get('OD_CART_SHIPBY_ITEMAVAIL_CONTENT')}</div>
          </div>
          <div className="margin24 noSideMargin border_EB onlyBottomBorder pad20 onlyBottomPad">
            <div className="fontTextBold fontSize_3">{this.props.cqLabel.get('OD_CART_SHIPPING_DATE_TITLE')}</div>
            <div className="color_959595 fontSize_2">{this.props.cqLabel.get('OD_CART_SHIPPING_DATE_CONTENT')}</div>
          </div>
          <div className="margin24 noSideMargin">
            <div className="fontTextBold fontSize_3">{this.props.cqLabel.get('OD_CART_PAYMENT_TITLE')}</div>
            <div className="color_959595 fontSize_2">{this.props.cqLabel.get('OD_CART_PAYMENT_CONTENT')}</div>
          </div>
        </div>
      </div>
    );
  }
}
ShipByModal.propTypes = {
  cqLabel: PropTypes.object,
  shipsByDate: PropTypes.string,
};

export default ShipByModal;
