import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import Title from './title';
// import OrderInfo from '../../containers/orderInfo';
import AsyncComponent from '../../../common/AsyncComponent';

const OrderInfo = AsyncComponent(() => import('../../containers/header/orderInfo'));

const printReceipt = (e) => {
  e.preventDefault();
  window.print();
};

const Header = (props) => {
  const { cqContent, estimatedDelivery, userNote, confirmationEmail, tradeInStatus, ispuSelected } = props;
  return (
    <Row className="pageBanner color_000 pad20 noBottomPad margin36 onlyBottomMargin">
      <Col md={12} lg={12} className="pageBanner_leftPane textAlignLeft">
        <div className="pageBanner_leftPane_titleInfo margin30 onlyBottomMargin">
          <Title {...props} printReceipt={printReceipt} />

          {estimatedDelivery && !ispuSelected &&
            <p className="fontSize_3 fontTextBold">
              {estimatedDelivery}
            </p>
          }
        </div>

        {tradeInStatus ?
          <div className="pageBanner_leftPane_orderInfo margin60 onlyBottomMargin">
            <OrderInfo />
            <div
              className="fontSize_3  pad10 onlyTopPad color_666"
              dangerouslySetInnerHTML={{ __html: `${cqContent.label.DT_OD_CONFIRMATION_MESSAGE} ${userNote}` }}
            />
            <div>
              <div
                className="fontSize_3  pad10 onlyTopPad color_666"
                dangerouslySetInnerHTML={{ __html: `${cqContent.label.DT_OD_CONFIRMATION_MESSAGE} ${confirmationEmail}` }}
              />
            </div>
          </div>
          :
          <div className="pageBanner_leftPane_orderInfo">
            <div>
              <OrderInfo /><br />
              <p>You will receive a confirmation email at <span className="bold">{confirmationEmail}</span></p>
            </div>
          </div>
        }
        {/* <hr />
        <section className="pageBanner_leftPane_fiosInfo margin30 onlyBottomMargin">
          <p className="fontSize_3" dangerouslySetInnerHTML={{ __html: `${cqContent.label.DT_OD_CONFIRMATION_FIOS_ELIGIBLE_TEXT}` }} />
          <p className="fontSize_3" dangerouslySetInnerHTML={{ __html: `${cqContent.html.DT_OD_CONFIRMATION_FIOS_SIGNUP_HTML}` }} />
          <p className="fontSize_3 pad18 onlyTopPad" dangerouslySetInnerHTML={{ __html: `${cqContent.html.DT_OD_CONFIRMATION_FIOS_SIGNIN_HTML}` }} />
        </section> */}
      </Col>
    </Row>
  );
};

Header.propTypes = {
  cqContent: PropTypes.object,
  // devices: PropTypes.object,
  // accessories: PropTypes.array,
  // billingInfo: PropTypes.object,
  estimatedDelivery: PropTypes.string,
  tradeInStatus: PropTypes.bool.isRequired,
  confirmationEmail: PropTypes.string,
  userNote: PropTypes.string,
  ispuSelected: PropTypes.bool,

};
export default Header;
