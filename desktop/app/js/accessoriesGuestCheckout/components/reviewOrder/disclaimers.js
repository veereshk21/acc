import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import AsyncComponent from './../../../common/AsyncComponent/index';
import FreeShippingModal from './freeShippingModal';
import ReturnPolicyModal from './returnPolicyModal';

const Modal = AsyncComponent(() => import('./../../../common/Modal/index'));

class Disclaimers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFreeShippingModal: false,
      showReturnPolicyModal: false,
    };
  }

  openReturnPolicyModal = () => this.setState({ showReturnPolicyModal: true });
  closeReturnPolicyModal = () => this.setState({ showReturnPolicyModal: false });
  openFreeShippingModal = () => this.setState({ showFreeShippingModal: true });
  closeFreeShippingModal = () => this.setState({ showFreeShippingModal: false });

  render() {
    const { cqContent } = this.props;

    return (
      <div>
        <div className="disclaimerModals">
          <Modal
            mounted={this.state.showFreeShippingModal}
            closeFn={this.closeFreeShippingModal}
            showCloseX
            underlayColor="rgba(0,0,0,0.8)"
            style={{ maxWidth: 700 }}
          >
            <FreeShippingModal cqContent={cqContent} />
          </Modal>

          <Modal
            mounted={this.state.showReturnPolicyModal}
            closeFn={this.closeReturnPolicyModal}
            showCloseX
            underlayColor="rgba(0,0,0,0.8)"
            style={{ maxWidth: 700 }}
          >
            <ReturnPolicyModal cqContent={cqContent} />
          </Modal>
        </div>

        <div className="border_grayThree borderSize_2 onlyTopBorder margin36 onlyBottomMargin">
          <Row>
            <Col xs={6}>
              <div className="pad12 noSidePad">
                <button
                  className="fontSize_4 link background_transparent borderSize_0 bold noPad textAlignLeft"
                  onClick={this.openReturnPolicyModal}
                >
                  {cqContent.label.DT_OD_CHECKOUT_REVIEW_ORDER_EASY_RETURN_HEADER}
                </button>
              </div>
              <p className="fontSize_2">{cqContent.label.DT_OD_CHECKOUT_REVIEW_ORDER_EASY_RETURN_DESCRIPTION}</p>
            </Col>
            <Col xs={6} className="border_grayThree borderSize_2 onlyLeftBorder">
              <div className="pad12 noSidePad">
                <button
                  className="fontSize_4 link background_transparent borderSize_0 bold noPad textAlignLeft"
                  onClick={this.openFreeShippingModal}
                  analyticstrack="reviewOrder-freeShippingModal-CTA"

                >
                  {cqContent.label.DT_OD_CHECKOUT_REVIEW_ORDER_FREE_SHIPPING_HEADER}
                </button>
              </div>
              <p className="fontSize_2">{cqContent.label.DT_OD_CHECKOUT_REVIEW_ORDER_FREE_SHIPPING_DESCRIPTION}</p>

            </Col>
          </Row>
        </div>

        <div>
          <p className="legal margin18 onlyBottomMargin">{cqContent.label.DT_OD_CHECKOUT_REVIEW_ORDER_POBO_DISCLAIMER}</p>
          <p className="legal margin18 onlyBottomMargin">{cqContent.label.DT_OD_CHECKOUT_REVIEW_ORDER_TAX_DISCLAIMER}</p>
          <p className="legal margin18 onlyBottomMargin">{cqContent.label.DT_OD_CHECKOUT_REVIEW_ORDER_AVAILABILITY_DISCLAIMER}</p>
        </div>
      </div>
    );
  }
}
Disclaimers.propTypes = {
  cqContent: PropTypes.object,
  // editState: PropTypes.object,
};
export default Disclaimers;
