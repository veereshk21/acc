/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Image from '../Img/Img';
import Menu from './menu';
import A from '../A/A';
import { hideNotification } from '../NotificationBar/actions';

class GlobalNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0,
    };
  }

  componentDidMount() {
    const menuElem = document.getElementsByClassName('bm-menu')[0];
    menuElem.setAttribute('aria-hidden', true);
    menuElem.setAttribute('aria-expanded', 'false');

    /* Updating cart count from cookie instead of from globalNav state */
    const _vzwCookie = document.cookie;
    const _cartCount = _vzwCookie.split('cartCount=')[1];
    /* Added charAt to fetch only the first character in case cartCount is not the last item
    * TODO :Caveat here,works only for single digit cart numbers */
    if (_cartCount) {
      this.setState({ cartCount: _cartCount.charAt(0) });
    }
  }

  render() {
    const { hideGlobalNotification, navJSON } = this.props;
    return (
      <header className="header background_00 col width100 noSidePad no-gutter">
        <div className="clearfix onlyTopMargin">
          <Menu navJSON={navJSON} openFeedback={this.props.openFeedback.bind(this)} hideNotification={hideGlobalNotification} />
          <div className="headerNav_wrapper">
            <div className="floatLeft pad6 ">
              <Image
                src="//ss7.vzw.com/is/image/VerizonWireless/VZ_Logo-white?$pngalpha$"
                alt="Verizon Wireless"
                style={{ maxWidth: 80 }}
              />
            </div>
            <div className="floatRight margin6 noRightMargin">
              {
                navJSON.icons.map((icon, index) => {
                  let element = '';
                  let cartCount = '';
                  let ariaLabel = icon.name;
                  const iconClass = `positionRelative font-icon_${icon.name}-v2`;

                  if (icon.additionalInfo !== null) {
                    for (const key of Object.keys(icon.additionalInfo)) { // eslint-disable-line
                      element = <span>{icon.additionalInfo[key]}</span>;
                    }
                  }
                  if (icon.name === 'cart' && parseInt(this.state.cartCount, 10) > 0) {
                    cartCount = <p className="cartCount" aria-hidden="true">{this.state.cartCount}</p>;
                    ariaLabel = `${icon.name} with ${this.state.cartCount} item`;
                  }
                  const elem = (icon.imageURL !== null) ?
                    <Image src={icon.imageURL} alt={icon.name} className="width18 height18" /> // eslint-disable-line
                    : <i className={iconClass}>{element}</i>; // eslint-disable-line

                  return (
                    <A
                      style={{ position: 'relative' }}
                      href={icon.url}
                      aria-label={ariaLabel}
                      className="displayInlineBlock"
                      key={index}
                      role="button"
                    >{cartCount}{elem}
                    </A>);
                })
              }
            </div>
          </div>
        </div>

      </header>
    );
  }
}

GlobalNav.propTypes = {
  openFeedback: PropTypes.func,
  hideGlobalNotification: PropTypes.func,
  navJSON: PropTypes.object,
};
export const mapDispatchToProps = (dispatch) => ({
  hideGlobalNotification: () => dispatch(hideNotification()),
});

export default connect(null, mapDispatchToProps)(GlobalNav);
