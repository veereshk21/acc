import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push as Menu } from 'react-burger-menu';
import MenuItem from './menuItem';


class SlideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }
  componentDidMount() {
    const menuCloseElem = document.getElementsByClassName('bm-menu-wrap')[0];
    menuCloseElem.setAttribute('aria-hidden', true);
  }
  render() {
    const { hideNotification, navJSON } = this.props;
    const isMenuOpen = function (state) {
      const menuCloseElem = document.getElementsByClassName('bm-menu-wrap')[0];
      menuCloseElem.setAttribute('aria-hidden', !state.isOpen);
      menuCloseElem.setAttribute('aria-expanded', state.isOpen);
      const globalNotificationElem = document.getElementsByClassName('notification')[0];
      if (globalNotificationElem) {
        hideNotification();
      }
      return state.isOpen;
    };
    return (
      <div role="tablist" >
        <Menu pageWrapId="page-wrap" isOpen={this.state.isMenuOpen} onStateChange={isMenuOpen} >
          { (navJSON.espanol && navJSON.espanol.isShown) &&
          <a href={navJSON.espanol.url} className="menu-spanish color_FFF fontSize_5 positionAbsolute" role="tab"> {navJSON.espanol.text}</a>
          }
          {(navJSON.business && navJSON.residential && navJSON.showBusinessAndResidential) &&
          <div className="border_33 onlyBottomBorder pad12 lineHeight36 clearfix">
            <div className="span_6_of_12 floatLeft textAlignCenter">
              <a href={navJSON.business.url} className="color_FFF fontSize_4 displayInline border_FA onlyBottomBorder pad3 onlyBottomPad"> {navJSON.business.text}</a>
            </div>
            <div className="span_6_of_12 floatLeft textAlignCenter">
              <a href={navJSON.residential.url} className="color_FFF fontSize_4 displayInline border_FA onlyBottomBorder pad3 onlyBottomPad"> {navJSON.residential.text}</a>
            </div>
          </div>
          }

          {navJSON.menuItems.map((menuItem, index) => <MenuItem key={index} menuItem={menuItem} index={index} />)}

          <div className="positionAbsolute menu-footer height72 pad20 width100">
            {navJSON.signout.isShown &&
            <a href={navJSON.signout.url} className="button button_menu floatLeft">{navJSON.signout.text}</a>
            }
            {navJSON.feedback.isShown &&
            <a role="button" onClick={this.props.openFeedback.bind(this)} className="color_FFF floatRight displayInline border_FA onlyBottomBorder pad3 onlyBottomPad margin3 onlyTopMargin">{navJSON.feedback.text}</a>
            }
          </div>
        </Menu>
      </div>
    );
  }
}
SlideMenu.propTypes = {
  openFeedback: PropTypes.func,
  hideNotification: PropTypes.func,
  navJSON: PropTypes.object,
};
export default SlideMenu;
