import PropTypes from 'prop-types';
import React from 'react';
import { reduxForm } from 'redux-form/immutable';

import { Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../common/HorizontalRule';
import RadioButton from '../../common/RadioButton';
import ToolTip from '../../common/ToolTip';

const Options = (props) => {
  const { _promoOptions, handleOnChange, cqContent, showSeeDetailsModal } = props;
  return (
    <Row>


      {_promoOptions.map((option, i) => (
        <Col xs={12} sm={12} md={12} lg={12} xl={12} key={`promo-${i}`}>
          <Row>
            <Col xs={9} sm={9} md={9} lg={9} xl={10}>
              <RadioButton
                id={`option-${i}`}
                name="promoOptions"
                value={option.title}
                labelClassName="displayInlineBlock onlyLeftPad pad12 verticalCenter width85 radioLabel"
                onChange={() => handleOnChange(option)}
                analyticstrack="select-propmo-option"
                containerClassName="col width100"
                customRBClass="width100 m-top"
              >
                <Row>
                  <span className="fontDisplayBold fontSubTitle pad8 onlyLeftPad" dangerouslySetInnerHTML={{ __html: option.title }} />
                </Row>
                <div className="margin6 onlyTopMargin">
                  <span style={{ fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: option.message }} />
                  {option.tooltip
                    && (
                      <ToolTip
                        className="margin3 onlyLeftMargin displayInlineBlock"
                        ariaLabel="tooltip"
                        text={option.tooltip}
                      />
                    )
                  }
                </div>
              </RadioButton>
            </Col>
            <Col xs={3} sm={3} md={3} lg={3} xl={2}>
              {(option.aemURL || option.description)
                && (
                  <span
                    className="floatRight textDecUnderline fontSize_4 cursorPointer pad4 onlyTopPad"
                    onClick={() => showSeeDetailsModal(option.aemURL, option.description, option.title)}
                    onKeyPress={() => showSeeDetailsModal(option.aemURL, option.description, option.title)}
                  >
                    {cqContent.label.DT_OD_PROMO_INTERCEPTOR_SEE_DETAILS}
                  </span>
                )
              }
            </Col>
          </Row>
          {i < _promoOptions.length - 1 && <HorizontalRule y={1} color="#d8dada" />}
        </Col>
      ))
      }
    </Row>
  );
};

Options.propTypes = {
  _promoOptions: PropTypes.array,
  handleOnChange: PropTypes.func,
  cqContent: PropTypes.object,
  showSeeDetailsModal: PropTypes.func,
};

Options.defaultProps = {};

export default reduxForm({
  form: 'promoOptionsForm',
})(Options);
