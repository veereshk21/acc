import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import * as Constants from './Constants';
import Button from '../Button/Button';
import HorizontalRule from '../HorizontalRule';

// import ArrowImage from '../../../images/arrow.png';

const CostDetailsModal = (props) => {
  const { updateCostClarifier } = props;
  return (
    <Row>
      <Col xs={12}>
        <Row>
          <Col xs={12}>
            <h6 className="pad90 onlyBottomPad">
              {Constants.COST_CLARIFIER_MODAL_HEADING}
            </h6>
          </Col>
        </Row>
        <HorizontalRule y={1} />
      </Col>
      <Col xs={12} className="margin12 noSideMargin">
        <p className="">
          {updateCostClarifier.diffPriceMessage}
          <span className="bold">
            {` $${updateCostClarifier.deltaPrice}/mo`}
          </span>
        </p>
      </Col>
      <Col xs={12} className="margin12 noSideMargin">
        <Row>
          <Col xs={4}>
            <div className="bold">
              {Constants.COST_CLARIFIER_MODAL_CURRENT_BILL}
            </div>
            <div className="bold priceBig">
              {`$${updateCostClarifier.currentBillPrice}`}
            </div>
          </Col>
          <Col xs={2}>
            <div className="arrow" />
          </Col>
          <Col xs={4}>
            <div className="bold">
              {Constants.COST_CLARIFIER_MODAL_NEW_BILL}
            </div>
            <div className="bold priceBig">
              {`$${updateCostClarifier.newBillPrice}`}
            </div>
          </Col>
        </Row>
      </Col>
      {updateCostClarifier.flow === Constants.COST_CLARIFIER_AAL
        && (
          <Col xs={12} className="margin12 noSideMargin">
            <p className="">
              {Constants.COST_CLARIFIER_MODAL_ESTIMATE}
              <span className="bold">
                {Constants.COST_CLARIFIER_MODAL_NEXT_BILL}
                {` $${updateCostClarifier.nextBill}`}
              </span>
            </p>
          </Col>)
      }
      {updateCostClarifier.flow === Constants.COST_CLARIFIER_AAL
        && (
          <Col xs={12} className="margin12 noSideMargin">
            <p className="">
              {updateCostClarifier.newDeviceLegalText}
            </p>
          </Col>)
      }
      {/* placeholder for chat */}
      <Col xs={6} className="margin12 noSideMargin" />
      <Col xs={12} className="margin48 noSideMargin">
        <Button
          className="primary large width100"
          onClick={props.closeModal}
        >
          {Constants.COST_CLARIFIER_MODAL_CLOSE}
        </Button>
      </Col>
    </Row>
  );
};

CostDetailsModal.propTypes = {
  closeModal: PropTypes.func,
  updateCostClarifier: PropTypes.object,
};

export default CostDetailsModal;
