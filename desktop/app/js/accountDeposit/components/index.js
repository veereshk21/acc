import PropTypes from 'prop-types';
import React from 'react';

const HomePage = (props) => {
  const { cqContent } = props;

  return (
    <div className="border_e6 noTopBorder">
      <div className="border_e6 onlyBottomBorder pad12">
        <a href={props.cartRedirectUrl} analyticstrack="account-deposit-back-link" className="secondaryCTA m-back color_000 bold fontSize_5 pad12 noSidePad">{cqContent.label.DT_OD_ACCOUNT_DEPOSIT_BACK_BUTTON}</a>
      </div>
      <div className="pad24">
        <h1 className="margin20 noSideMargin">{cqContent.label.DT_OD_ACCOUNT_DEPOSIT_TITLE}</h1>
        <div className="margin20 noSideMargin" >
          <p dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_ACCOUNT_DEPOSIT_SUBTITLE }} />
          <p className="bold margin6 onlyTopMargin">{props.depositPrice}</p>
        </div>
        <div className="margin48 noSideMargin">
          <button
            className="button primary"
            onClick={() => props.initiateCheckout(props.checkoutRedirectUrl)}
            analyticstrack="confirm-account-deposit-cta"
          >
            {cqContent.label.DT_OD_ACCOUNT_DEPOSIT_CONFIRM_BUTTON}
          </button>
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  cqContent: PropTypes.object,
  depositPrice: PropTypes.string,
  cartRedirectUrl: PropTypes.string,
  checkoutRedirectUrl: PropTypes.string,
  initiateCheckout: PropTypes.func,
};

export default HomePage;
