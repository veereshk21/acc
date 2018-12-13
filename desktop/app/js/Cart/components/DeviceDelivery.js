import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import ToolTip from './../../common/ToolTip/index';
import Modal from '../../common/Modal';

class shippingWrapper extends Component {
  state = {
    freeShippingModalVisible: false,
  }

  openFreeShippingModal = () => {
    this.setState({ freeShippingModalVisible: true });
  }
  closeFreeShippingModal = () => {
    this.setState({ freeShippingModalVisible: false });
  }

  render() {
    const {
      data,
      cq,
    } = this.props;
    return (
      <section id="shippingOffersInfo" className="pad8">
        <Modal
          mounted={this.state.freeShippingModalVisible}
          closeFn={this.closeFreeShippingModal}
          showCloseX
          underlayColor="rgba(0,0,0,0.8)"
          style={{ maxWidth: 700 }}
        >
          <div id="FreeShippingModal" className="pad20">
            <h2 className="margin12 noSideMargin">{cq.label.DT_OD_STANDALONE_ACCESSORY_CART_FREE_SHIPPING_TITLE}</h2>
            <div dangerouslySetInnerHTML={{ __html: cq.html.DT_OD_STANDALONE_ACCESSORY_CART_FREE_SHIPPING_DESCRIPTION }} />
          </div>
        </Modal>
        {data.output.targetter.freeShippingText && data.output.targetter.freeShippingDesc &&
          <Row className="pad5 onlyBottomPad fontSize_3">
            <Col xs={2}>
              <span className="shipping-offer icon-truck width100" />
            </Col>
            <Col className="margin10 onlyTopMargin" xs={10} >
              {!data.output.standaloneAccessories ?
                <section>
                  <span className="fontSize_3">{data.output.targetter.freeShippingText}</span>
                  <ToolTip className="margin3 onlyLeftMargin fontSize_4" header="" text={data.output.targetter.freeShippingDesc} />
                </section> :
                <section>
                  <a
                    className="fontSize_3"
                    onClick={this.openFreeShippingModal}
                    analyticstrack="open-free-shipping-modal-link"
                  >
                    {cq.label.DT_OD_STANDALONE_ACCESSORY_CART_FREE_SHIPPING_TITLE}
                  </a>
                </section>
              }
            </Col>
          </Row>
        }

        {!data.output.standaloneAccessories && data.output.targetter.nextDayText && data.output.targetter.nextDayDesc &&
          <Row className="clearfix pad5 onlyBottomPad fontSize_3">
            <Col xs={2}>
              <span className="shipping-offer icon-truck width100" />
            </Col>
            <Col xs={10}>
              <span>{cq.label.DT_OD_CART_NEXT_DAY_TITLE}</span>
              <ToolTip className="margin3 onlyLeftMargin fontSize_4" header="" text={data.output.targetter.nextDayDesc} />
            </Col>
          </Row>
        }

        {!data.output.standaloneAccessories && data.output.targetter.contentText && data.output.targetter.contentDesc &&
          <Row xs={12} className="clearfix pad5 onlyBottomPad fontSize_3">
            <Col xs={2}>
              <span className="shipping-offer icon-content-transfer width100" />
            </Col>
            <Col className="margin10 onlyTopMargin" xs={10}>
              <span>{data.output.targetter.contentText}</span>
              <ToolTip className="margin3 onlyLeftMargin fontSize_4" header="" text={data.output.targetter.contentDesc} />
            </Col>
          </Row>
        }

        {data.output.targetter && data.output.targetter.returnPolicyText && data.output.targetter.returnPolicyDesc &&
          <Row xs={12} className="clearfix pad5 onlyBottomPad fontSize_3">
            <Col xs={2}>
              <span className="shipping-offer icon-return-policy width100" />
            </Col>
            <Col className="margin10 onlyTopMargin" xs={10}>
              {<section>
                <span>
                  {data.output.targetter.returnPolicyText}</span>
                <ToolTip className="margin3 onlyLeftMargin fontSize_4" header="" text={data.output.targetter.returnPolicyDesc} />
              </section>
              }
            </Col>
          </Row>
        }
      </section>
    );
  }
}

shippingWrapper.propTypes = {
  data: PropTypes.object,
  cq: PropTypes.object,
};

export default shippingWrapper;
