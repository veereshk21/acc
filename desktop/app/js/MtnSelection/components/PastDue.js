import { Grid, Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

// import A from '../../common/A/A';
import AsyncComponent from '../../common/AsyncComponent';

const A = AsyncComponent(() => import('./../../common/A/A'));
const PastDue = (props) => {
  const { cqJSON } = props;
  const pastDueHeader = cqJSON.html.DT_OD_PAST_DUE_BALANCE_TITLE.replace('%pastDuePrice%', props.pastDueAmount);

  return (
    <section className="section group grid">
      <Grid fluid>
        <div className="pad42 noSidePad width50 clearfix">
          <Col className="floatLeft">
            <Row>
              <Col xs={9}>
                <div dangerouslySetInnerHTML={{ __html: pastDueHeader }} />
              </Col>
            </Row>
            <p
              className=""
              dangerouslySetInnerHTML={{ __html: cqJSON.label.DT_OD_PAST_DUE_BALANCE_TEXT_ONE }}
            />
            <p
              className=""
              dangerouslySetInnerHTML={{ __html: cqJSON.label.DT_OD_PAST_DUE_BALANCE_TEXT_SECOND }}
            />
            <p
              className=""
              dangerouslySetInnerHTML={{ __html: cqJSON.label.DT_OD_PAST_DUE_BALANCE_TEXT_THIRED }}
            />
            <div className="margin36 noSideMargin">
              <A
                className="button margin12  onlyRightMargin large secondary"
                href={props.noThanksLink}
                analyticstrack="select-pastDueBalance-cancel-link"
              >{cqJSON.label.DT_OD_PAST_DUE_BALANCE_CANCEL_CTA}
              </A>
              <A
                className="button  large"
                href={props.nextLink}
                analyticstrack="select-pastDueBalance-continue-link"
              >{cqJSON.label.DT_OD_PAST_DUE_BALANCE_PROCEED_CTA}
              </A>
            </div>
          </Col>
        </div>
      </Grid>
    </section>
  );
};

PastDue.propTypes = {
  cqJSON: PropTypes.object,
  nextLink: PropTypes.string,
  noThanksLink: PropTypes.string,
  pastDueAmount: PropTypes.string,
};

export default PastDue;
