import React from 'react';
import PropTypes from 'prop-types';
import Title from './title';
// import OrderInfo from '../../containers/orderInfo';
import AsyncComponent from '../../../common/AsyncComponent';

const OrderInfo = AsyncComponent(() => import('../../containers/header/orderInfo'));

const printReceipt = (e) => {
  e.preventDefault();
  window.print();
};

const Header = (props) => {
  const { cqContent, estimatedDelivery, userNote, confirmationEmail, tradeInStatus } = props;
  return (
    <div className="pad20 noSidePad">
      <Title {...props} />

      {estimatedDelivery &&
        <p className="fontSize_3 fontTextBold">
          {estimatedDelivery}
        </p>
      }

      {tradeInStatus ?
        <div className="pad10 onlyTopPad">
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
        <div>
          <div className="pad10 onlyTopPad">
            <p className="margin15 onlyTopMargin">You will receive a confirmation email at <span className="bold">{confirmationEmail}</span></p>
            <OrderInfo />
          </div>
        </div>
      }

      <a
        href="d"
        onClick={printReceipt}
        className="font-icon_print textDecUnderline inlineBlock margin15 onlyTopMargin"
      >
        <span
          className="margin15 onlyLeftMargin confirmation_print"
          dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_PRINT }}
        />
      </a>
    </div>

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

};
export default Header;
