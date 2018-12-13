import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import BackButton from '../../common/BackButton/BackButton';

const ImportantDataServiceInfo = ({ cqContent }) => {
  const { OD_IMPORTANT_DATA_SERVICE_INFO_HTML } = cqContent.html;
  return (
    <div className="pad12 noSidePad">
      <BackButton to="/">Back</BackButton>
      { OD_IMPORTANT_DATA_SERVICE_INFO_HTML && Parser(OD_IMPORTANT_DATA_SERVICE_INFO_HTML) }
    </div>
  );
};

ImportantDataServiceInfo.propTypes = {
  cqContent: PropTypes.object.isRequired,
};

export default ImportantDataServiceInfo;
