import React from 'react';
import classnames from 'classnames';
import '../../../css/modules/toolTip.css';

class ToolTip extends React.Component {
  constructor() {
    super();
    this.state = { active: false };
    this.onEscape = this.onEscape.bind(this);
    this.toggleFn = this.toggleFn.bind(this);
    this.closeFn = this.closeFn.bind(this);
  }

  onEscape(key) {
    if (key.keyCode === 27) {
      this.closeFn();
    }
  }

  getOffset(elem) {
    let offset = null;
    let element = elem;
    if (element) {
      offset = { left: 0, top: 0 };
      do {
        offset.top += element.offsetTop;
        offset.left += element.offsetLeft;
        element = element.offsetParent;
      } while (element);
    }
    return offset;
  }

  toggleFn(e) {
    e.preventDefault();

    this.setState({
      active: !this.state.active,
    });
  }

  closeFn() {
    this.setState({
      active: false,
    });
  }

  render() {
    const { className, header, click, children, direction } = this.props;
    const { active } = this.state;

    const actionClass = click ? 'click' : 'hover';
    const activeClass = active ? 'active' : '';

    const innerWidth = window.innerWidth;

    // Dynamic tooltip sizing and placement that got way too complicated and not generic enough
    let tooltipWidth = 300;
    let directionClass = direction || 'top';
    let pos_left = -75;
    let leftOffset;
    if (innerWidth < tooltipWidth * 1.5) {
      tooltipWidth = innerWidth / 2;
    }

    // So many magic numbers need to work on a better solution
    if (this.refs.tooltipAnchor) {
      leftOffset = this.getOffset(this.refs.tooltipAnchor).left;
      let rightOffset = this.getOffset(this.refs.tooltipAnchor).right;

      if (leftOffset + (tooltipWidth / 2) > innerWidth) {
        tooltipWidth = 225;
        pos_left = -37;
        directionClass = 'top';
      } else if (leftOffset > tooltipWidth) {
        pos_left = -75;
        directionClass = 'top';
      } else if (pos_left - tooltipWidth > -innerWidth) {
        pos_left = 2;
        directionClass = 'right';
      }

      //This is to display the tooltip container within the grid
      let gridWidth = document.querySelector('#page-wrap .grid');
      gridWidth = gridWidth.clientWidth;

      let widthConsidered;
      if(innerWidth > gridWidth){
          widthConsidered = gridWidth;
      }else{
         widthConsidered = innerWidth;
      }

      //stop topLeft-directionClass alignment//
      var setDirectionClass = true;
      var classDetails = this.refs.tooltipAnchor.parentNode.parentNode.className;
      if(classDetails.indexOf('m-alignTooltipText') != -1){
        setDirectionClass = false;
      }

      if (leftOffset + tooltipWidth > widthConsidered && setDirectionClass) {
         pos_left = "auto";
        directionClass = 'top topLeft';
      }
    }

    const classes = classnames('tooltip', className, actionClass, activeClass);

    if (active) {
      document.addEventListener('keydown', this.onEscape);
      document.addEventListener('mousedown', this.closeFn);
    } else {
      document.removeEventListener('keydown', this.onEscape);
    }

    return (
      <div className="displayInlineBlock positionRelative headingsTooltip">
        <a
          href="javascript:void(0)"
          className={classes}
          onClick={this.toggleFn}
          ref="tooltipAnchor"
        />
        <div className={`tooltip--container ${directionClass} `} style={{ width: tooltipWidth + 'px', left: pos_left + 'px' }}>
          {!this.props.hideHeader && <div className="tooltip--header" style={{ margin: '0 -0.5rem' }}>
            <div>{header}</div>
          </div>}
          <div className="tooltip--body">
            {children}
          </div>
          <button
            className="tooltip--close button no-style positionAbsolute textAlignRight"
            onClick={this.closeFn}
          >&times;</button>
        </div>
      </div>
    );
  }
}

ToolTip.propTypes = {
  header: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]).isRequired,
  className: React.PropTypes.string,
  click: React.PropTypes.bool,
  children: React.PropTypes.node,
  direction: React.PropTypes.string,
};

ToolTip.defaultProps = {
  className: '',
  click: true,
};

export default ToolTip;
