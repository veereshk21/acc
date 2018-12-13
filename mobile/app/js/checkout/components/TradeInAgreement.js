import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule';

const TradeInAgreement = (props) => {
  const { cqContent, tradeInAgreement } = props;
  return (
    <Grid className="pad12 onlyTopPad">
      <BackButton to="/" >{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton>
      <Row className="noSideMargin pad32">
        <Col xs={12}>
          <h2>{cqContent.label.OD_CHECKOUT_TRADE_IN_AGREEMENT_TITLE_TEXT}</h2>
          <HorizontalRule />
          <div className="margin36 onlyTopMargin" dangerouslySetInnerHTML={{ __html: tradeInAgreement }} />
        </Col>
      </Row>
    </Grid>
  );
};

TradeInAgreement.propTypes = {
  tradeInAgreement: PropTypes.string,
  cqContent: PropTypes.object,
};

export default TradeInAgreement;
