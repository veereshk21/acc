import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import AsyncComponent from '../../common/AsyncComponent';
import Devices from '../containers/devices';
import Loader from '../../common/Loader/Loader';
import PaymentMethod from '../containers/payment';
import Header from './header';

const ShippingMethod = AsyncComponent(() => import('../containers/shippingMethod'));
const ShippingAddress = AsyncComponent(() => import('../containers/shippingAddress'));
const OrderSummary = AsyncComponent(() => import('../containers/orderSummary'));


const HomePage = (props) => {
  const {
    isFetching, cqContent, standaloneAccessories, checkoutStates, ispuSelected,
  } = props;

  return (
    <div>
      {isFetching === true && <Loader />}
      <Header {...props} />
      <Row className="section clearfix" style={{ marginRight: 0, marginLeft: 0, marginTop: 24 }}>
        <Col xs={8} className="noPad mainContent checkout">
          <div className="pad24 onlySidePad">
            <h2 className="h1 fontSize32"> {cqContent.label.DT_OD_CHECKOUT_SUMMARY_TITLE} </h2>
          </div>

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
            {(checkoutStates.showShippingAddress || ispuSelected) &&
              <ShippingAddress />
            }
          </div >

          {props.showPaymentSection &&
            <PaymentMethod />
          }

          {/* <div className="pad24 noTopPad margin54 noSideMargin">
            <button className="secondary button large">Cancel order</button>
          </div> */}
        </Col>

        <Col xs={4} className="noPad sideBarContent">
          <OrderSummary />
        </Col>

      </Row>
    </div>
  );
};

HomePage.propTypes = {
  isFetching: PropTypes.bool,
  cqContent: PropTypes.object,
  standaloneAccessories: PropTypes.bool,
  showPaymentSection: PropTypes.bool,
  checkoutStates: PropTypes.object,
  ispuSelected: PropTypes.bool,
};

export default HomePage;
