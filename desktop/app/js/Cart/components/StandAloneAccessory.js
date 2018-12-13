import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
} from 'react-flexbox-grid';
import Anchor from './../../common/A/A';

class StandAloneAccessory extends Component {
  constructor(props) {
    super(props);
    this.state = { isPrompted: false };

    this.toggleRemovePromptHandler = this.toggleRemovePromptHandler.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ isPrompted: false });
  }

  toggleRemovePromptHandler() {
    const { isPrompted } = this.state;
    this.setState({ isPrompted: !isPrompted });
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      this.toggleRemovePromptHandler();
    }
  }
  render() {
    const {
      imageUrl,
      name,
      price,
      wasPrice,
      cqContent,
      onRemove,
      commerceItemId,
      skuId,
      prodId,
      editAccessoryUrl,
      color,
      discounted,
      discountPercentage,
      hideEditLink,
      standaloneAccessory,
      instantCreditEligible,
      instantCreditAdjustedPrice,
      instantCreditAppliedInfo,
      size,
      asyncFetch,
    } = this.props;
    return (
      <div className="pad20 noSidePad fontSize_4">
        {!this.state.isPrompted ?
          <Row>
            <Col xs={4} md={2} lg={2}>
              <img
                className="maxWidth100"
                src={imageUrl}
                alt={name}
                itemProp="image"
              />
            </Col>
            <Col xs={8} md={10} lg={10}>
              <Row>
                <Col md={7} lg={7}>
                  <Row className="bold">
                    <Col xs={12} dangerouslySetInnerHTML={{ __html: name }} />
                  </Row>
                </Col>
                {!instantCreditEligible && <Col md={5} lg={5}>
                  <Row>
                    <Col xs={6} className="textAlignRight bold">--</Col>
                    <Col xs={6}>
                      <div className="textAlignRight pad30 onlyRightPad">
                        {discounted ?
                          <div>
                            <span className="bold block">${price}</span>
                            <span className="textDecLineThrough">${wasPrice}</span>
                          </div>
                          :
                          <span className="bold">${price}</span>
                        }
                      </div>
                    </Col>
                  </Row>
                </Col>}
                <Col xs={12}>
                  <div className="pad12 onlyTopPad">
                    {size}{size && color && ', '}{color}
                  </div>
                  {instantCreditEligible &&
                    <div className="pad12 noSidePad">
                      <div>
                        <p>
                          <span>{cqContent.label.DT_OD_CART_RETAIL_PRICE_TEXT}</span>
                          <span className="bold">${price}</span>
                        </p>
                        <p>{instantCreditAppliedInfo}</p>
                      </div>
                      <Row>
                        <Col md={7} lg={7}>
                          <span>{cqContent.label.DT_OD_CART_ADJUSTED_PRICE}</span>
                        </Col>
                        <Col md={5} lg={5}>
                          <Row>
                            <Col xs={6} className="textAlignRight bold">--</Col>
                            <Col xs={6}>
                              <div className="textAlignRight pad30 onlyRightPad">
                                {/* discounted ?
                                  <div>
                                    <span className="bold block">${price}</span>
                                    <span className="textDecLineThrough">${wasPrice}</span>
                                  </div>
                                  :
                                  <span className="bold">${price}</span>
                                */}
                                <span className="bold">${instantCreditAdjustedPrice}</span>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  }
                  <div className="margin12 onlyTopMargin">
                    {standaloneAccessory &&
                      (hideEditLink !== true) && <Anchor
                        className="fontSize_4 color_333"
                        onClick={() => { asyncFetch(); window.location.href = editAccessoryUrl; }}
                        analyticstrack="edit-accessory-link"
                      >{cqContent.label.DT_OD_CART_EDIT_TEXT}
                      </Anchor>
                    }
                    {standaloneAccessory &&
                      hideEditLink !== true &&
                      <span className="margin6 onlySideMargin">|</span>
                    }
                    <Anchor
                      className="fontSize_4 color_333"
                      onClick={this.toggleRemovePromptHandler}
                      analyticstrack="remove-accessory-link"
                    >{cqContent.label.DT_OD_CART_ACCESSORIES_REMOVE_CTA_TEXT}
                    </Anchor>
                  </div>
                  {discounted &&
                    <Row className="pad12 onlyTopPad">
                      <Col xs={12} style={{ position: 'relative' }}>
                        <span className="bold color_blue">{cqContent.label.DT_OD_CART_STANDALONE_ACCESSORY_PROMO_MESSAGE.replace('$PERCENTAGE$', Math.floor(discountPercentage))}</span>
                      </Col>
                    </Row>
                  }
                </Col>
              </Row>
            </Col>
          </Row>
          :
          <div>
            <p className="fontSize_5 bold" dangerouslySetInnerHTML={{ __html: `Are you sure you want to remove ${name} from your cart?` }} />
            <div className="margin12 onlyTopMargin">
              <Row>
                <Col md={12}>
                  <Row end="md">
                    <Col md={6}>
                      <Anchor
                        tabIndex="0"
                        className="color_333 fontSize_4 textDecUnderline"
                        onClick={this.toggleRemovePromptHandler}
                        href="#"
                        analyticstrack="cancel-accessory-link"
                      >
                        {cqContent.label.DT_OD_CART_CANCEL_CTA_TEXT}
                      </Anchor>
                      <span className="margin6 onlySideMargin">|</span>
                      <button
                        className="button primary"
                        onClick={() => {
                          onRemove({ commerceItemId, accSkuId: skuId, accProdId: prodId });
                        }}
                        analyticstrack="remove-accessory-cta"
                      >{cqContent.label.DT_OD_CART_REMOVE_TEXT}
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>}
      </div>
    );
  }
}

StandAloneAccessory.propTypes = {
  imageUrl: PropTypes.string,
  instantCreditAppliedInfo: PropTypes.string,
  instantCreditAdjustedPrice: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  wasPrice: PropTypes.string,
  cqContent: PropTypes.object,
  onRemove: PropTypes.func,
  commerceItemId: PropTypes.string,
  skuId: PropTypes.string,
  prodId: PropTypes.string,
  editAccessoryUrl: PropTypes.string,
  color: PropTypes.string,
  discounted: PropTypes.bool,
  discountPercentage: PropTypes.number,
  hideEditLink: PropTypes.bool,
  standaloneAccessory: PropTypes.bool,
  instantCreditEligible: PropTypes.bool,
  size: PropTypes.string,
  asyncFetch: PropTypes.func,

};

export default StandAloneAccessory;
