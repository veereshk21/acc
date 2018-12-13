import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../common/HorizontalRule';

const ReviewOrderPlanDetails = (props) => {
  const _planList = props.inlinePlan || props.otherPlans || props.plans.items;
  return (
    <Row className="onlyTopPad">
      {(_planList && _planList.length > 0) && _planList.map((planItem, i) => {
        const planImgURL = planItem.planImageURL ? (planItem.planImageURL.indexOf('?') > -1 ? planItem.planImageURL.split('?')[0] : planItem.planImageURL) : false;
        return (

          <Col key={`plan-${i}`} xs={12} className={`noSidePad ${props.device ? ' pad18 onlyTopPad' : ''}`}>
            <Row className="noSideMargin">
              <Col
                xs={6}
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  display: 'flex',
                }}
              >
                <div>
                  <div className="fontDisplayMedium fontSize_1_3" dangerouslySetInnerHTML={{ __html: planItem.planDisplayName }} />
                  <div className="fontSize_1_3" dangerouslySetInnerHTML={{ __html: planItem.planDescription }} />
                </div>

              </Col>
              <Col xs={6} className="textAlignRight">
                {planImgURL && <img
                  src={`${planImgURL}?wid=100`}
                  srcSet={`${planImgURL}?wid=200 2x`}
                  alt={planItem.planDisplayName}
                />}
                {!planImgURL && planItem.planSize && planItem.unitOfMeasure &&
                  <div className="textAlignLeft floatRight">
                    <div className="fontDisplayBold fontSize_8 color_000" style={{ lineHeight: 1 }}>{planItem.planSize}<span className="block fontSize_7 color_000 fontDisplayBold" style={{ lineHeight: 1 }}>{planItem.unitOfMeasure}</span></div>
                  </div>
                }
              </Col>
              <Col xs={12}>
                <HorizontalRule y={1} margin="16px 0 0" color="#D8DADA" />
              </Col>
            </Row>
          </Col>
        );
      })
      }
    </Row>
  );
};

ReviewOrderPlanDetails.propTypes = {
  plans: PropTypes.object.isRequired,
  inlinePlan: PropTypes.array,
  otherPlans: PropTypes.array,
  device: false,
};

export default ReviewOrderPlanDetails;
