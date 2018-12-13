import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: (props.menuItem.isSelected && props.menuItem.subItems),
    };
    this.toggleState = this.toggleState.bind(this);
  }
  toggleState(e) {
    e.preventDefault();
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  render() {
    const { menuItem, index } = this.props;
    if (!menuItem.isShown) { return null; }

    return (
      <div key={index} role="menuitem">
        <a className={`menu-item block border_33 onlyBottomBorder bold  color_FFF fontSize_5 lineHeight36 pad6 ${menuItem.isSelected ? 'selected' : ''}`} key={index} href={menuItem.url} role="tab">
          <span className={`onlyLeftPad ${menuItem.isSelected ? 'pad24' : 'pad30'}`}> {menuItem.name}</span>
          {menuItem.subItems &&
            <span className={`floatRight margin24 pad6 fontSize_6 onlyRightMargin ${this.state.expanded ? 'font-icon_arrowUp' : 'font-icon_arrowDown'}`} role="tree" aria-label={menuItem.name} onClick={this.toggleState} />
          }
        </a>
        {(menuItem.subItems && this.state.expanded) &&
          <div className="bm-submenu pad48 onlyLeftPad">
            {
              menuItem.subItems.map((subMenuItem, idx) => {
                if (!subMenuItem.isShown) { return null; }
                return (
                  <a className="block border_33 onlyBottomBorder color_FFF fontSize_5 lineHeight36 pad6 clearfix" key={idx} href={subMenuItem.url} role="tab">
                    <img src={`${subMenuItem.iconURL}`} alt={subMenuItem.name} className="submenu-icon media_graphic" />
                    <span className="media pad6 onlyLeftPad color_FFF">{subMenuItem.name}</span>
                  </a>
                );
              })
            }
          </div>
        }
      </div>

    );
  }
}

MenuItem.propTypes = {
  menuItem: PropTypes.object,
  index: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default MenuItem;
