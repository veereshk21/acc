import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import RadioButton from '../../../common/RadioButton';
import EditButton from '../../../common/EditButton/index';
import ToolTip from '../../../common/ToolTip/index';
import { EDIT_STATE } from '../../constants';

const shippingTypes = (props) => {
  const renderOptions = () => {
    const { shippingInfo, cqContent, selectedShippingRadio } = props;
    const renderedOptions = shippingInfo.shippingTypesInfo.map((option, index) => {
      // TODO: put this in cq
      // eslint-disable-next-line
      const ispuTooltip = "Check device availability, order online and pick up for free in-store. We'll email you when your order's ready and then hold it at the store for 3 days. To pick up you'll need a valid government-issued photo ID and your credit or debit card, only if that's what you used to pay.";
      const radioName = `shippingRadio${index}`;
      const radioBTNClass = (option.ispuOption === true && ((shippingInfo.contactInfo.activeSMSCapableMtnList === null) || (shippingInfo.contactInfo.activeSMSCapableMtnList.length === 0)));
      return (((selectedShippingRadio === 'ISPU' && index === 0) || option.ispuOption || selectedShippingRadio === option.shippingOptionId) &&
        <Col key={index} xs={4} className="margin24 onlyBottomMargin">
          <RadioButton
            disabled={radioBTNClass}
            name="shippingRadio"
            id={radioName}
            value={option.shippingOptionId}
            containerClassName=" "
            labelClassName="displayInlineBlock onlyLeftPad pad6 verticalCenter radioLabel"
            analyticstrack="shipping-shippingMethod-radio"
          >
            <p className="displayInlineBlock">
              <span>{parseInt(option.shippingCost, 10) > 0 ? `$${option.shippingCost}` : ''}</span>
              <span>  {option.shippingDescription}</span>
            </p>

            <ToolTip
              className="margin3 onlyLeftMargin displayInlineBlock"
              ariaLabel={`${option.shippingDescription} tooltip`}
              text={option.ispuOption ? ispuTooltip : option.description}
            />
          </RadioButton>
          <div style={{ marginLeft: 26 }}>
            {(option.estimatedDeliveryDateText || option.ispuOption) &&
              !(option.ispuOption && option.addedShippingOptionId) &&
              <p className="color_gray_six">{option.ispuOption ? 'Save time and get it near you' : `Get it ${option.estimatedDeliveryDateText}`}</p>
            }
            {option.ispuOption &&
              option.addedShippingOptionId &&
              ispudetailsInfo &&
              ispudetailsInfo.storeAddress &&
              <div>
                <p>{ispudetailsInfo.storeAddress.address1}</p>
                {ispudetailsInfo.storeAddress.address2 &&
                  <p>{ispudetailsInfo.storeAddress.address2}</p>
                }
                <p>{ispudetailsInfo.storeAddress.state}, {ispudetailsInfo.storeAddress.city}, {ispudetailsInfo.storeAddress.zipcode}</p>

              </div>
            }
            {option.ispuOption &&
              <EditButton
                onClick={props.onISPUClick}
                analyticstrack="shipping-method-ispu-edit-CTA"

              >
                <span className="fontSize_2">{option.addedShippingOptionId ? 'Change location' : 'Select a location'}</span>
              </EditButton>
            }
            {!option.ispuOption &&
              <EditButton
                onClick={() => props.updateEditState(EDIT_STATE.DELIVERY, true)}
                analyticstrack="shipping-method-deliver-edit-CTA"
              >
                <span className="fontSize_2">Change delivery</span>
              </EditButton>
            }
          </div>

          {/* ISPU, Empty contact info error */}
          {(option.ispuOption === true && ((shippingInfo.contactInfo.activeSMSCapableMtnList === null) || (shippingInfo.contactInfo.activeSMSCapableMtnList.length === 0))) && <div className="normalText pad10 onlySidePad textAlignJustify"> {cqContent.error.OD_CHECKOUT_EMPTY_CONTACT_NUMBER_ERROR}</div>}
        </Col>
      );
    });
    return renderedOptions;
  };
  const { poboMessage, selectedShippingRadio, ispudetailsInfo } = props;

  return (
    <div>
      <fieldset className="noMargin noPad" style={{ border: 'none' }}>
        <legend className="is-visuallyHidden">Shipping Methods</legend>
        <Row>
          {renderOptions()}
        </Row>
      </fieldset>
      {/* PO/BO Message */}
      {poboMessage && selectedShippingRadio !== 'ISPU' &&
        <p className="margin36 onlyTopMargin">{poboMessage}</p>
      }
    </div>
  );
};

shippingTypes.propTypes = {
  cqContent: PropTypes.object,
  poboMessage: PropTypes.string,
  selectedShippingRadio: PropTypes.string,
  // updateEditState: PropTypes.func,
  ispudetailsInfo: PropTypes.object,
};
export default shippingTypes;
