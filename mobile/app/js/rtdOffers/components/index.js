/**
 * Created by santhra  on 6/15/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import Title from '../../common/Title/Title';
import A from './../../common/A/A';
import Img from './../../common/Img/Img';
import HorizontalRule from '../../common/HorizontalRule';
import AalOffers from './../components/aalOffers';

export default class MyOffer extends React.PureComponent {
  render() {
    const { rtdOfferInfo } = this.props;
    const isAalOffer = this.props.rtdOfferInfo.offerType === 'AAL';
    if (isAalOffer) {
      return (
        <Grid className="pad32">
          <Row className="border_black onlyBottomBorder">
            <Col sm={12} md={12} lg={12}>
              <AalOffers {...this.props} />
            </Col>
          </Row>
        </Grid>);
    } return (
      <Grid className="pad32">
        <Row>
          <Col xs={12}>
            <Title>{rtdOfferInfo.cqContent.cqContent.pageTitle}</Title>
            <p className="margin12 onlyTopMargin">
              {rtdOfferInfo.cqContent.cqContent.subTitle}
            </p>
            <HorizontalRule />
          </Col>
        </Row>
        {rtdOfferInfo.availOffers.map((mtn, mtnIndex) => (
          <Row key={`mtn${mtnIndex}`}>
            <Col xs={12}>
              <p className="color_gray_six fontSize_1_3 margin6 onlyBottomMargin">{(mtn.availFor !== null) && mtn.availFor}</p>
              {mtn.offers.map((offer, offerIndex) => (
                <Link to={`selectedOffer/${offer.offerId}`} role="link" className="block" key={offerIndex} analyticstrack="mtn-offer">
                  <Img className="width100" src={offer.imgURL} alt={offer.title} />
                </Link>
              ))}
              <HorizontalRule y={1} color="#D8DADA" margin="0 0 18px" />
            </Col>
          </Row>
        ))}
        {rtdOfferInfo.availOffers.length > 1 && <div className="pad36">&nbsp;</div>}
        <div className=" footerFixed">
          <A href={rtdOfferInfo.cqContent.offerListPrimaryCTA.redirectURL} analyticstrack="accept-offer" className="large button secondary centerBlock width50">{rtdOfferInfo.cqContent.offerListPrimaryCTA.label}</A>
        </div>
      </Grid>
    );
  }
}
MyOffer.propTypes = {
  rtdOfferInfo: PropTypes.object,
  offerType: PropTypes.bool,
};
