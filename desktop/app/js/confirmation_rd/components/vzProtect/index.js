import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';

const VerizonProtect = (props) => {
  const { cqContent, vzProtectMultiDevice } = props;

  return (
    <Row className="pad20">
      <Col xs={12} md={7} className="margin18 onlyBottomMargin">
        <h2 className="margin12 noSideMargin">
          {vzProtectMultiDevice ? cqContent.label.DT_OD_CONFIRMATION_VZ_PROTECT_MD_HEADER : cqContent.label.DT_OD_CONFIRMATION_VZ_PROTECT_SD_HEADER}
        </h2>

        <div
          className="margin12 noSideMargin"
          dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CONFIRMATION_VZ_PROTECT_APP_LIST }}
        />
        <p className="margin12 noSideMargin">
          {cqContent.label.DT_OD_CONFIRMATION_VZ_PROTECT_APP_TEXT_MESSAGE}
        </p>
      </Col>
    </Row >
  );
};

VerizonProtect.propTypes = {
  cqContent: PropTypes.object,
  vzProtectMultiDevice: PropTypes.bool,
};
export default VerizonProtect;
