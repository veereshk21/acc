import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

const AddALine = ({
  cqJSON, aalAllowed, handleAALInit,
}) => {
  const attrs = {
    disabled: !aalAllowed,

  };
  return (
    <Col xs={6} className="mtnWrapper" >
      <Row>
        <Col xs={12} className="margin6 onlyBottomMargin fontDisplayMedium">
          {cqJSON.label.OD_MDN_NEW_DEVICE_LBL}
        </Col>
        <Col xs={12} className="margin6 onlyBottomMargin" />
        <Col xs={12} className="margin24 noSideMargin">
          <a {...attrs} analyticstrack="add-new-line">
            <div className="tile_addAline">
              <span className="tile_addAlineplus" />
            </div>
          </a>
        </Col>
        <Col xs={12} className="margin6 onlyBottomMargin">
          <button {...attrs} analyticstrack="add-new-line" onClick={(e) => handleAALInit(e, false)} className="button secondary tertiary" >{cqJSON.label.OD_MDN_ADD_BTN}</button>
        </Col>
        <Col xs={12} className="margin6 onlyBottomMargin" />
        <Col xs={12} />
      </Row>
    </Col>
  );
};

AddALine.propTypes = {
  cqJSON: PropTypes.object,
  aalAllowed: PropTypes.bool,
  handleAALInit: PropTypes.func,
};

AddALine.defaultProps = {
  aalAllowed: true,
};

export default AddALine;
