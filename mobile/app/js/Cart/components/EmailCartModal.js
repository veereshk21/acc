import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackButton from '../../common/BackButton/BackButton';
import Button from '../../common/Button/Button';


class EmailCartModal extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log('Error:', error, '\n Info:', info);
    // You can also log the error to an error reporting service
  }
  _onCancel(event) {
    event.preventDefault();
    this.props.history.push('/'); // eslint-disable-line
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
        <BackButton to="/" >
          {this.props.cqLabel.get('OD_CART_BACK_CTA')}
        </BackButton>
        <div className="pad36">
          <h5 className="margin12 onlyTopMargin width80">{this.props.cqMessages.get('OD_CART_EMAIL_ITEM_TITLE')}</h5>
          <div className="margin24 noSideMargin border_EB onlyBottomBorder pad20 onlyBottomPad">
            <div className="color_959595 fontSize_3">
              <span>{this.props.cqMessages.get('OD_CART_EMAIL_READY_SENT')}</span>
              <span>{this.props.cqMessages.get('OD_CART_EMAIL_COMPLETE')}</span>
            </div>
          </div>
          <div className="textAlignCenter">
            <Button
              type="button"
              onClick={this._onCancel.bind(this)}
              role="link"
              className="button secondary large margin24 onlyRightMargin"
              analyticstrack="cancel-email-to-cart"
            >Cancel
            </Button>
            <Button
              type="button"
              role="button"
              className="button primary large margin6 onlySideMargin"
              onClick={this._onEmailCart.bind(this)}
              analyticstrack="submit-email-to-cart"
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
  cqMessages: PropTypes.object,
  emailCart: PropTypes.func,
};

export default EmailCartModal;
