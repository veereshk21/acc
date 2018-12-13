import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import ColorRadio from '../../../common/ColorRadio/index';
import BlockRadio from '../../../common/BlockRadio/index';
import { INVENTORY_STATUS } from '../../constants';
// const validate = (values, props) => {
//   const errors = {};
//   return errors;
// };

class DeviceConfig extends Component {
  constructor(props) {
    super(props);
    this.initSelectedSku = props.device.productDetails.skuColors[props.device.color].skus.find((sku) => sku.capacity === props.device.size);
    console.log('initSelectedSku', this.initSelectedSku);
    console.log('device', props.device);
    this.initContract = this.initSelectedSku && this.initSelectedSku.devicePrice && this.initSelectedSku.devicePrice.find((item) => item.contractTerm.toString() === props.device.contractTerm);
    console.log('initContract', this.initContract);

    this.state = {
      contractTerm: this.initContract ? this.initContract.contractTerm : 0,
      edgeContractText: (this.initContract && this.initContract.contractTerm.toString() === props.device.contractTerm) ? this.initContract.edgeContractText : null,
      skuItem: this.initSelectedSku,
    };

    // Set Colors
    this.colors = [];
    for (const color in props.device.productDetails.skuColors) {
      this.colors.push({
        name: color,
        code: props.device.productDetails.skuColors[color].skus[0].colorCode,
        allSkusBackOrder: props.device.productDetails.skuColors[color].allSkusBackOrder,
        allSkusOutOfStock: props.device.productDetails.skuColors[color].allSkusOutOfStock,
        allSkusPreOrder: props.device.productDetails.skuColors[color].allSkusPreOrder,
        anySkusInStock: props.device.productDetails.skuColors[color].anySkusInStock,
      });
    }
  }

  componentWillReceiveProps(newProps) {
    const { asyncCallStatus, index } = newProps;
    if (!this.props.asyncCallStatus.data.updateDeviceSkuFailed && asyncCallStatus.data.updateDeviceSkuFailed && index === asyncCallStatus.data.index) {
      this.resetOptions();
      this.props.invalidateAsyncFetch();
    }
  }
  // Check if sku is available
  availabilityCheck = () => (true)

  submitDeviceUpdate = (obj) => {
    const { skuItem, contractTerm } = obj;
    const { device, updateDeviceSku, index } = this.props;
    updateDeviceSku({
      deviceId: device.productDetails.deviceId,
      skuId: skuItem.deviceSkuId,
      deviceSorId: skuItem.deviceSorId,
      contractTerm,
      commerceItemId: device.commerceItemId,
    }, index);
  }
  handleColorChange = (color) => {
    const newSku = this.props.device.productDetails.skuColors[color].skus.find((sku) => sku.capacity === this.state.skuItem.capacity);
    this.handleSkuChange(newSku);
  }
  handleSkuChange = (sku) => {
    if (sku.deviceSkuId !== this.state.skuItem.deviceSkuId) {
      this.setState({ skuItem: sku });
      const obj = {};
      obj.skuItem = sku;
      obj.contractTerm = this.state.contractTerm;
      this.submitDeviceUpdate(obj);
    }
  }
  handlePriceChange = (item) => {
    if (item.contractTerm !== this.state.contractTerm) {
      this.setState({ contractTerm: item.contractTerm, edgeContractText: item.edgeContractText || null });
      const obj = {};
      obj.skuItem = this.state.skuItem;
      obj.contractTerm = item.contractTerm;
      this.submitDeviceUpdate(obj);
    }
  }
  resetOptions = () => {
    const { device, change, index } = this.props;
    const skuItem = device.productDetails.skuColors[device.color].skus.find((sku) => sku.capacity === device.size);
    this.setState({
      contractTerm: parseInt(device.contractTerm, 10),
      skuItem,
    });
    change(`device_${index}_color`, skuItem.colorName);
    change(`device_${index}_capacity`, skuItem.capacity);
    change(`device_${index}_contract`, device.contractTerm.toString());
  }

  render() {
    const { device, index } = this.props;
    const { skus } = device.productDetails.skuColors[this.state.skuItem.colorName];
    const { skuItem } = this.state;
    const retailPricePromoMessage = '$XXX Upgrade offer applies to purchases on monthly device payment plans only';

    return (
      <div>
        {device.mtn &&
          <div>
            <h3 className="fontSize_5">
              ({device.mtn.substring(0, 3)}) {device.mtn.substring(3, 6)}-{device.mtn.substring(6, 10)}
            </h3>
          </div>
        }
        <Row className="pad20 noSidePad">
          <Col xs={4} lg={3}>
            <div className="border_grayThree textAlignCenter">
              <img className="pad20" style={{ maxWidth: '100%' }} src={skuItem.imageUrl} alt={device.manufactureName + ' ' + device.deviceName} />
            </div>
          </Col>
          <Col xs={8} lg={9}>
            <div>
              <hr className="noTopMargin" />

              <Row className="pad12 onlyBottomPad">
                <Col xs={5}>
                  <p className="bold fontSize_5"><span dangerouslySetInnerHTML={{ __html: device.manufactureName }} /> <span dangerouslySetInnerHTML={{ __html: device.deviceName }} /></p>
                  <p>{skuItem.colorName}{skuItem.colorName && skuItem.capacity ? ',' : ''} {skuItem.capacity}</p>
                </Col>
                <Col xs={7}>
                  <Row style={{ margin: '0 -18px' }}>
                    {this.colors.map((color) => (
                      <Col key={`device_${index}_color_${color.name}`}>
                        <ColorRadio
                          name={`device_${index}_color`}
                          id={`device_${index}_color_${color.name}`}
                          value={color.name}
                          colorCode={color.code}
                          onClick={() => this.handleColorChange(color.name)}
                          disabled={color.allSkusOutOfStock}
                        >
                          <p
                            className="margin6 onlyTopMargin fontSize_2 textAlignCenter"
                            style={{ maxWidth: 60 }}
                          >
                            <span>{color.name}</span>
                            {color.allSkusOutOfStock &&
                              <span> - Out of Stock</span>
                            }
                          </p>
                        </ColorRadio>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
              <hr />

              <Row middle="xs">
                <Col xs={5}>
                  <p className="bold fontSize_5">Storage</p>
                </Col>
                <Col xs={7}>
                  <Row>
                    {skus.map((item) => (
                      <Col key={`${item.deviceSkuId}-capacity`} xs={4} className="displayInlineBlock">
                        <BlockRadio
                          id={`device_${index}_capacity_${item.capacity}`}
                          name={`device_${index}_capacity`}
                          className="storage"
                          onClick={() => this.handleSkuChange(item)}
                          value={item.capacity}
                          disabled={item.inventoryStatus === INVENTORY_STATUS.OUT_OF_STOCK}
                        >
                          <p className="fontSize_3">{item.capacity}</p>
                        </BlockRadio>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
              <hr />

              <Row middle="xs">
                <Col xs={5}>
                  <p className="bold fontSize_5">Payment options</p>
                </Col>
                <Col xs={7}>
                  <Row>
                    {this.state.skuItem.devicePrice.map((item, priceIndex) => (
                      <Col key={`${item.deviceSkuId}-price-${priceIndex}`} xs={6} className="displayInlineBlock">
                        <BlockRadio
                          id={`device_${index}_contract_${item.contractTerm}`}
                          name={`device_${index}_contract`}
                          className="price"
                          onClick={() => this.handlePriceChange(item)}
                          value={item.contractTerm.toString()}
                        >
                          {item.contractTerm === 99 &&
                            <div>
                              <p className="bold fontSize_5">${item.listPrice}/mo</p>
                              <p className="fontSize_1">24 Monthly device payments</p>
                            </div>
                          }
                          {item.contractTerm === 0 &&
                            <div>
                              <p>${item.listPrice}</p>
                              <p className="fontSize_1">Device retail price</p>
                            </div>
                          }
                        </BlockRadio>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xsOffset={5} xs={7}>
                  <p className="legal margin12 noSideMargin">{this.state.contractTerm === 99 ? this.state.edgeContractText : retailPricePromoMessage}</p>
                </Col>
              </Row>
            </div >
          </Col>
        </Row>
      </div>
    );
  }
}
DeviceConfig.propTypes = {
  // cqContent: PropTypes.object,
  device: PropTypes.object,
  index: PropTypes.number,
  // valid: PropTypes.bool,
  updateDeviceSku: PropTypes.func,
  asyncCallStatus: PropTypes.object,
  change: PropTypes.func,
  invalidateAsyncFetch: PropTypes.func,
  // deviceDetails: PropTypes.object,
};
export default reduxForm({})(connect((state) => ({ forms: state.get('form').toJS() }))(DeviceConfig));
