/* eslint-disable react/prefer-stateless-function,jsx-a11y/tabindex-no-positive */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Row, Col } from 'react-flexbox-grid';
import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule';
import HeroPriceComponent from '../../common/HeroPrice/';
import ItemBreakdown from '../../common/ItemBreakDown/';

class ActivationFee extends Component {
  render() {
    const { cqContent, items, totalActivationFee } = this.props;
    return (
      <Grid className="pad12 noSidePad">
        <Row className="noSideMargin">
          <Col xs={12} className="noSidePad">
            <BackButton to="/">{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton>
          </Col>
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <Row className="noSideMargin ">
              <Col xs={12} className="noSidePad">
                <h1 className=" noSidePad">{cqContent.label.OD_CHECKOUT_ACTIVATION_FEE_TEXT}</h1>
                <HorizontalRule />
              </Col>
            </Row>
            <HeroPriceComponent margin="32px 0" className="noSidePad" displayPrice={totalActivationFee} />
            {items.map((item, i) => (
              ((item.flow === 'AAL' || item.flow === 'NSO') &&
                <div key={i} className="activationFeeBreakDown">
                  <Row key={i} className="activationFeeBreakDown" >
                    <Col xs={12}>
                      <h3 className="fontSize_3">{item.manufactureName} <span dangerouslySetInnerHTML={{ __html: item.displayName }} /></h3>
                      <p className="fontSize_2">{item.color !== null && item.color} {(item.color && item.size) && ','} {item.size !== null && item.size}</p>
                      <HorizontalRule margin="32px 0" y={1} />
                    </Col>
                  </Row>
                  <ItemBreakdown
                    name={<span className="block fontDisplayBold">{cqContent.label.OD_CHECKOUT_ACTIVATION_FEE_TEXT}</span>}
                    price={item.activationFee}
                  >
                    <span className=" displayBlock color_gray_six fontSize_2">
                      {!item.waivedActivationFeePromo && <span >{cqContent.label.OD_CHECKOUT_ACTIVATION_FEE_NEXT_BILL_CYCLE}</span>}
                      {item.waivedActivationFeePromo && <p className="color_gray_six fontDisplayMedium" dangerouslySetInnerHTML={{ __html: cqContent.label.OD_CHECKOUT_WAIVED_ACTIVATION }} />}
                    </span>
                  </ItemBreakdown>
                </div>)
            ))}
          </Col>
        </Row>
      </Grid>

    );
  }
}
ActivationFee.propTypes = {
  cqContent: PropTypes.object,
  items: PropTypes.array,
  totalActivationFee: PropTypes.string,
};
export default ActivationFee;
