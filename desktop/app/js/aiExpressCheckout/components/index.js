import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AsyncComponent from '../../common/AsyncComponent';
import Devices from '../containers/devices';
import Loader from '../../common/Loader/Loader';
import Payment from './payment';
import FAQ from './faq';
import ChatAndC2C from '../../common/ChatAndC2C';

const ShippingMethod = AsyncComponent(() => import('../containers/shippingMethod'));
const ShippingAddress = AsyncComponent(() => import('../containers/shippingAddress'));
const ServiceAddress = AsyncComponent(() => import('../containers/serviceAddress'));
const OrderSummary = AsyncComponent(() => import('../containers/orderSummary'));

class HomePage extends Component {
  componentDidMount() {
    const paymentSectionElement = window.document.getElementById('paymentSection');
    const shippingAddressSectionElement = window.document.getElementById('shippingAddressSection');
    const shippingMethodElement = window.document.getElementById('shippingMethodSection');
    const scrollProps = { block: 'start', inline: 'nearest', behavior: 'smooth' };

    if (paymentSectionElement && this.props.paymentRequired) {
      this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_PAYMENT_SECTION_ERROR);
      paymentSectionElement.scrollIntoView(scrollProps);
    }
    if (paymentSectionElement && this.props.masterpassError) {
      // Masterpass Error Notification, ex: preauth errors
      this.props.showMasterpassError();
    }
    if (shippingAddressSectionElement && (this.props.shippingAddressRequired || this.props.shippingAddressChangeRequired || this.props.checkoutStates.poBoxShippingAddress || this.props.checkoutStates.shippingAddressValidationError)) {
      shippingAddressSectionElement.scrollIntoView(scrollProps);
    }
    if (shippingMethodElement && this.props.flipIspuToShipping) {
      this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_ISPU_NOTAVAILABLE_ORDER_HEAD_ERROR);
      shippingMethodElement.scrollIntoView(scrollProps);
    }
  }

  render() {
    const {
      isFetching, cqContent, standaloneAccessories, checkoutStates, shippingAddressCompleted, serviceAddressCompleted, ispuSelected,
    } = this.props;

    return (
      <div>
        {isFetching === true && <Loader />}
        <Row>
          <Col xs>
            <h1 className="pad24 noBottomPad">My upgrade</h1>
          </Col>
          <Col xs>
            <ChatAndC2C />
          </Col>
        </Row>
        <Row className="section clearfix" style={{ marginRight: 0, marginLeft: 0 }}>
          <Col xs={8} className="noPad mainContent checkout">
            {!standaloneAccessories &&
              <Devices />
            }

            <div id="OrderDetails" className="pad24 noBottomPad">
              <h2 className="normal fontSize_4">Order details</h2>
              <hr className="onlyBottomMargin border_black noBottomBorder" />

              {checkoutStates.showDeliveryMethod &&
                <div>
                  {/* Shipping Methods */}
                  < ShippingMethod />
                  <hr />
                </div>
              }

              <Row>
                {checkoutStates.showShippingAddress &&
                  <Col xs={!shippingAddressCompleted || (ispuSelected && checkoutStates.contactInfoRequired) ? 12 : 4}>
                    <ShippingAddress />
                  </Col>
                }

                {(!shippingAddressCompleted || !serviceAddressCompleted || (ispuSelected && checkoutStates.contactInfoRequired)) &&
                  <Col xs={12} > <hr /> </Col>
                }

                <Col xs={serviceAddressCompleted ? 4 : 12} >
                  <ServiceAddress />
                </Col>
              </Row>

            </div >

            {this.props.showPaymentSection &&
              <Payment {...this.props} />
            }
            <FAQ cqContent={cqContent} />
          </Col>

          <Col xs={4} className="noPad sideBarContent">
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
  standaloneAccessories: PropTypes.bool,
  paymentRequired: PropTypes.bool,
  shippingAddressRequired: PropTypes.bool,
  shippingAddressChangeRequired: PropTypes.bool,
  showErrorNotification: PropTypes.func,
  showPaymentSection: PropTypes.bool,
  masterpassError: PropTypes.bool,
  showMasterpassError: PropTypes.func,
  flipIspuToShipping: PropTypes.bool,
  checkoutStates: PropTypes.object,
  serviceAddressCompleted: PropTypes.bool,
  shippingAddressCompleted: PropTypes.bool,
  ispuSelected: PropTypes.bool,
};

export default HomePage;
