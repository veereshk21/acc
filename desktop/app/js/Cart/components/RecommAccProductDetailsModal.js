import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';

class RecommAccProductDetailsModal extends Component {
  constructor(props) {
    super(props);

    this.state = { quantity: 1 };

    this.onAddToCartHandler = this.onAddToCartHandler.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }
  onAddToCartHandler() {
    this.props.onAddToCart(this.state.quantity);
  }
  handleQuantityChange(event) {
    this.setState({ quantity: event.target.value });
  }
  render() {
    const { brand, displayImageLargeURL, description, skuDetails } = this.props;
    const { displayName, retailPrice } = skuDetails[0];
    return (<div>

      <Row>
        <Col md={5} lg={5}>
          <img alt="recommended accessory" itemProp="image" className="recommAccPDP_img" src={displayImageLargeURL} />
        </Col>
        <Col md={7} lg={7}>
          <h1 className="fontSize_10" dangerouslySetInnerHTML={{ __html: brand }} />
          <h2 dangerouslySetInnerHTML={{ __html: displayName }} />
          <div className="recommAccPDP_description">
            <p className="margin18 onlyTopMargin" dangerouslySetInnerHTML={{ __html: description }} />
          </div>
          <p className="bold margin18 noSideMargin fontSize_7">${retailPrice}</p>
          <Row>
            <Col md={6} lg={6} className="verticalAlignMiddle recommAccPDP_quantityDropDown">

              <div className="mSelectWrapper borderStyle">
                <select className="width60 height22 mSelect" analyticstrack="select-quantity" value={this.state.quantity} onChange={this.handleQuantityChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <div className="dropdownChevron" />
                <div className="largeBorder_black onlyBottomBorder" />
              </div>
            </Col>
            <Col md={6} lg={6} className="textAlignRight">
              <button className="button primary" onClick={this.onAddToCartHandler} analyticstrack="add-to-cart-cta">Add to cart</button>
            </Col>
          </Row>
        </Col>

      </Row>

    </div>);
  }
}

RecommAccProductDetailsModal.propTypes = {
  brand: PropTypes.string,
  displayImageLargeURL: PropTypes.string,
  description: PropTypes.string,
  skuDetails: PropTypes.array,
  onAddToCart: PropTypes.func,
};
export default RecommAccProductDetailsModal;
