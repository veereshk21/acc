import PropTypes from 'prop-types';
import React from 'react';

import { Row, Col } from 'react-flexbox-grid';
import Button from '../../common/Button/Button';

const Cta = (props) => {
  const {
    data,
    optionCallType,
    PromoSelection,
    redirectionUrl,
  } = props;
  return (
    <Row style={{ marginTop: 'auto' }}>
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>

        {data.ctas && data.ctas.length > 0
          && (
            <div className="textAlignLeft">
              {data.ctas.map((cta, i) => (
                <div className="noSidePad displayInlineBlock margin6 onlyRightMargin" key={`cta-${i}`}>
                  {cta.type === 'button' && optionCallType
                    ? (
                      <Button
                        key={`cta-${i}`}
                        role={cta.type === 'button' ? 'button' : 'link'}
                        className={`noLeftMargin width100 ${cta.type === 'button' ? 'button large' : 'link'} ${data.ctas.length > 2 && i === 1 ? 'secondary' : 'primary'}`}
                        disabled={cta.type === 'button' && redirectionUrl === null}
                        onClick={() => PromoSelection(cta.url)}
                        onKeyDown={() => PromoSelection(cta.url)}
                        analyticstrack={`${cta.type ? cta.type : 'link'}-${data.promoType ? data.promoType : 'custom'}-${i}`}
                      >
                        {cta.label}
                      </Button>)
                    : (
                      <a
                        href={cta.type === 'button' && (optionCallType || (data.promoType === 'BOGO' && data.promoOptions && data.promoOptions.length > 1)) ? redirectionUrl : cta.url}
                        key={`cta-${i}`}
                        role={cta.type === 'button' ? 'button' : 'link'}
                        className={`width100 ${cta.type === 'button' ? 'button large' : 'link'} ${data.ctas.length > 2 && i === 1 ? 'secondary' : 'primary'}`}
                        disabled={cta.type === 'button' && ((optionCallType || (data.promoType === 'BOGO' && data.promoOptions && data.promoOptions.length > 1)) && redirectionUrl === null)}
                        analyticstrack={`${cta.type ? cta.type : 'link'}-${data.promoType ? data.promoType : 'custom'}-${i}`}
                      >
                        {cta.label}
                      </a>
                    )
                  }
                </div>
              ))}

            </div>
          )
        }
      </Col>
    </Row>
  );
};

Cta.propTypes = {
  data: PropTypes.object,
  optionCallType: PropTypes.bool,
  PromoSelection: PropTypes.func,
  redirectionUrl: PropTypes.string,
};

export default Cta;
