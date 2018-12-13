import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

const Byod = ({
  cqJSON, handleAALInit,
}) => (
    <Col xs={6} className="mtnWrapper" >
      <Row>
        <Col xs={12} className="margin6 onlyBottomMargin fontDisplayMedium">
          {cqJSON.label.OD_MDN_BYOD_LBL}
        </Col>
        <Col xs={12} className="margin6 onlyBottomMargin" />
        <Col xs={12} className="margin24 noSideMargin">
          <a onClick={(e) => handleAALInit(e, true)} analyticstrack="init-breing-your-own-device">
            <div className="tile_addAline textAlignCenter" >
              <div className="tile_addAline_inner" />
            </div>
          </a>
        </Col>
        <Col xs={12} className="margin6 onlyBottomMargin">
          <button onClick={(e) => handleAALInit(e, true)} analyticstrack="init-bring-your-own-device" className="button secondary tertiary" >{cqJSON.label.OD_MDN_ADD_BTN}</button>
        </Col>
        <Col xs={12} className="margin6 onlyBottomMargin" />
        <Col xs={12} />
      </Row>
    </Col>
  );

Byod.propTypes = {
  cqJSON: PropTypes.object,
  handleAALInit: PropTypes.func,
};

Byod.defaultProps = {
};

export default Byod;
