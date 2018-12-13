/**
 * renders an anchor tag
 * @component usage
 * import A from '../../common/A/A';
 * <A href="" className="button secondary">View</A>
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class A extends Component { // eslint-disable-line
  render() {
    const { className, children, ...otherProps } = this.props;
    return (
      <a {...otherProps} className={className}>{children}</a>
    );
  }
}
/**
*  @propTypes
*  @className: expected values to be string,
*  @children: expected children to be present (string)
*/
A.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
};
/**
 * @proptype className, no default value
 * @poptype children, default null, string is required.
*/
A.defaultProps = {
  className: '',
  children: null,
};

export default A;
