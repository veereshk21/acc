import React from 'react';
import PropTypes from 'prop-types';
import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import SummaryRow from './summaryRow';
import ToolTip from '../../../../common/ToolTip/index';


const UpgradeFeesAccordionItem = (props) => {
  const {
    devices, cqContent,
  } = props;
  const deviceName = (device) => (<p><span dangerouslySetInnerHTML={{ __html: device.manufactureName }} /> <span dangerouslySetInnerHTML={{ __html: device.deviceName }} /> {device.color && <span>in {device.color}</span>}</p>);

  return (
    <AccordionItem
      className="accordionItem border_black borderSize_1 onlyTopBorder pad6 onlyTopPad"
    >
      <AccordionItemTitle>
        <SummaryRow
          description={
            <div>
              <span className="fontSize_5">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_UPGRADE_FEE}</span>
              <ToolTip
                className="margin3 onlyLeftMargin displayInlineBlock"
                ariaLabel="Upgrade fee information tooltip"
                text={cqContent.label.DT_OD_CHECKOUT_SUMMARY_UPGRADE_FEE_TOOLTIP}
                noRenderHTML
              />
            </div>
          }
          dueToday={`$${props.totalUpgradeFee}`}
          isTitle
        />
      </AccordionItemTitle>
      <AccordionItemBody>
        {devices.items && devices.items.map((device, index) => (
          device.flow === 'EUP' && parseFloat(device.upgradeFee) > 0 &&
          <div key={`accordionUpgradeFee-${index}`}>
            <SummaryRow
              description={deviceName(device)}
              dueToday={`$${device.upgradeFee}`}
              dueMonthly="--"
            />
          </div>
        ))}

        {devices.items && devices.items.map((device, index) => (
          device.flow === 'EUP' &&
          device.devicePromotionList && device.devicePromotionList.map((offer) => (
            (offer.promoAmount !== null && parseFloat(offer.promoAmount) > 0 && offer.isUpgradeFeeWaivedOffer) &&
              <div key={`accordionDiscount-${index}`}>
                <SummaryRow
                  description={
                    <div>
                      {deviceName(device)}
                      <p>{cqContent.label.DT_OD_CHECKOUT_WAIVED_UPGRADE_FEE_TEXT}</p>
                    </div>
                  }
                  dueToday={
                    <div>
                      <p>${device.upgradeFee}</p>
                      <p className="textDecLineThrough">${device.originalUpgradeFee}</p>
                    </div>
                  }
                  dueMonthly="--"
                />
              </div>
          ))
        ))}
      </AccordionItemBody>
    </AccordionItem>
  );
};

UpgradeFeesAccordionItem.propTypes = {
  devices: PropTypes.object,
  cqContent: PropTypes.object,
  totalUpgradeFee: PropTypes.string,
};

export default UpgradeFeesAccordionItem;
