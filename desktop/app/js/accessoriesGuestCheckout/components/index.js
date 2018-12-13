import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Loader from '../../common/Loader/Loader';
import ShippingAddressSection from './shippingAddress/shippingAddressSection';
import ShippingMethodSection from './shippingMethod/shippingMethodSection';
import BillingAddressSection from './billingAddress/billingAddressSection';
import PaymentSection from './payment/paymentSection';
import ReviewOrderSection from './reviewOrder/reviewOrderSection';
import AsyncComponent from '../../common/AsyncComponent';

const Header = AsyncComponent(() => import('./header/header'));
const OrderSummary = AsyncComponent(() => import('../containers/orderSummary/orderSummary'));

class HomePage extends Component {
  componentDidMount() {
    const paymentSectionElement = window.document.getElementById('paymentSection');
    // Masterpass Error Notification, ex: preauth errors
    if (paymentSectionElement && this.props.masterpassError) {
      this.props.showMasterpassError();
    }
  }

  render() {
    const {
      isFetching, cqContent, cartDetailURL, editState, stepsCompleted,
    } = this.props;

    return (
      <div>
        {isFetching === true && <Loader />}
        {/* <div className="border_grayThree height60 width100 onlyBottomBorder" /> */}
        <div className="border_e6 onlyBottomBorder pad24 noSidePad">
          <div className="margin6 onlyLeftMargin clearfix textAlignLeft width50 displayInlineBlock">
            <a href={cartDetailURL} analyticstrack="backToCart-link" className="secondaryCTA m-back color_000 bold fontSize_6 pad12 noSidePad">{cqContent.label.DT_OD_CHECKOUT_BACK_TO_CART}</a>
          </div>
          <div className="textAlignRight width40 displayInlineBlock">
            <div id="inqC2CImgContainer_Fixed1" className="displayInlineBlock" />
            <div id="c2c_container_desktop" className="displayInlineBlock" />
          </div>
        </div>
        <Row className="section clearfix" style={{ marginRight: 0, marginLeft: 0 }}>
          <Col xs={6} className="noPad mainContent">

            <Header
              cqContent={cqContent}
              oneClickCheckout={this.props.oneClickCheckout}
              bannerContent={this.props.bannerContent}
            />

            <ShippingAddressSection
              cqContent={cqContent}
              editState={editState}
            />

            <ShippingMethodSection
              cqContent={cqContent}
              editState={editState}
              stepsCompleted={stepsCompleted}
            />
            <BillingAddressSection
              cqContent={cqContent}
              editState={editState}
              stepsCompleted={stepsCompleted}
            />
            <PaymentSection
              cqContent={cqContent}
              editState={editState}
              stepsCompleted={stepsCompleted}
            />

            <ReviewOrderSection
              cqContent={cqContent}
              stepsCompleted={stepsCompleted}
            />

          </Col>
          <Col xs={6} className="noPad sideBarContent">
            <OrderSummary />
          </Col>
        </Row>
      </div>
    );
  }
}

HomePage.propTypes = {
  isFetching: PropTypes.bool,
  cqContent: PropTypes.object,
  oneClickCheckout: PropTypes.bool,
  cartDetailURL: PropTypes.string,
  masterpassError: PropTypes.bool,
  showMasterpassError: PropTypes.func,
  editState: PropTypes.object,
  stepsCompleted: PropTypes.object,
  bannerContent: PropTypes.object,
};

export default HomePage;
