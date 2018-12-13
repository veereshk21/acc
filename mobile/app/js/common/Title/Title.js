/*
Title.js
Renders a Page Title

Use of this Component
<Title>Are you trading in a device ?</Title>

For customisation
<Title className="fontSize_7 textAlignCenter">Are you trading in a device ?</Title>

Props:
  visuallyHidden - will make the entire title component visually hidden but available to screen readers
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

class Title extends Component { // eslint-disable-line
  render() {
    const { visuallyHidden, className, ...props } = this.props; // eslint-disable-line
    const headerClassName = className + ' outlineNone h2';
    return (

      <Row className={` ${(visuallyHidden ? 'is-visuallyHidden' : '')} ensighten_title`}>

        <Col xs={12}>
          <h1 className={headerClassName} {...props} />
        </Col>
      </Row>
    );
  }
}
Title.defaultProps = {
  className: '',
  visuallyHidden: false,
  tabIndex: null,
};
Title.propTypes = {
  className: PropTypes.string,
  visuallyHidden: PropTypes.bool,
  tabIndex: PropTypes.string,
};
export default Title;
