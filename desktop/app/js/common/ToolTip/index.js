import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './../../../css/modules/toolTip.scss';
import { isTouchDevice } from './../Helpers'

class ToolTip extends React.Component {
  state = {
    active: false,
    mouseEntered: false,
    overflow: 0,
  }
  componentDidMount = () => {
    // this.updateWindowDimensions();
    setTimeout(() => this.updateWindowDimensions(), 1000);
    window.addEventListener('resize', this.updateWindowDimensions);

    // Necessarry evil for accordions
    const classname = document.getElementsByClassName('accordion__title');
    Array.from(classname).forEach((element) => {
      element.addEventListener('click', () => (setTimeout(this.updateWindowDimensions, 300))); // 250 is the ease in transition
    });
  }
  updateWindowDimensions = () => {
    if (this.buttonRef && this.buttonRef.getBoundingClientRect) {
      const { left, right } = this.buttonRef.getBoundingClientRect();
      const leftCut = left - 146;
      const rightCut = right + 146;
      let overflow = 0;
      const marginLeft = -146;
      if (leftCut < 0) {
        // console.log('cut from left - overflow ' + overflow);
        overflow = leftCut - 15;
      } else if (rightCut > window.innerWidth) {
        // console.log('cut from right - overflow ' + overflow);
        overflow = (rightCut - window.innerWidth) + 15;
      }
      this.setState({
        tootltipContainerStyles: { marginLeft: (marginLeft - overflow) },
        overflow,
      });
    }
  }
  closeFn = (e) => {
    e.preventDefault();
    this.setState({
      active: false,
      click: false,
    });
    this.buttonRef.focus();
  }
  toggleFn = (e) => {
    if ( isTouchDevice() ) {
      this.setState({ click: true });
    }
    e.preventDefault();
    if (this.state.mouseEntered) {
      this.setState({
        mouseEntered: false,
      });
      return;
    }
    this.setState({ active: !this.state.active });
    if (isTouchDevice() && this.state.active) {
      this.setState({ click: false });
    }
  }
  render() {
    const {
      className, header, text, ariaLabel, closeButtonInfo, needPadding, textTooltip, children,
    } = this.props;
    const { active } = this.state;
    const actionClass = this.state.click ? 'click' : 'hover';
    const activeClass = active ? 'active' : '';
    const classes = classnames(textTooltip ? 'textTooltip' : '', 'tooltip verticalAlignMiddle', needPadding, className, actionClass, activeClass);
    const that = this;
    return (
      <div className="displayInlineBlock positionRelative verticalBottom">
        <button
          ref={(element) => { this.buttonRef = element; }}
          style={{ border: 0 }}
          className={classes}
          onClick={this.toggleFn}
          aria-expanded={active}
          aria-label={ariaLabel}
          role="link"
          onKeyDown={(e) => {
            if (e.keyCode === 13 || e.keyCode === 32 || (e.keyCode === 27 && active)) {
              this.toggleFn(e);
            } else if (e.shiftKey && e.keyCode === 9) {
              this.setState({
                active: false,
              });
            }
          }}
          onMouseEnter={() => {
            if (that.state.active) {
              return;
            }
            that.setState({ mouseEntered: true, active: !this.state.active });
          }}
          onMouseLeave={() => {
            if (!that.state.mouseEntered) {
              return;
            }
            that.setState({ mouseEntered: false, active: !this.state.active });
          }}
        >
          {children}
        </button>
        {active &&
          <div
            className="tooltip--container"
            style={this.state.tootltipContainerStyles}
            onKeyDown={(e) => {
              if (e.keyCode === 27 && active) {
                this.toggleFn(e);
              }
            }}
          >
            <span
              aria-hidden
              style={{
                content: ' ',
                position: 'absolute',
                bottom: -2,
                left: `calc(50% + 7px + ${this.state.overflow}px)`,
                marginLeft: -14,
                border: 'solid #000000',
                borderWidth: '0 1px 1px 0',
                padding: 5,
                background: '#fff',
                transform: 'rotate(45deg)',
                marginBottom: -4,
              }}
            />
            <div className="positionRelative">
              {header && <h3 className="tooltip--header">{header}</h3>}
              <div className="pBody tooltip--body" dangerouslySetInnerHTML={{ __html: text }} />
              {this.state.click &&
                <button
                  className="tooltip--close button no-style"
                  onClick={this.closeFn}
                  aria-label={closeButtonInfo}
                  onKeyDown={(e) => {
                    if (e.keyCode === 9) {
                      this.setState({
                        active: false,
                      });
                    } else if (e.keyCode === 13 || e.keyCode === 32 ||
                      (e.keyCode === 27 && active)) {
                      e.preventDefault();
                      this.setState({
                        active: false,
                      });
                    }
                  }}
                >
                  &times;
                </button>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

ToolTip.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  closeButtonInfo: PropTypes.string,
  needPadding: PropTypes.string,
  textTooltip: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

ToolTip.defaultProps = {
  className: '',
  ariaLabel: 'More Information tooltip',
  closeButtonInfo: 'Close more information tooltip',
  needPadding: 'noPad',
  textTooltip: false,
};

export default ToolTip;
