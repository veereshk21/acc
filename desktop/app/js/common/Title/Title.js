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

class Title extends Component { // eslint-disable-line
  render() {
    const {visuallyHidden, ...props}  = this.props; // eslint-disable-line
    return (

      <div className={`section group ${(visuallyHidden ? 'is-visuallyHidden' : '')} ensighten_title`}>

        <div className="col span_5_of_5">
          <h1 {...props} />
        </div>
      </div>
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
