
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Img from '../../common/Img/Img';
import Title from '../../common/Title/Title';
import A from '../../common/A/A';
import Loader from '../../common/Loader/Loader';

class AccountDeposit extends Component {
  constructor(props) {
    super(props);
    this._onCheckout = this._onCheckout.bind(this);
  }

  _onCheckout(event) {
    event.preventDefault();
    this.props.initiateCheckout();
  }
  render() {
    const { deposit, cqContent, isFetching } = this.props;
    return (
      <div className="pad20">
        {isFetching === true && <Loader />}
        <div className=" textAlignCenter width100 pad102 noSidePad">
          <Img src={deposit.imageURL} alt="" className="pad20 onlyBottomPad" />
          <Title className="fontSize_6 textAlignCenter " dangerouslySetInnerHTML={{ __html: deposit.title }} />
          <p className="textAlignCenter fontSize_2 margin18 onlyTopMargin">{deposit.titleDescription}</p>
        </div>
        <footer className="textAlignCenter footerContent width100">
          <A onClick={this._onCheckout} className="primary button large bold" analyticstrack="initiateCheckout">{cqContent.label.OD_SECURITY_DEPOSIT_BUTTON_TEXT}</A>
        </footer>
      </div>
    );
  }
}

AccountDeposit.propTypes = {
  deposit: PropTypes.object,
  isFetching: PropTypes.bool,
  initiateCheckout: PropTypes.func,
  cqContent: PropTypes.object,
};
export default AccountDeposit;
