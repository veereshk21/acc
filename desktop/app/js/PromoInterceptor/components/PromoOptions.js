import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';
import Cta from './Cta';
import HorizontalRule from '../../common/HorizontalRule';
import Modal from '../../common/Modal';
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
      showSeeDetailsModal: false,
      seeDetailsUrl: null,
      seeDetailsData: null,
      seeDetailsTitle: null,
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

  showSeeDetailsModal = (url, data, title) => {
    console.log('url, data, title', url, data, title);
    this.setState({ showSeeDetailsModal: true, seeDetailsUrl: url, seeDetailsData: data, seeDetailsTitle: title });
  }

  closeSeeDetailsModal = () => {
    this.setState({ showSeeDetailsModal: false });
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
      count,
    } = this.props;
    return (
      <div className={`pad24 ${count > 1 ? ' largeBorder_grayThree noLeftBorder noTopBorder ' : ''}`} >
        <Modal
          mounted={this.state.showModal && eligibleModalDetails}
          className=""
          closeFn={this.CloseOverlay}
          showCloseX
        >
          <div dangerouslySetInnerHTML={{ __html: eligibleModalDetails }} />
        </Modal>
        <Modal
          mounted={this.state.showSeeDetailsModal}
          closeFn={this.closeSeeDetailsModal}
          style={{ background: 'white', width: '600px' }}
          underlayColor="#000"
          showCloseX
        >
          {this.state.seeDetailsUrl ?
            <iframe title={this.state.seeDetailsTitle} src={this.state.seeDetailsUrl} className="width100" style={{ height: '70vh', border: '0' }} /> :
            <div dangerouslySetInnerHTML={{ __html: this.state.seeDetailsData }} />
          }
        </Modal>
        <Row style={{ minHeight: '500px' }}>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Row className="pad20 onlyBottomPad">
              <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                <h1 dangerouslySetInnerHTML={{ __html: data.promoTitle }} className="fontTitle" />
                {data.promoSubTitle
                  && <p className="margin18 onlyTopMargin" dangerouslySetInnerHTML={{ __html: data.promoSubTitle }} />
                }
              </Col>
            </Row>
            <Row>
              <Col xs={12}><HorizontalRule y={1} margin="20px 0 8px" /></Col>
            </Row>
            {_promoOptions.length >= 1 && data.promoType === 'MULTI'
              && <Options
                _promoOptions={_promoOptions}
                handleOnChange={this.handleOnChange}
                cqContent={cqContent}
                showSeeDetailsModal={this.showSeeDetailsModal}
              />
            }
            {_promoOptions.length > 1 && data.promoType !== 'MULTI'
              && <Options
                _promoOptions={_promoOptions}
                handleOnChange={this.handleOnChange}
                cqContent={cqContent}
                showSeeDetailsModal={this.showSeeDetailsModal}
              />
            }
            <OfferDetails data={data} showOverlay={this.showOverlay} cqContent={cqContent} eligibleModalDetails={eligibleModalDetails} />
            <Cta
              data={data}
              optionCallType={optionCallType}
              PromoSelection={this.PromoSelection}
              redirectionUrl={this.state.url}
            />
          </Col>
          {
            data.promoImage && <Col xs={data.promoImage ? 4 : 0} style={{ justifyContent: 'center', textAlign: 'center' }}>
              <img src={`${data.promoImage}?hei=200`} srcSet={`${data.promoImage}?hei=400 2x`} alt={data.promoTitle} />
            </Col>
          }
        </Row>

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
  getModalDetails: PropTypes.func,
  eligibleModalDetails: PropTypes.string,
  count: PropTypes.number,
};
export default PromoOptions;
