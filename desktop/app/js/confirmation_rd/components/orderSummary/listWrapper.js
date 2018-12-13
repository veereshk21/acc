import React from 'react';
import PropTypes from 'prop-types';

const ItemWrapper = (props) => (
  <div className="listBorder onlyBottomBorder" style={!props.noPad ? { padding: '20px 28px' } : { padding: '0px' }}>
    {props.children}
  </div>
);
ItemWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  noPad: PropTypes.bool,
};
export default ItemWrapper;
