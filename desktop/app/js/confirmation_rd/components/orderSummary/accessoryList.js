import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

class AccessoryListWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { featureTypeText: 'Show', featureTypeCSS: 'hide', displayFeatureType: false };
  }

  renderSaveContent(list) {
    const accessoryData = list;
    const { cqContent, accessoriesBundleExist } = this.props;
    return (
      <div>
        {accessoryData.map((accessory, id) => (
          <div
            key={`accessoryData-${id}`}
            className="accessory_list_item_details"
          >
            {accessoriesBundleExist &&
              <hr className="margin20 noSideMargin" style={{ borderColor: '#CCC' }} />
            }
            {(!accessoriesBundleExist && id !== 0) &&
              <hr className="margin20 noSideMargin" style={{ borderColor: '#CCC' }} />
            }
            <Row>
              <Col xs={3} >
                {accessory.imageUrl &&
                  <div className="textAlignLeft">
                    <img className="maxWidth100" src={accessory.imageUrl} alt={accessory.name} />
                  </div>
                }
              </Col>

              <Col xs={5} >
                <div className="pad12 onlyBottomPad color_black">
                  <p className="bold fontSize_8">{accessory.name}</p>
                  <p>
                    {accessory.size &&
                      <span>{accessory.size}</span>
                    }
                    {accessory.size && accessory.color &&
                      <span>, </span>
                    }
                    {accessory.color &&
                      <span>{accessory.color}</span>
                    }                  </p>
                  {accessory.instantCreditApplied ?
                    <div className="pad12 onlyTopPad">
                      {/* Instant credit */}
                      <p>Retail price: <span className="bold">${accessory.originalPrice}</span></p>
                      <p>Instant credit applied to price: <span className="bold">-{accessory.instantCreditApplied}</span></p>
                      {accessory.discounted &&
                        <p>
                          {accessory.discountPercentage ?
                            <span>{cqContent.label.DT_OD_CONFIRMATION_SUMMARY_STANDALONE_ACCESSORY_IC_PROMO_MESSAGE.replace('$PERCENTAGE$', accessory.discountPercentage)}</span>
                            :
                            <span>Sale {accessory.percentageOffTxt} discount: </span>
                          }
                          <span className="bold">-${accessory.discountPrice.toFixed(2)}</span>
                        </p>
                      }
                      <p>Adjusted price: <span className="bold">${accessory.price}</span></p>
                    </div>
                    :
                    <div className="pad5 noSidePad margin5 onlyTopMargin">
                      {/* BAU */}
                      {accessory.discounted ?
                        <div>
                          <span className="textDecLineThrough">${accessory.originalPrice}</span>
                          <span className="bold">&nbsp;${accessory.price}</span>
                        </div>
                        :
                        <span className="bold">${accessory.price}</span>
                      }
                    </div>
                  }
                  <div className="pad5 noSidePad">
                    <span>{cqContent.label.DT_OD_CONFIRMATION_QTY_TEXT}</span>
                    <span className="pad5 onlyLeftPad">{accessory.quantity}</span>
                  </div>
                </div>
              </Col>

              <Col xs={4} >
                <Row>
                  <Col xs={6}>
                    <div className="color_black fontSize_3 bold">
                      <div className="textAlignRight"><span className="nil" /></div>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="color_black fontSize_3 bold">
                      <div className="textAlignRight">${(accessory.discounted || accessory.instantCreditApplied) ? accessory.price : accessory.originalPrice}</div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const {
      accessoryBundleData,
      accessoryData,
    } = this.props;

    return (
      <section className="accessory_list color_black">
        {accessoryData && accessoryData.length > 0 && <div>
          {this.renderSaveContent(accessoryData)}
        </div>}
        <div>
          {accessoryBundleData &&
            accessoryBundleData.map((accessory, id) => (
              <div
                key={`accessoryBundle-${id}`}
                className="accessory_list_item_details"
              >
                {id !== 0 &&
                  <hr className="margin20 noSideMargin" style={{ borderColor: '#CCC' }} />
                }
                <Row>
                  <Col xs={3} >
                    {accessory.imgUrl ?
                      <div className="textAlignLeft">
                        <img className="maxWidth100" src={accessory.imgUrl} alt={accessory.displayName} />
                      </div>
                      :
                      ''
                    }
                  </Col>

                  <Col xs={5} >
                    <div className="pad12 onlyBottomPad color_black">
                      <p className="bold fontSize_8">{accessory.displayName}</p>
                      <p className="pad5 noSidePad margin5 onlyTopMargin">
                        {accessory.savedPrice > 0 ?
                          <span>
                            <span className="textDecLineThrough">${accessory.regularPrice}</span>
                            <span className="bold">&nbsp;${accessory.discountedPrice}</span>
                          </span>
                          :
                          <span className="bold">${accessory.regularPrice}</span>
                        }
                      </p>
                      {accessory.discountPercentage > 0 &&
                        <p className="positionRelative margin5 onlyTopMargin">
                          <span className="font-icon_tag" />
                          <span className="margin30 onlyLeftMargin">Sale {accessory.discountPercentage}% off</span>
                        </p>
                      }
                    </div>
                  </Col>

                  <Col xs={4}>
                    <Row>
                      <Col xs={6}>
                        <div className="color_black fontSize_3 bold">
                          <div className="textAlignRight"><span className="nil" /></div>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="color_black fontSize_3 bold">
                          <div className="textAlignRight">${accessory.savedPrice > 0 ? accessory.discountedPrice : accessory.regularPrice}</div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            ))
          }
        </div>
      </section>
    );
  }
}


AccessoryListWrapper.propTypes = {
  cqContent: PropTypes.object,
  accessoryData: PropTypes.array,
  accessoryBundleData: PropTypes.array,
  accessoriesBundleExist: PropTypes.bool,
};
export default AccessoryListWrapper;
