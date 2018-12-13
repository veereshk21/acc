import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import RadioButton from '../../common/RadioButton/index';

const SingleDeviceProtection = ({ vzProtectState, cqContent, protectionTypes, deviceDetails, showAllPlans, selectedOption, onProtectionChange, selectedProtection }) => {
  const deviceName = deviceDetails ? `${deviceDetails.brandName} ${deviceDetails.displayName} ${deviceDetails.capacity !== undefined || deviceDetails.color !== undefined ? ' in ' : ''} ${deviceDetails.capacity !== undefined ? deviceDetails.capacity : ''} ${deviceDetails.color !== undefined ? deviceDetails.color : ''}.` : '';
  const deviceUrl = deviceDetails ? deviceDetails.displayImageURL : '';
  return (
    <Row>
      <Col xs={12} className="border_grayThree borderSize_1 onlyTopBorder">
        <h2 className="margin30 onlyTopMargin fontSize_7">
          <span>{cqContent.label.DT_OD_PROTECTION_TMP_SD_TITLE}</span>
          <span dangerouslySetInnerHTML={{ __html: `${deviceName}` }} />
        </h2>
        <p className="margin5 onlyTopMargin pad30 onlyBottomPad" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_PROTECTION_TMP_SD_SUB_TITLE }} />
        <Row>
          <Col lg={6} sm={7}>
            {protectionTypes.single.map((protection, index) => { // eslint-disable-line
              if ((((vzProtectState === 'AL' && index < 2) || index === 0) || protection.sorSfoType === 'INSUR,D' || (selectedProtection && selectedProtection.sfoSkuId === protection.sfoSkuId)) || showAllPlans) {
                return (
                  <Row key={index} className="pad18 noSidePad">
                    <Col lg={10} sm={9}>
                      <RadioButton
                        name="protectionOption"
                        id={'protectionRadio_' + (index + 1)}
                        value={protection.sfoSkuId}
                        containerClassName=" "
                        analyticstrack="select-protection-plan-radio"
                        labelClassName="verticalTop displayInlineBlock pad12 onlyLeftPad width90"
                        checked={protection.sfoSkuId === selectedOption}
                        onChange={() => {
                          onProtectionChange(protection);
                        }}
                      >
                        <div className="fontSize_4">
                          <p className="bold fontSize_5">{protection.displayName}</p>
                          <p className="pad6 onlyTopPad" dangerouslySetInnerHTML={{ __html: `${protection.introText}` }} />
                        </div>
                      </RadioButton>
                    </Col>
                    <Col lg={2} sm={3} className="textAlignRight">
                      <p className="bold fontSize_5 whiteSpaceNoWrap">
                        {protection.hasEcpdDiscount && <span><span className="textDecLineThrough normal">${protection.wasPrice}</span>&nbsp;&nbsp;</span>}${`${protection.price} ${protection.priceTerm}`}
                      </p>
                    </Col>
                  </Row>
                );
              }
            })}
          </Col>
          <Col lg={6} sm={5} className="textAlignCenter">
            <img className="margin18 noSideMargin" src={deviceUrl} alt={deviceName} width="150px" />
          </Col>
        </Row>
        <div className="pad24 noSidePad fontSize_2" dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_PROTECTION_TMP_REFRESH_TEXT }} />
      </Col>
    </Row>
  );
};

SingleDeviceProtection.propTypes = {
  cqContent: PropTypes.object,
  protectionTypes: PropTypes.object,
  deviceDetails: PropTypes.object,
  showAllPlans: PropTypes.bool,
  selectedOption: PropTypes.string,
  onProtectionChange: PropTypes.func,
  vzProtectState: PropTypes.string,
  selectedProtection: PropTypes.object,
};

export default SingleDeviceProtection;
