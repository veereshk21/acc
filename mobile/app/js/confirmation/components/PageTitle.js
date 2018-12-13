/**
 * Created by gautam on 2/5/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';

import Title from '../../common/Title/Title';

/* eslint-disable arrow-body-style  */
const PageTitle = ({ title }) => {
  return (
    <div className="pad12 textAlignCenter">
      <Title dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
