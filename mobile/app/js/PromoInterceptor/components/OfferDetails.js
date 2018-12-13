import PropTypes from 'prop-types';
import React from 'react';

import { Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../common/HorizontalRule';
import Device from './Device';

const OfferDetails = (props) => {
  const {
    data,
    showOverlay,
    cqContent,
    eligibleModalDetails,
  } = props;
  return (
    <div>
      <Row>
        <Col xs={12} sm={12} md={9} lg={9} xl={11}>
          {data.promoMessage
            && (
              <div className="pad24 onlyTopPad">
                <h2 className="margin24 onlyBottomMargin fontSize_4" dangerouslySetInnerHTML={{ __html: data.promoMessage.title }} />
                <h2 className="margin12 onlyBottomMargin fontSize_3" dangerouslySetInnerHTML={{ __html: data.promoMessage.subtitle }} />
                <div className="margin24 onlyBottomMargin" dangerouslySetInnerHTML={{ __html: data.promoMessage.description }} />
              </div>
            )
          }
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          {data.eligiblePhoneDetails && eligibleModalDetails
            && (
              <div
                className="textDecUnderline"
                onClick={() => showOverlay()}
                onKeyPress={() => showOverlay()}
              >
                {cqContent.label.DT_OD_PROMO_INTERCEPTOR_ELIGIBLE_PHONES}
              </div>)
          }
          {data.deviceInfo
            && (
              <div>
                <HorizontalRule y={1} color="#e4e5e6" />
                <Device deviceInfo={data.deviceInfo} cqContent={cqContent} />
              </div>
            )
          }
        </Col>
      </Row>
    </div>
  );
};

OfferDetails.propTypes = {
  data: PropTypes.object,
  showOverlay: PropTypes.func,
  cqContent: PropTypes.object,
  eligibleModalDetails: PropTypes.string,
};

export default OfferDetails;
