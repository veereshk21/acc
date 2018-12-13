import React from 'react';
import PropTypes from 'prop-types';
import AlertImage from '../../../images/Verizon_Alert_Icon.svg';
import CountdownClock from '../../common/CountdownClock/CountdownClock';
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
      <div>
        {this.props.asyncCallStatus.isFetching === true && <Loader />}

        <div className="vh70">
          <div className="pad24 textAlignCenter">
            <div className="margin48 onlyTopMargin">
              <img
                className="svg-icon_alert"
                src={`${AlertImage}`}
                aria-hidden="true"
                alt="warning"
              />
            </div>
            <h2
              className="fontSize_6 margin20 noSideMargin"
              dangerouslySetInnerHTML={{ __html: (disableCheckout ? cqContent.html.OD_PREORDER_BLOCK_CHECKOUT_DISABLED : cqContent.html.OD_PREORDER_BLOCK_CHECKOUT_ENABLED).replace('$DEVICE_NAME$', deviceName) }}
            />
            {disableCheckout &&
              <CountdownClock
                givenDate={availableDate}
                cssClass="fontSize_2-8"
                styleName={{ fontSize: '2.4rem' }}
                onComplete={this.enableCheckout}
              />
            }

          </div>
        </div>
        <div className="textAlignCenter">
          <button
            className="button secondary large margin10 onlySideMargin"
            onClick={this.onBack}
          >
            {cqContent.label.OD_PREORDER_BLOCK_BACK}
          </button>
          <button
            className="button primary large margin10 onlySideMargin"
            disabled={disableCheckout}
            onClick={this.onCheckout}
          >
            {cqContent.label.OD_PREORDER_BLOCK_CHECKOUT}
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
