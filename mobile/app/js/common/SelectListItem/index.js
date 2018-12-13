/**
 * Component renders a simple list item with a arrow icon for selection.
 * */

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../common/HorizontalRule';
import { hashHistory } from '../../store';

export default class SelectListItem extends React.PureComponent { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleOnClick = () => {
    const { onClickMethod, to, href } = this.props;
    if (to) {
      hashHistory.push(to);
    } else if (href) {
      window.location.href = href;
    } else {
      onClickMethod();
    }
  }

  render() {
    const addlProps = {};
    if (!this.props.hideCTA && this.props.showArrow) {
      addlProps.role = 'button';
    }
    return (
      <div>
        <Row
          onClick={this.handleOnClick}
          analyticstrack="view-breakdown-content"
          {...addlProps}
          className="pad32 noSidePad"
          aria-label={`${this.props.title} ${(this.props.value ? this.props.value : '')}`}
        >
          <Col xs={6}>
            <p className="fontDisplayBold">{this.props.title}</p>
            {this.props.subtitle && <p className="legalFinePrint color_959595">{this.props.subtitle}</p>}
            {(this.props.linkText && this.props.linkAction) &&
              <span
                role="button"
                onClick={this.props.linkAction}
                className="link"
              >{this.props.linkText}
              </span>
            }
          </Col>
          <Col xs={5} className="textAlignRight noSidePad" >
            {this.props.showValue ?
              <span className="color_000" style={{ wordBreak: 'break-all' }} dangerouslySetInnerHTML={{ __html: this.props.value ? this.props.value : 'Not found' }} />
              :
              <span className="color_000" style={{ wordBreak: 'break-all' }} dangerouslySetInnerHTML={{ __html: this.props.value }} />
            }
            {this.props.subtext &&
              <p className="color_gray_six fontSize_2">{this.props.subtext}</p>}
          </Col>
          <Col xs={1} className="noSidePad">
            <span className={`bold arrowCTA ${(this.props.hideCTA || !this.props.showArrow) ? ' is-hidden' : ''}`} />
          </Col>

        </Row>
        <HorizontalRule y={1} margin="0" color={this.props.color} />
      </div>);
  }
}

SelectListItem.defaultProps = {
  hideCTA: false,
  showArrow: true,
  color: '#D8DADA',
};

SelectListItem.propTypes = {
  title: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  value: PropTypes.any,
  onClickMethod: PropTypes.func,
  linkAction: PropTypes.func,
  hideCTA: PropTypes.bool,
  showArrow: PropTypes.bool,
  subtext: PropTypes.string,
  subtitle: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  color: PropTypes.string,
  showValue: PropTypes.bool,
};
