import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import { Col, Row } from 'react-flexbox-grid';
import Anchor from './../../common/A/A';
import Modal from '../../common/Modal';


class MyOffers extends React.Component {
  static propTypes = {
    aalWithOffer: PropTypes.func,
    cancelOfferRedirect: PropTypes.func,
    myOffers: PropTypes.object,
    cqContent: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      selectedPromoIndex: null,
      promoDetailsModalVisible: false,
      promoTitle: null,
      promoDescription: null,
      selected: false,
    };
    this.addPromo = this.addPromo.bind(this);
    this.applyOffer = this.applyOffer.bind(this);
    this.cancelOffer = this.cancelOffer.bind(this);
  }
  addPromo(index) {
    this.setState({ selectedPromoIndex: index });
  }
  cancelOffer = () => {
    const { myOffers } = this.props;
    this.props.cancelOfferRedirect(myOffers.cqContent.selectOfferSecondaryCTA.redirectURL);
  }
  applyOffer = () => {
    const { myOffers } = this.props;
    const offerIndex = this.state.selectedPromoIndex;
    const selectedOffer = myOffers.offers[offerIndex];
    this.props.aalWithOffer(myOffers.cqContent.selectOfferPrimaryCTA.redirectURL, selectedOffer.offerId);
  }
  openPromoDetailsModal = (offer) => {
    this.setState({ promoDetailsModalVisible: true });
    this.setState({ promoTitle: offer.title, promoDescription: offer.description });
  }
  closePromoDetailsModal = () => {
    this.setState({ promoDetailsModalVisible: false });
    this.setState({ promoTitle: null, promoDescription: null });
  }
  renderPlanSlides() {
    const { myOffers } = this.props;
    return (myOffers.offers.map((offer, index) => (
      <Col md={4} xs={4} key={index}>
        <div className="pad20" style={{ border: '1px solid #000' }}>
          <div className="fontSize_4 bold"> {offer.title}</div>
          <div className="floatLeft pad20 onlyTopPad">{(this.state.selectedPromoIndex !== index) ?
            <button
              className="button secondary margin10 noSideMargin"
              style={{ padding: '0 10px', height: '30px' }}
              disabled=""
              onClick={() => this.addPromo(index)}
              analyticstrack="placeOrder-CTA"
            >
              {myOffers.cqContent.cqContent.apply}
            </button> :
            <div className="margin15 onlyTopMargin clearfix pad10 onlyBottomPad"><div className="floatLeft icon-checkmarkComplete" /> <div className="floatLeft" style={{ height: '25px' }}> {myOffers.cqContent.cqContent.added}</div> </div>}
          </div>
          <a className="textDecUnderline cursorPointer margin5 noSideMargin block floatRight pad30 onlyTopPad" onClick={() => this.openPromoDetailsModal(offer)}>
                See details </a>
          <div className="clearfix" />
        </div>
      </Col>
    )));
  }
  render() {
    const { myOffers } = this.props;
    const self = this;
    const params = {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      renderCustomPrevButton: () => <div className="swiper-button-prev cpcPrev" analyticstrack="select-previousPlan-sliderCTA"><div className="carouselParent"><div className="carouselStyle" /></div></div>,
      renderCustomNextButton: () => <div className="swiper-button-next cpcNext" analyticstrack="select-nextPlan-sliderCTA"><div className="carouselParent"><div className="carouselStyle" /></div></div>,
      slidesPerView: 3,
      spaceBetween: 0,
      slidesPerGroup: 3,
      containerClass: 'compatibleOfferSlider',
      breakpoints: {
        // when window width is <= 640px
        640: {
          slidesPerView: 'auto',
          spaceBetween: 0,
          slidesPerGroup: 1,
        },
        // when window width is <= 800px
        800: {
          slidesPerView: 2,
          spaceBetween: 0,
          slidesPerGroup: 1,
        },
        // when window width is <= 1050px
        1050: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
      },
    };
    return (
      <div>
        <Row>
          <Col xs={5}>
            <div className="pad10 marginBottom20">
              <h2>{myOffers.cqContent.cqContent.pageTitle}</h2>
            </div>
          </Col>
        </Row>
        <Row className="margin20 noSideMargin">
          {myOffers.offers.length > 3 ?
            <Swiper {...params}>
              {self.renderPlanSlides(myOffers.offers)}
            </Swiper> : self.renderPlanSlides(myOffers.offers)}
        </Row>
        <Row className="background_white pad20 noSidePad">
          <Col xs={12}>
            <div className="margin15 noSideMargin clearfix">
              <button
                className="button primary margin15 onlyRightMargin"
                analyticstrack="protection-plan-select-CTA"
                onClick={this.applyOffer}
                disabled={this.state.selectedPromoIndex == null}
              >
                {myOffers.cqContent.selectOfferPrimaryCTA.label}
              </button>
              <Anchor onClick={this.cancelOffer} className="fontSize_4 color_black textDecUnderline displayInlineBlock margin15 onlyTopMargin cursorPointer">{myOffers.cqContent.selectOfferSecondaryCTA.label}</Anchor>
            </div>
          </Col>
        </Row>
        <Modal
          mounted={this.state.promoDetailsModalVisible}
          closeFn={this.closePromoDetailsModal}
          showCloseX
          underlayColor="rgba(0,0,0,0.8)"
          style={{ maxWidth: 350 }}
        >
          <div id="FreeShippingModal" className="pad20">
            <h2 className="fontSize_7 height160 largeBorder_black onlyBottomBorder lineHeight18">{this.props.cqContent.label.MODAL_HEADING_TEXT}</h2>
            <div className="margin10 height80">{this.state.promoDescription}</div>
            <button
              className="button primary margin15 onlyRightMargin"
              onClick={this.closePromoDetailsModal}
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default MyOffers;
