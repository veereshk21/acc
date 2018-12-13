import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Row, Col } from 'react-flexbox-grid';
import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule';
import HeroPriceComponent from '../../common/HeroPrice/';
import ItemBreakdown from '../../common/ItemBreakDown/';

export default class CartActivationFee extends React.Component {
  constructor(props) {
    super(props);
    this.selectedMTN = null;
  }
  render() {
    return (
      <Grid className="pad12 noSidePad">
        <Row className="noSideMargin">
          <Col xs={12} className="noSidePad">
            <BackButton to="/">{this.props.CQLabel.get('OD_CART_BACK_CTA')}</BackButton>
          </Col>
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <Row className="noSideMargin ">
              <Col xs={12} className="noSidePad">
                <h1 className=" noSidePad">{this.props.CQLabel.get('OD_CART_DUE_TODAY_ACTIVATION_FEE')}</h1>
                <HorizontalRule />
              </Col>
            </Row>
            <HeroPriceComponent margin="32px 0" className="noSidePad" displayPrice={this.props.totalActivationFee} />
            {this.props.items && this.props.items.map((item, i) => ((item.get('flow') === 'AAL' || item.get('flow') === 'NSO') &&
              <div>
                <Row key={i} className="activationFeeBreakDown" >
                  <Col xs={12}>
                    <h3 className="fontSize_3">{item.get('deviceManufactureName')} <span dangerouslySetInnerHTML={{ __html: item.get('deviceProductDisplayName') }} /></h3>
                    <p className="fontSize_2">{item.get('colorName') !== null && item.get('colorName')} {(item.get('colorName') && item.get('capacity')) ? ',' : ''} {item.get('capacity') !== null && item.get('capacity')}</p>
                    <HorizontalRule margin="32px 0" y={1} />
                  </Col>
                </Row>
                <ItemBreakdown
                  name={this.props.CQLabel.get('OD_CART_DUE_TODAY_ACTIVATION_FEE')}
                  price={item.get('activationFee')}
                >
                  <span className=" displayBlock color_gray_six fontSize_2">
                    {!item.get('waivedActivationFeePromo') && <span>{this.props.CQLabel.get('OD_CART_ACTIVATION_FEE_NEXT_BILL_CYCLE')}</span>}
                    {item.get('waivedActivationFeePromo') && <p className="color_gray_six fontDisplayMedium" dangerouslySetInnerHTML={{ __html: this.props.CQLabel.get('OD_CART_WAIVED_ACTIVATION') }} />}
                  </span>
                </ItemBreakdown>
              </div>
            ))}
          </Col>
        </Row>
      </Grid>
    );
  }
}

CartActivationFee.propTypes = {

  CQLabel: PropTypes.object,
  items: PropTypes.array,
  totalActivationFee: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  // isFetching: PropTypes.bool,
};
