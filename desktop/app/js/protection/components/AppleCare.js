import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import RadioButton from '../../common/RadioButton/index';

const AppleCare = ({ cqContent, appleCare, selectedAppleCareOpt, onAppleCareChange }) => (
  <Row>
    <Col xs={12} className="pad20 noSidePad margin30 onlyBottomMargin border_grayThree borderSize_1 onlyTopBorder">
      <Row>
        <Col sm={7} lg={6}>
          <div className="pad40 onlyRightPad">
            <h2 className="margin15 onlyBottomMargin fontSize_7" dangerouslySetInnerHTML={{ __html: appleCare.name }} />
            <p className="margin15 onlyBottomMargin" dangerouslySetInnerHTML={{ __html: appleCare.desc }} />
          </div>
          <div className="margin25 onlyBottomMargin">
            <Row className="bold fontSize_5">
              <Col xs={7}>
                <RadioButton
                  tabIndex="0"
                  name="appleCareRadio"
                  id="appleCareRadio_1"
                  value=""
                  containerClassName=" "
                  labelClassName="verticalTop displayInlineBlock pad12 onlyLeftPad"
                  checked={selectedAppleCareOpt === 'None'}
                  onChange={() => { onAppleCareChange('None'); }}
                  analyticstrack="select-no-apple-care-radio"
                  aria-label="Decline AppleCare+"
                >
                  <div className="fontSize_4">{cqContent.label.DT_OD_APPLE_CARE_NONE_LABEL}</div>
                </RadioButton>
              </Col>
              <Col xs={5} className="textAlignRight">
                $0.00
              </Col>
            </Row>
          </div>
          <div>
            <Row className="bold fontSize_5">
              <Col xs={7}>
                <RadioButton
                  tabIndex="0"
                  name="appleCareRadio"
                  id="appleCareRadio_2"
                  value={appleCare}
                  containerClassName=" "
                  labelClassName="verticalTop pad12 onlyLeftPad displayInlineBlock bundleTitle"
                  checked={selectedAppleCareOpt === appleCare.skuid}
                  onChange={() => { onAppleCareChange(appleCare); }}
                  analyticstrack="select-apple-care-radio"
                >
                  <div className="fontSize_4">Add <span dangerouslySetInnerHTML={{ __html: appleCare.name }} /></div>
                </RadioButton>
              </Col>
              <Col xs={5} className="textAlignRight">
                ${appleCare.price} due today
              </Col>
            </Row>
          </div>
        </Col>
        <Col sm={5} lg={6} className="textAlignCenter">
          <img src={appleCare.imageurl} alt={`${appleCare.desc}`} />
        </Col>
      </Row>
    </Col>
  </Row>
);

AppleCare.propTypes = {
  cqContent: PropTypes.object,
  appleCare: PropTypes.object,
  selectedAppleCareOpt: PropTypes.string,
  onAppleCareChange: PropTypes.func,
};

export default AppleCare;
