import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import { Col, Row } from 'react-flexbox-grid';
import Anchor from './../../common/A/A';
import Modal from '../../common/modal/modal';


class AalOffers extends React.Component {
  static propTypes = {
    aalWithOffer: PropTypes.func,
    rtdOfferInfo: PropTypes.object,
    cancelOfferRedirect: PropTypes.func,

  };
  constructor(props) {
    super(props);
    this.state = {
      promoDetailsModalVisible: false,
      promoDescription: null,
      swiper: null,
      activeSlideIndex: 0,
    };
    this.applyOffer = this.applyOffer.bind(this);
    this.swiperRef = this.swiperRef.bind(this);
    this.cancelOffer = this.cancelOffer.bind(this);
  }
  swiperRef(ref) {
    this.setState({ swiper: ref.swiper });
  }
  applyOffer = () => {
    const { rtdOfferInfo } = this.props;
    const { offers } = rtdOfferInfo;
    const offerIndex = this.state.activeSlideIndex;
    const selectedOffer = offers[offerIndex];
    this.props.aalWithOffer(rtdOfferInfo.cqContent.selectOfferPrimaryCTA.redirectURL, selectedOffer.offerId);
  }
  cancelOffer =() => {
    const { rtdOfferInfo } = this.props;
    this.props.cancelOfferRedirect(rtdOfferInfo.cqContent.selectOfferSecondaryCTA.redirectURL);
  }
  openPromoDetailsModal = (offer) => {
    this.setState({ promoDetailsModalVisible: true });
    this.setState({ promoDescription: offer.description });
  }
  closePromoDetailsModal = () => {
    this.setState({ promoDetailsModalVisible: false });
    this.setState({ promoDescription: null });
  }
  renderPlanSlides() {
    const { rtdOfferInfo } = this.props;
    const { offers } = rtdOfferInfo;
    return (offers.map((offer, index) => (
      <div className="offersSlide background_FF span_12_of_12" key={index}>
        <div className="pad20" style={{ border: '1px solid #000' }}>
          <div className="fontSize_4 bold margin48 onlyBottomMargin"> {offer.title}</div>
          <div className="border_00 onlyTopBorder">
            <a className="textDecUnderline cursorPointer margin5 noSideMargin block floatLeft pad10 onlyTopPad" onClick={() => this.openPromoDetailsModal(offer)}>
                See details
            </a>
          </div>
          <div className="clearfix pad48" />
        </div>
      </div>
    )));
  }
  render() {
    const { rtdOfferInfo } = this.props;
    const { offers } = rtdOfferInfo;
    const self = this;
    const params = {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      slidesPerView: 1,
      spaceBetween: 0,
      slidesPerGroup: 1,
      containerClass: 'compatibleOfferSlider',
      on: {
        slideChangeTransitionStart:
          () => this.state.swiper && this.setState({ activeSlideIndex: this.state.swiper.activeIndex }),
      },
    };
    return (
      <div>
        <Row>
          <div className="pad20 noSidePad">
            <div className="pad10 marginBottom20">
              <h2>{rtdOfferInfo.cqContent.cqContent.pageTitle}</h2>
            </div>
          </div>
        </Row>
        <Row className="margin20 noSideMargin">
          {offers.length > 1 ?
            <Swiper {...params} ref={this.swiperRef}>
              {self.renderPlanSlides(offers)}
            </Swiper> : self.renderPlanSlides(offers)}
        </Row>
        <Row className="background_white pad20 noSidePad">
          <Col xs={12}>
            <div className="margin15 noSideMargin pad20 onlyBottomPad clearfix">
              <button className="button primary" analyticstrack="protection-plan-select-CTA" onClick={this.applyOffer} >
                {rtdOfferInfo.cqContent.selectOfferPrimaryCTA.label}
              </button>
            </div>
            <div>
              <Anchor onClick={this.cancelOffer} className="fontSize_4 color_black textDecUnderline displayInlineBlock margin15 onlyTopMargin cursorPointer">{rtdOfferInfo.cqContent.selectOfferSecondaryCTA.label}</Anchor>
            </div>
          </Col>
        </Row>
        <Modal
          style={{ background: 'white', width: 320, minHeight: 350 }}
          className="positionRelative"
          underlayColor="rgba(0,0,0,0.8)"
          mounted={this.state.promoDetailsModalVisible}
          closeFn={this.closePromoDetailsModal}
          showCloseX
        >
          <div id="FreeShippingModal" className="pad20">
            <h2 className="fontSize_5 pad48 onlybottomPad" >Here's what you need to know.</h2>
            <div className="pad10 onlyTopPad border_00 onlyTopBorder">{this.state.promoDescription}</div>
            <button className="button primary pad10 width40 margin20 onlyTopMargin" onClick={this.closePromoDetailsModal}>
                Close
            </button>
          </div>

        </Modal>
      </div>
    );
  }
}

export default AalOffers;
