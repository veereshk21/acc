import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import renderHTML from 'react-render-html';
import './../../../css/modules/common/toolTip.css';

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
      const leftCut = left - 150;
      const rightCut = right + 150;
      let overflow = 0;
      const marginLeft = -150;
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
    this.setState({ click: true });
    e.preventDefault();
    if (this.state.mouseEntered) {
      this.setState({
        mouseEntered: false,
      });
      return;
    }
    this.setState({ active: !this.state.active });
    if (this.state.active) {
      this.setState({ click: false });
    }
  }
  render() {
    const {
      className, header, text, ariaLabel, noRenderHTML, closeButtonInfo, relative,
    } = this.props;
    const { active } = this.state;
    const actionClass = this.state.click ? 'click' : 'hover';
    const activeClass = active ? 'active' : '';
    const classes = classnames('tooltip verticalAlignMiddle', className, actionClass, activeClass);
    const that = this;
    return (
      <div className={`displayInlineBlock  verticalBottom ${relative}`}>
        <button
          ref={(element) => { this.buttonRef = element; }}
          style={{ border: 0, padding: 0 }}
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
        />
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
                top: -3,
                left: `calc(50% + 7px + ${this.state.overflow}px)`,
                marginLeft: -10,
                border: 'solid #d8dada',
                borderWidth: '0 2px 2px 0',
                padding: 5,
                background: '#fff',
                transform: 'rotate(225deg)',
                marginTop: -4,
              }}
            />
            <div className="positionRelative">
              {header && <h3 className="tooltip--header">{header}</h3>}
              {noRenderHTML ? <div className="pBody tooltip--body">{text}</div> : <div className="pBody tooltip--body">{renderHTML(text)}</div>}
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
  noRenderHTML: PropTypes.bool,
  ariaLabel: PropTypes.string,
  closeButtonInfo: PropTypes.string,
  relative: PropTypes.string,
};

ToolTip.defaultProps = {
  className: '',
  ariaLabel: 'More Information tooltip',
  closeButtonInfo: 'Close more information tooltip',
  relative: 'positionRelative',
};

export default ToolTip;
