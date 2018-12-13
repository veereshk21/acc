import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackButton from '../../common/BackButton/BackButton';

class BicOfferDetail extends Component { // eslint-disable-line
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
    const selectedItem = this.props.selectedItem[0];
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong.</div>;
    }
    return (
      <div className="pad12 onlyTopPad">
        <BackButton to="/" >
          {this.props.cqLabel.get('OD_CART_BACK_CTA')}
        </BackButton>
        <div className="pad36 onlySidePad">
          <h5 className="red margin12 onlyTopMargin width80 textAlignCenter centerBlock ">Offer Details</h5>
          {(typeof selectedItem.bicMessage === 'object' && selectedItem.bicMessage !== null) && <div className="pad24 noSidePad">{selectedItem.bicMessage.message}</div>}
          <div>{selectedItem.bicMessagetooltip}</div>

        </div>
      </div>
    );
  }
}
BicOfferDetail.propTypes = {
  cqLabel: PropTypes.object,
  selectedItem: PropTypes.array,
};

export default BicOfferDetail;
