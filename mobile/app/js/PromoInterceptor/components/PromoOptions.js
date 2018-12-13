import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import Cta from './Cta';
import HorizontalRule from '../../common/HorizontalRule';
import Modal from '../../common/modal/modal';
import OfferDetails from './OfferDetails';
import Options from './Options';

class PromoOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.showOverlay = this.showOverlay.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.CloseOverlay = this.CloseOverlay.bind(this);
    this.state = {
      url: (this.props.data.promoOptions && this.props.data.promoOptions.length === 1) ? this.props.data.promoOptions[0].url : null,
      showModal: false,
      promoId: null,
    };
  }

  componentDidMount() {
    if (this.props.data.eligiblePhoneDetails) { this.props.getModalDetails(this.props.data.eligiblePhoneDetails); }
  }

  showOverlay = () => {
    this.setState({ showModal: true });
  }

  CloseOverlay = () => {
    this.setState({ showModal: false });
  }

  handleOnChange = (opt) => {
    this.setState({
      url: opt.url || '',
      promoId: opt.promoId,
    });
  }

  PromoSelection = () => {
    const { ajaxURL } = this.props.data;
    if (this.props.optionCallType) {
      this.props.getPromoDetails(ajaxURL, this.state.promoId);
    } else {
      window.location.href = this.state.url;
    }
  }

  render() {
    const {
      _promoOptions,
      data,
      optionCallType,
      cqContent,
      eligibleModalDetails,
    } = this.props;
    return (
      <div className="pad24">
        <Modal
          mounted={this.state.showModal && eligibleModalDetails}
          className=""
          closeFn={this.CloseOverlay}
          showCloseX
        >
          <div dangerouslySetInnerHTML={{ __html: eligibleModalDetails }} />
        </Modal>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Row className="pad60 onlyBottomPad">
              <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                <h1 dangerouslySetInnerHTML={{ __html: data.promoTitle }} className="fontSize_6" style={{ lineHeight: 1 }} />
                {data.promoSubTitle
                  && <p className="margin18 noSideMargin" dangerouslySetInnerHTML={{ __html: data.promoSubTitle }} />
                }
              </Col>
            </Row>
            <HorizontalRule />
            {_promoOptions.length > 1
              && <Options _promoOptions={_promoOptions} handleOnChange={this.handleOnChange} cqContent={cqContent} />
            }
            <OfferDetails data={data} showOverlay={this.showOverlay} cqContent={cqContent} eligibleModalDetails={eligibleModalDetails} />
          </Col>

        </Row>
        <Cta
          data={data}
          optionCallType={optionCallType}
          PromoSelection={this.PromoSelection}
          redirectionUrl={this.state.url}
        />
      </div>
    );
  }
}

PromoOptions.propTypes = {
  data: PropTypes.object,
  _promoOptions: PropTypes.array,
  optionCallType: PropTypes.bool,
  getPromoDetails: PropTypes.func,
  cqContent: PropTypes.object,
  eligibleModalDetails: PropTypes.string,
  getModalDetails: PropTypes.func,
};

export default PromoOptions;
