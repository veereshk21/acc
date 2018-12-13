/**
 * Created by santhra  on 6/15/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';
import RadioButton from '../../common/RadioButton/';
import A from './../../common/A/A';
import HorizontalRule from '../../common/HorizontalRule';
import Button from '../../common/Button/Button';

export default class OfferDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t: '',
      offerId: (props && props.selectedOffer && props.selectedOffer.offerId) ? props.selectedOffer.offerId : '',
    };
  }
  componentDidMount() {
    this.props.selectedOffer.availableMTNs.map((mtn) => ((mtn.selected) ? this.setState({ t: mtn.encryptedMTN }) : ' '));
  }
  changeSelectedMtn(mtn) {
    // const mtn = event.target.value.replace(/\./g, '');
    this.setState({ t: mtn.encryptedMTN });
  }

  _onContinue() {
    this.props.acceptMyOffer(`/od/cust/auth/myoffer/accept?t=${this.state.t}&offerId=${this.state.offerId}`);
  }

  render() {
    const { selectedOffer, rtdOfferInfo, isFetching } = this.props;
    return (
      <Grid className="pad32">
        {isFetching && <Loader />}
        <Row>
          <Col xs={12}>
            <Title>{selectedOffer.title}</Title>
            <p className="margin12 onlyTopMargin">{selectedOffer.description}</p>
            <HorizontalRule />
          </Col>
          <Col xs={12}>
            <p className="fontSize_1_3 fontDisplayMedium">{rtdOfferInfo.cqContent.cqContent.selectOfferOptionTitle}</p>
            <HorizontalRule y={1} />
            {selectedOffer.availableMTNs.map((mtn, index) => (
              <div key={mtn.mtn}>
                <RadioButton
                  id={`mtnOptionradio${index}`}
                  name="tradeinOption"
                  value={mtn.mtn}
                  labelClassName="col width75 normalText margin6 onlyTopMargin floatRight"
                  onClick={this.changeSelectedMtn.bind(this, mtn)}
                  analyticstrack="choose-rtd-offer"
                >

                  <div className="margin12 onlyLeftMargin">
                    {mtn.nickName && <p className="fontDisplayMedium margin6 onlyBottomMargin">{mtn.nickName}</p>}
                    {mtn.displayMtn}
                  </div>
                </RadioButton>
                <HorizontalRule y={1} color="#D8DADA" />
              </div>
            ))}
          </Col>
        </Row>
        <Row className="footerFixed noSideMargin">
          <Col xs={12}>
            {
              (rtdOfferInfo.cqContent.selectOfferSecondaryCTA !== null) &&
              <A className="button secondary width40 margin6 onlySideMargin" analyticstrack={rtdOfferInfo.cqContent.selectOfferSecondaryCTA.label} href={rtdOfferInfo.cqContent.selectOfferSecondaryCTA.redirectURL} >
                {rtdOfferInfo.cqContent.selectOfferSecondaryCTA.label}
              </A>
            }
            {
              (rtdOfferInfo.cqContent.selectOfferPrimaryCTA !== null) &&
              <Button
                type="button"
                onClick={this._onContinue.bind(this)}
                className="button primary width40 margin6 onlySideMargin"
                disabled={!this.state.t}
                analyticstrack={rtdOfferInfo.cqContent.selectOfferPrimaryCTA.label}
              >
                {rtdOfferInfo.cqContent.selectOfferPrimaryCTA.label}
              </Button>
            }
          </Col>
          <Col xs={12} className="textAlignLeft">

            <div className="pad32 noSidePad ">
              {(rtdOfferInfo.cqContent.cqContent.note !== null) ?
                <div className="legalFinePrint color_gray_six" dangerouslySetInnerHTML={{ __html: rtdOfferInfo.cqContent.cqContent.note }} />
                : ''
              }
              {(rtdOfferInfo.cqContent.cqContent.selectOfferDisclaimerText !== null) ?
                <div className="legalFinePrint color_gray_six pad6 onlyTopPad" ><span dangerouslySetInnerHTML={{ __html: rtdOfferInfo.cqContent.cqContent.selectOfferDisclaimerText }} />
                  <Link to="/termsConditions" className="link" role="link" analyticstrack="view-disclaimer-text">{rtdOfferInfo.cqContent.cqContent.selectOfferDisclaimerLink}</Link>
                </div>
                : ''
              }
            </div>
          </Col>

        </Row>

      </Grid>
    );
  }
}
OfferDetail.propTypes = {
  selectedOffer: PropTypes.object,
  rtdOfferInfo: PropTypes.object,
  acceptMyOffer: PropTypes.func,
  isFetching: PropTypes.bool,
};
