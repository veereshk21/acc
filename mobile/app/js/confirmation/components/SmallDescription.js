/**
 * Created by gautam on 2/5/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable arrow-body-style */
const SmallDescription = ({ text }) => {
  return (
    <div className="fontSize_2 textAlignCenter pad10 onlyTopPad" dangerouslySetInnerHTML={{ __html: text }} />
  );
};

SmallDescription.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SmallDescription;
