
import React from 'react';
import PropTypes from 'prop-types';
import CountdownClock from '../../common/CountdownClock/CountdownClock';
import ChatAndC2C from '../../common/ChatAndC2C';
import Loader from '../../common/Loader/Loader';

export default class InvalidPreorderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disableCheckout: true,
    };
  }

  onBack = () => {
    window.location = this.props.cartDetailURL;
  }
  onCheckout = () => {
    this.props.initiateCheckout();
  }
  enableCheckout = () => {
    this.props.initiateCheckout();
    this.setState({
      disableCheckout: false,
    });
  }
  render() {
    const { cqContent, availableDate, deviceName } = this.props;
    const { disableCheckout } = this.state;

    return (
      <div className="section group grid vh70">
        {this.props.asyncCallStatus.isFetching === true && <Loader />}
        <ChatAndC2C />
        <div className="pad20 noSidePad">
          <div className="pad24">
            <h1
              className="margin6 onlyTopMargin pad20 onlyBottomPad"
              dangerouslySetInnerHTML={{ __html: (disableCheckout ? cqContent.html.DT_OD_PREORDER_BLOCK_CHECKOUT_DISABLED : cqContent.html.DT_OD_PREORDER_BLOCK_CHECKOUT_ENABLED).replace('$DEVICE_NAME$', deviceName) }}
            />
            {disableCheckout &&
              <CountdownClock
                givenDate={availableDate}
                cssClass="fontSize_2-8"
                styleName={{ fontSize: '3.4rem' }}
                onComplete={this.enableCheckout}
              />
            }
          </div>
        </div>
        <div className="pad10 margin20 onlyTopMargin">
          <button
            className="button secondary large margin10 onlySideMargin"
            onClick={this.onBack}
          >
            {cqContent.label.DT_OD_PREORDER_BLOCK_BACK}
          </button>
          <button
            className="button primary large margin10 onlySideMargin"
            disabled={disableCheckout}
            onClick={this.onCheckout}
          >
            {cqContent.label.DT_OD_PREORDER_BLOCK_CHECKOUT}
          </button>
        </div>
      </div>
    );
  }
}

InvalidPreorderComponent.propTypes = {
  cqContent: PropTypes.object,
  asyncCallStatus: PropTypes.object,
  availableDate: PropTypes.number,
  deviceName: PropTypes.string,
  cartDetailURL: PropTypes.string,
  initiateCheckout: PropTypes.func,
};
