import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import RadioButton from '../../common/RadioButton/index';

class AccessoryBundle extends React.Component {
  handleOptionChange(data) {
    let params;
    if (data !== null) {
      params = {
        skuId: data.skuID,
        displayName: data.displayName,
      };
    } else {
      params = null;
    }
    this.props.onBundleSelected(params);
  }

  toFixedLength(value) {
    const val = parseFloat(value);
    return val.toFixed(2);
  }

  render() {
    const { cqContent, defaultSelection } = this.props;
    return (
      <Row>
        <Col xs={12} className="border_black borderSize_4 onlyTopBorder">
          <Row>
            <Col xs={12}>
              <h2 className="pad18 onlyTopPad fontSize_7">
                {cqContent.label.DT_OD_PROTECTION_BUNDLE_TITLE}
              </h2>
              <p className="fontSize_4 margin10 onlyTopMargin">
                {cqContent.label.DT_OD_PROTECTION_BUNDLE_SUB_TITLE}
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {this.props.bundleData.map((item, index) => (
                <Row key={`item${index}`} className="border_grayThree onlyBottomBorder borderSize_1 pad30 noSidePad">
                  <Col xs={12}>
                    <Row>
                      <Col lg={6} sm={7}>
                        <Row>
                          <Col xs={9}>
                            <div>
                              <RadioButton
                                name="BundleBuilder"
                                id={'Bundle' + index}
                                value={item.displayName}
                                containerClassName=" "
                                labelClassName="verticalTop displayInlineBlock pad12 onlyLeftPad bundleTitle"
                                checked={defaultSelection === item.skuID}
                                onChange={this.handleOptionChange.bind(this, item)}
                                analyticstrack="select-bundle-accessory-radio"
                              >
                                <div>
                                  <div className="fontSize_5 bold">{item.displayName}</div>
                                  {item.savedPrice > 0 &&
                                    <p className="pad20 onlyTopPad">You will save <b>${item.savedPrice}</b> while purchasing this bundle. It includes:</p>
                                  }
                                </div>
                              </RadioButton>
                            </div>
                          </Col>
                          <Col xs={3}>
                            <div className="pad5 onlyLeftPad">
                              {item.savedPrice > 0 ?
                                <div>
                                  <div className="bold textRight fontSize_5">${this.toFixedLength(item.discountedPrice)}</div>
                                  <p className="fontSize_4 color_959595 textRight">was <span className="textDecLineThrough">${this.toFixedLength(item.regularPrice)}</span></p>
                                </div>
                                :
                                <div className="bold fontSize_5 textRight">${this.toFixedLength(item.regularPrice)}</div>
                              }
                            </div>
                          </Col>
                        </Row>
                        <Row className="clearfix">
                          <Col xs={12} className="margin20 onlyLeftMargin">
                            {item.bundleBreakdown.map((accessory, i) => (
                              <Row key={`acc${i}`} className="positionRelative pad12 noSidePad clearfix">
                                <Col xs={12}>
                                  <Row>
                                    <Col xs={9}>
                                      <p className="pad18 onlyLeftPad">{accessory.displayName}</p>
                                    </Col>
                                    <Col xs={3} className="textAlignRight">
                                      <div className="pad20 onlyRightPad whiteSpaceNoWrap">
                                        {accessory.skuDetails[0].discountedPrice > 0 ?
                                          <div>
                                            <p className="textRight">${this.toFixedLength(accessory.skuDetails[0].discountedPrice)}</p>
                                            <p className="fontSize_4 color_959595 textRight">was <span className="textDecLineThrough">${this.toFixedLength(accessory.skuDetails[0].price)}</span></p>
                                          </div>
                                          :
                                          <p className="textRight">${this.toFixedLength(accessory.skuDetails[0].price)}</p>
                                        }
                                      </div>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            ))}
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={6} sm={5} className="textAlignCenter">
                        <img src={item.imgUrl} alt={item.displayName} width="150px" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))}
              <Row key={`item${this.props.bundleData.length}`}>
                <Col xs={8}>
                  <div className="pad30 noSidePad">
                    <RadioButton
                      name="BundleBuilder"
                      id={'Bundle' + this.props.bundleData.length}
                      value={cqContent.label.DT_OD_PROTECTION_BUNDLE_NO_THANKS_TEXT}
                      containerClassName=" "
                      labelClassName="verticalTop displayInlineBlock pad12 onlyLeftPad"
                      checked={!defaultSelection}
                      onChange={this.handleOptionChange.bind(this, null)}
                      analyticstrack="select-no-thanks-accessory-radio"
                    >
                      <div>
                        <p className="pad5 onlyTopPad bold fontSize_5">
                          {cqContent.label.DT_OD_PROTECTION_BUNDLE_NO_THANKS_TEXT}
                        </p>
                      </div>
                    </RadioButton>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

AccessoryBundle.propTypes = {
  bundleData: PropTypes.array,
  onBundleSelected: PropTypes.func,
  cqContent: PropTypes.object,
  defaultSelection: PropTypes.string,
};

export default AccessoryBundle;
