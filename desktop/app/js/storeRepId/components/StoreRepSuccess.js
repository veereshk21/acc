import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';

const StoreRepSuccess = (props) => {
  const { cqContent, userInfo } = props;
  return (
    <div className="pad12 onlyTopPad">
      <div className="pad24">
        <div className="">
          <div>
            <h3>{cqContent.label.OD_STORE_REP_ID_SUCCESS_MSG_WELCOME_TEXT}&nbsp;<span className="textTransUppercase fontDisplayBold">{userInfo.salesRepGivenName}</span></h3>
            <p className="fontSize_4">{cqContent.label.OD_STORE_REP_ID_SUCCESS_MSG_CLICK_TO_CONTINUE_TEXT}</p>
          </div>
        </div>
        <div className="footerFixed textAlignCenter background_supporting">
          <Button
            onClick={() => {
              window.location.href = userInfo.redirectURL;
            }}
            className="button primary large"
          > {
              cqContent.label.OD_STORE_REP_ID_CONTINUE_BUTTON_TEXT}
          </Button>
        </div>
      </div>
    </div>
  );
};

StoreRepSuccess.propTypes = {
  userInfo: PropTypes.object,
  cqContent: PropTypes.object,
};

export default StoreRepSuccess;
