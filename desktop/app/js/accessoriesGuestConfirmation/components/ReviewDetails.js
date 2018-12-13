import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';
import Printer from './../../../images/print.svg';

const printReceipt = () => {
  window.print();
};

const ReviewDetails = (props) => (
  <Col
    xs={12}
    style={{ paddingLeft: 0 }}
  >
    <Row className="margin24 onlyBottomMargin">
      <Col
        xs={8}
        style={{ paddingLeft: 0 }}
        className="fontSize_10 bold"
      >
        {props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_REVIEW}
      </Col>
      <Col xs={4}>
        <div onClick={printReceipt} analyticstrack="printReceipt-link" className="textDecUnderline bold textAlignRight cursorPointer">
          <img className="verticalCenter margin6 onlyRightMargin" height="20px" src={Printer} alt="Printer" />
          {props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_PRINT}
        </div>
      </Col>
    </Row>
    <Row className="margin36 onlyBottomMargin">
      <Col xs={8}>
        {
          props.accessoriesDetails.map((accessory, index) => (
            <Row key={`accessory-${index}`}>
              <Col xs={3} className="margin24 onlyBottomMargin">
                <img className="maxWidth100" src={accessory.imageUrl} alt={accessory.name} />
              </Col>
              <Col xs={8} className="margin12 onlyTopMargin lineheight18">
                <div className="bold fontSize_5">{accessory.name}</div>
                <div className="bold">{accessory.price}</div>
                {(accessory.color || accessory.size) &&
                  <p className="">
                    {accessory.size &&
                      <span>{accessory.size}</span>
                    }
                    {accessory.size && accessory.color &&
                      <span>, </span>
                    }
                    {accessory.color &&
                      <span>{accessory.color}</span>
                    }
                  </p>
                }
                <div>{props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_QUANTITY}:&nbsp;{accessory.quantity}</div>
                {accessory.promoMessage &&
                  <div className="salesTag">
                    <span className="bold margin6 onlyLeftMargin">{accessory.promoMessage}</span>
                  </div>
                }
              </Col>
            </Row>
          ))
        }
      </Col>
      <Col xs={4} style={{ lineHeight: 2, borderLeft: '1px solid #ccc' }}>
        <Row>
          <Col xs={8}>
            {props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_SUBTOTAL}
          </Col>
          <Col xs={4} className="textAlignRight">
            ${props.subTotal}
          </Col>
        </Row>
        {parseFloat(props.totalDiscount) > 0 &&
          <Row>
            <Col xs={8}>
              {props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_DISCOUNT}
            </Col>
            <Col xs={4} className="textAlignRight">
              -&nbsp;${props.totalDiscount}
            </Col>
          </Row>
        }
        {parseFloat(props.giftCardAmount) > 0 &&
          <Row>
            <Col xs={8}>
              {props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_GIFT_CARD}
            </Col>
            <Col
              xs={4}
              className="textAlignRight"
            >
              -{props.giftCardAmount}
            </Col>
          </Row>
        }
        <Row>
          <Col xs={8}>
            {props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_SHIPPING}
          </Col>
          <Col
            xs={4}
            className="textAlignRight"
          >
            {props.shippingPrice === 0 ?
              <span>{props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_FREE_SHIPPING}</span>
              :
              <div>${props.shippingPrice}</div>
            }
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            {props.shippingState}&nbsp;{props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_STATE_TAX}
          </Col>
          <Col
            xs={4}
            className="textAlignRight"
          >
            ${props.tax}
          </Col>
        </Row>
        <Row className="bold fontSize_6">
          <Col xs={8}>
            {props.cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_TOTAL}
          </Col>
          <Col
            xs={4}
            className="textAlignRight"
          >
            ${props.dueToday}
          </Col>
        </Row>
      </Col>
    </Row>
  </Col>
);

ReviewDetails.propTypes = {
  cqContent: PropTypes.object,
  accessoriesDetails: PropTypes.array,
  dueToday: PropTypes.string,
  tax: PropTypes.string,
  subTotal: PropTypes.string,
  shippingPrice: PropTypes.number,
  shippingState: PropTypes.string,
  giftCardAmount: PropTypes.string,
  totalDiscount: PropTypes.string,
};

export default ReviewDetails;
