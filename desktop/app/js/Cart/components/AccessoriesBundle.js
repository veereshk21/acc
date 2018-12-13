import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
} from 'react-flexbox-grid';
import Anchor from './../../common/A/A';
import { parsePrice } from '././../../common/Helpers';

class AccessoriesBundle extends Component {
  constructor(props) {
    super(props);
    this.state = { isPrompted: false };

    this.toggleRemovePromptHandler = this.toggleRemovePromptHandler.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ isPrompted: false });
  }

  toggleRemovePromptHandler(e) {
    e.preventDefault();
    const { isPrompted } = this.state;
    this.setState({ isPrompted: !isPrompted });
  }

  // _handleKeyPress = (e) => {
  //   if (e.key === 'Enter' || e.keyCode === 13) {
  //     e.preventDefault();
  //     this.toggleRemovePromptHandler();
  //   }
  // }

  render() {
    const {
      imgUrl, displayName, discountedPrice, regularPrice, cqContent, onRemove, commerceItemId, skuID, showRemoveCTA, childAccessory, discountPercentage,
    } = this.props;
    return (
      <div>
        {!this.state.isPrompted ?
          <Row>
            <Col md={2} lg={2} className={`${childAccessory === true ? 'textAlignRight' : 'textAlignLeft'}`}>
              {childAccessory !== true &&
                <img
                  width={75}
                  src={imgUrl}
                  alt={displayName}
                  itemProp="image"
                />
              }
            </Col>
            <Col md={6} lg={6}>
              {childAccessory === true ?
                <Row>
                  <Col md={3} lg={3}>
                    <img
                      width={75}
                      src={imgUrl}
                      alt={displayName}
                      itemProp="image"
                    />
                  </Col>
                  <Col md={9} lg={9}>
                    <p className="fontSize_4" dangerouslySetInnerHTML={{ __html: displayName }} />
                  </Col>
                </Row>
                :
                <p className="bold fontSize_5" dangerouslySetInnerHTML={{ __html: displayName }} />
              }
              <Row>
                <Col md={3} lg={3}>
                  {showRemoveCTA === true &&
                    <Anchor
                      className="fontSize_4 margin12 onlyTopMargin block color_333"
                      onClick={this.toggleRemovePromptHandler}
                      href="#"
                      analyticstrack="accessories-bundle-remove-link"
                    >Remove
                    </Anchor>
                  }
                </Col>
              </Row>
              <Row>
                <Col md={9} lg={9}>
                  {(discountPercentage > 0) &&
                    <div style={{ position: 'relative' }} className="fontSize_4 margin12 onlyTopMargin block color_blue bold">
                      <span dangerouslySetInnerHTML={{ __html: 'Sale&nbsp;' + parseFloat(discountPercentage, 10) + '%&nbsp;off' }} />
                    </div>
                  }
                </Col>
              </Row>
            </Col>
            <Col md={4} lg={4}>
              <Row>
                <Col md={6} lg={6}>
                  <div className="textAlignRight bold">
                    <span>--</span>
                  </div>
                </Col>
                <Col md={6} lg={6}>
                  <div className="textAlignRight pad30 onlyRightPad">
                    <span className={`${childAccessory === true ? '' : 'bold'}`}>${discountedPrice}</span>
                    {parsePrice(regularPrice) > parsePrice(discountedPrice) &&
                      <div>
                        <span className="textDecLineThrough">${regularPrice}</span>
                      </div>
                    }
                  </div>
                </Col>
              </Row>
            </Col>
          </Row> :
          <div className="pad20 fontSize_4 noSidePad">
            <p className="fontSize_5 bold">{`Are you sure you want to remove ${displayName} from your cart?`}</p>
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
                        analyticstrack="accessories-bundle-cancel-remove-link"
                      >{cqContent.label.DT_OD_CART_CANCEL_CTA_TEXT}
                      </Anchor>
                      <span className="margin6 onlySideMargin">|</span>
                      <button
                        className="button primary"
                        onClick={() => {
                          onRemove({
                            commerceItemId,
                            accSkuId: skuID,
                            accProdId: skuID,
                            accName: displayName,
                          });
                        }}
                        analyticstrack="accessories-bundle-remove-cta"
                      >{cqContent.label.DT_OD_CART_REMOVE_TEXT}
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>}
        {this.props.children}
      </div>);
  }
}

AccessoriesBundle.defaultProps = {
  showRemoveCTA: true,
  childAccessory: true,
};
AccessoriesBundle.propTypes = {
  imgUrl: PropTypes.string,
  displayName: PropTypes.string,
  discountedPrice: PropTypes.string,
  regularPrice: PropTypes.string,
  cqContent: PropTypes.object,
  onRemove: PropTypes.func,
  commerceItemId: PropTypes.string,
  skuID: PropTypes.string,
  showRemoveCTA: PropTypes.bool,
  childAccessory: PropTypes.bool,
  children: PropTypes.array,
  discountPercentage: PropTypes.string,
};

export default AccessoriesBundle;
