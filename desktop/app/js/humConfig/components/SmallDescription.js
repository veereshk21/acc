
import React, { Children } from 'react';
import PropTypes from 'prop-types';


export default class SmallDescription extends React.PureComponent {
  render() {
    return (
      <div className="smallText center pad10">
        {Children.toArray(this.props.children)}
      </div>
    );
  }
}

SmallDescription.propTypes = {
  children: PropTypes.any,
};
