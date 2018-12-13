import PropTypes from 'prop-types';
import React from 'react';
import { reduxForm } from 'redux-form/immutable';

import { Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../common/HorizontalRule';
import RadioButton from '../../common/RadioButton';
import ToolTip from '../../common/ToolTip';

const Options = (props) => {
  const { _promoOptions, handleOnChange, cqContent } = props;
  return (
    <Row>
      <Col xs={12} sm={12} md={11} lg={11} xl={11}>
        <Row>
          {_promoOptions.map((option, i) => (
            <Col xs={12} sm={12} md={12} lg={12} xl={12} key={`promo-${i}`}>
              <RadioButton
                id={`option-${i}`}
                name="promoOptions"
                value={option.title}
                labelClassName="displayInlineBlock onlyLeftPad pad12 verticalCenter width85 radioLabel"
                onChange={() => handleOnChange(option)}
                analyticstrack="select-propmo-option"
              >
                <div>
                  <span className="fontDisplayBold" style={{ fontSize: '18px' }} dangerouslySetInnerHTML={{ __html: option.title }} />
                  {(option.aemUrl || option.description)
                    && (
                      <span className="floatRight textDecUnderline">
                        <a className="color_gray_six" href={`#/seedetails/${i}`}>
                          {cqContent.label.DT_OD_PROMO_INTERCEPTOR_SEE_DETAILS}
                        </a>
                      </span>
                    )
                  }
                </div>
                <div className="margin6 onlyTopMargin">
                  <span dangerouslySetInnerHTML={{ __html: option.message }} />
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
              {i < _promoOptions.length - 1 && <HorizontalRule y={1} color="#d8dada" />}
            </Col>
          ))
          }
        </Row>
      </Col>
    </Row>
  );
};

Options.propTypes = {
  _promoOptions: PropTypes.array,
  handleOnChange: PropTypes.func,
  cqContent: PropTypes.object,
};

Options.defaultProps = {};

export default reduxForm({
  form: 'promoOptionsForm',
})(Options);
