import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import Modal from '../../common/Modal/index';
import StandAloneAccessory from './StandAloneAccessory';
import AccessoriesBundle from './AccessoriesBundle';

class StandAloneAccessoriesWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      deviceType: 'standAlone',
      paramsData: {},
    };
    this.removeStandAloneAccessory = this.removeStandAloneAccessory.bind(this);
    this.removeAccessoryBundle = this.removeAccessoryBundle.bind(this);
  }

  removeStandAloneAccessory(params) {
    if (this.props.showHeadsUpMsg) {
      this.setState({ showModal: true, paramsData: params, deviceType: 'standAlone' });
    } else {
      this.props.removeStandAloneAccessory(params);
    }
  }
  removeAccessoryBundle(params) {
    if (this.props.showHeadsUpMsg) {
      this.setState({ showModal: true, paramsData: params, deviceType: 'bundle' });
    } else {
      this.props.removeAccessoryBundle(params);
    }
  }
  moveNext() {
    this.setState({ showModal: false });
    if (this.state.deviceType === 'standAlone') {
      this.props.removeStandAloneAccessory(this.state.paramsData);
    } else if (this.state.deviceType === 'bundle') {
      this.props.removeAccessoryBundle(this.state.paramsData);
    }
  }
  render() {
    const { accessories, accessoriesBundle, cqContent, discountPercentage, instantCreditEligible, showHeadsUpMsg, asyncFetch } = this.props;
    return (<div className="fontSize_4">
      <Modal
        mounted={this.state.showModal}
        style={{ background: 'white', width: '40%' }}
        closeFn={() => { this.setState({ showModal: false }); }}
        showCloseX
      >
        <section>
          <div className="height200 border_black borderSize_2 onlyBottomBorder margin15 onlyBottomMargin">
            <h2 className="fontSize_7 width70" dangerouslySetInnerHTML={{ __html: cqContent.label.OD_CART_INSTANT_CREDIT_MODAL_TITLE }} />
          </div>
          <div className="height200">
            <p className="fontSize_4 lineHeight18">
              {cqContent.label.OD_CART_INSTANT_CREDIT_REMOVE_TRADE_IN_DISCLAIMER}
            </p>
          </div>
          <Row>
            <Col xs={6}>
              <button
                className="primary bold button pad10 onlyRightPad width100 floatLeft"
                analyticstrack="goto-unlimitedPlan-CTA"
                onClick={this.moveNext.bind(this)}
              >{cqContent.label.OD_CART_INSTANT_CREDIT_GOT_IT}
              </button>
            </Col>
            <Col xs={6}>
              <button
                className="secondary bold button pad5 onlyLeftPad width100 floatRight"
                analyticstrack="goto-currentPlan-CTA"
                onClick={() => { this.setState({ showModal: false }); }}
              >{cqContent.label.OD_CART_INSTANT_CREDIT_GO_BACK}
              </button>
            </Col>
          </Row>
        </section>
      </Modal>

      {accessories && accessories.map((accessory, id) => (
        <StandAloneAccessory
          onRemove={this.removeStandAloneAccessory}
          cqContent={cqContent}
          instantCreditEligible={instantCreditEligible}
          asyncFetch={asyncFetch}
          showHeadsUpMsg={showHeadsUpMsg}
          key={id}
          {...accessory}
        />))}
      {accessoriesBundle && accessoriesBundle.map((accessoryBundle, id) => (
        <div className="pad20 noSidePad fontSize_4"><AccessoriesBundle
          childAccessory={false}
          onRemove={this.removeAccessoryBundle}
          showHeadsUpMsg={showHeadsUpMsg}
          instantCreditEligible={instantCreditEligible}
          cqContent={cqContent}
          key={id}
          {...accessoryBundle}
        >
          <div className="margin20 onlyTopMargin">
            {accessoryBundle.accessoriesDetails && accessoryBundle.accessoriesDetails.map((accessoriesDetails) => (
              <AccessoriesBundle
                showRemoveCTA={false}
                imgUrl={accessoriesDetails.skuDetails[0].imageUrl}
                displayName={accessoriesDetails.skuDetails[0].name}
                discountedPrice={accessoriesDetails.skuDetails[0].discountedPrice}
                regularPrice={accessoriesDetails.skuDetails[0].price}
                cqContent={cqContent}
                discountPercentage={discountPercentage}
              />))
            }
            {accessoryBundle.bundleBreakdown && accessoryBundle.bundleBreakdown.map((accessoriesDetails) => (
              <AccessoriesBundle
                showRemoveCTA={false}
                imgUrl={accessoriesDetails.skuDetails[0].imageUrl}
                displayName={accessoriesDetails.skuDetails[0].name}
                discountedPrice={accessoriesDetails.skuDetails[0].discountedPrice}
                regularPrice={accessoriesDetails.skuDetails[0].price}
                cqContent={cqContent}
                discountPercentage={discountPercentage}
              />))
            }
          </div>
        </AccessoriesBundle></div>))}
    </div>);
  }
}

StandAloneAccessoriesWrapper.propTypes = {
  accessories: PropTypes.array,
  cqContent: PropTypes.object,
  removeStandAloneAccessory: PropTypes.func,
  removeAccessoryBundle: PropTypes.func,
  accessoriesBundle: PropTypes.oneOfType([PropTypes.object, null]),
  discountPercentage: PropTypes.string,
  instantCreditEligible: PropTypes.bool,
  showHeadsUpMsg: PropTypes.bool,
  asyncFetch: PropTypes.func,
};
export default StandAloneAccessoriesWrapper;
