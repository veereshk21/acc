import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../../common/Checkbox/index';

const printAgreement = (id) => {
  const content = document.getElementById(id);
  const pri = document.getElementById('printFrame').contentWindow;
  pri.document.open();
  pri.document.write(content.innerHTML);
  pri.document.close();
  pri.focus();
  pri.print();
  pri.close();
};

const Agreement = (props) => {
  const {
    title,
    terms,
    name,
    id,
    labelId,
    label,
    cqContent,
  } = props;

  return (
    <div className="background_FF border_black onlyBottomBorder">
      <form className="margin18 noSideMargin">
        <div className="clearfix">
          {title && <p className="bold floatLeft">{title}</p>}
          {terms &&
            <div className="floatRight">
              <p>
                <button
                  className="fontSize_3 link background_transparent displayInlineBlock borderSize_0"
                  type="button"
                  analyticstrack="printAgreement-CTA"
                  onClick={(() => printAgreement(`${id}_terms`))}
                >
                  Printer-friendly version
                </button>
              </p>
            </div>
          }
        </div>
        <div >
          {terms &&
            <div
              id={`${id}_terms`}
              className="height160 border_grayThree overflowScroll margin12 noSideMargin pad12 terms_external"
              dangerouslySetInnerHTML={{ __html: terms }}
              tabIndex="0"
            />
          }
          {id === 'devicePaymentAgrement_0' && <p className="legal pad12 noSidePad color_000" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CHECKOUT_TC_DEVICE_AGREEMENT_DISCLAIMER }} />}
          <div>
            <Checkbox
              className="checkbox clearfix"
              name={name}
              id={id}
              type="checkbox"
              labelClass="verticalTop displayInlineBlock verticalCenter leftAlign pad12 onlyLeftPad width90"
              aria-labelledby={labelId}
              analyticstrack={`agreement-${id}-checkbox`}
              aria-hidden
            >
              <p id={labelId} >
                {label}
              </p>
            </Checkbox>
          </div>
        </div>
      </form>
    </div>
  );
};
Agreement.propTypes = {
  title: PropTypes.string,
  terms: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  labelId: PropTypes.string,
  label: PropTypes.string,
  cqContent: PropTypes.object,
};
export default Agreement;
