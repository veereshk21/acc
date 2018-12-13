import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import BackButton from '../../common/BackButton/BackButton';
import Button from '../../common/Button/Button';


class EmailCartModal extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch() {
    // Display fallback UI
    this.setState({ hasError: true });
    // console.log('Error:', error, '\n Info:', info);
    // You can also log the error to an error reporting service
  }
  _onCancel(event) {
    event.preventDefault();
    this.props.onCancelClick();
  }
  _onEmailCart(event) {
    event.preventDefault();
    this.props.emailCart();
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong.</div>;
    }
    return (
      <div className="pad12 onlyTopPad">
        <div className="pad36">
          <h1 className="margin12 onlyTopMargin width80">{this.props.cqLabel.get('DT_OD_CART_EMAIL_ITEM_TITLE')}</h1>
          <div className="margin24 noSideMargin border_EB onlyBottomBorder pad20 onlyBottomPad">
            <div className="fontSize_5">{this.props.cqLabel.get('DT_OD_CART_EMAIL_READY_SENT')}</div>
            <div className="fontSize_5">{this.props.cqLabel.get('DT_OD_CART_EMAIL_COMPLETE')}</div>
          </div>
          <div>
            <Button
              type="button"
              onClick={this._onCancel.bind(this)}
              role="link"
              className="button secondary large margin24 onlyRightMargin"
              analyticstrack="cancel-send-email-cta"
            >Cancel
            </Button>
            <Button
              type="button"
              onClick={this._onEmailCart.bind(this)}
              role="button"
              className="button primary large margin6 onlySideMargin"
              analyticstrack="send-email-cta"
            >Send
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
EmailCartModal.propTypes = {
  cqLabel: PropTypes.object,
  // cqMessages: PropTypes.object,
  emailCart: PropTypes.func,
  onCancelClick: PropTypes.func,
};

export default EmailCartModal;
