import React from 'react';
import PropTypes from 'prop-types';

const ItemWrapper = (props) => (
  <div className="border_black borderSize_4 onlyBottomBorder">
    {props.children}
  </div>
);
ItemWrapper.propTypes = {
  children: PropTypes.element,
};
export default ItemWrapper;
