/**
 * Created by hmahad on 5/16/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import A from '../../common/A/A';
import Title from '../../common/Title/Title';


export default class PastDueBalance extends React.PureComponent {
  render() {
    const { cqContent, pastDueData } = this.props;

    const pastDueHeader = (pastDueData.pastDuePaid === true) ? cqContent.html.OD_PAST_DUE_BALANCE_TITLE_2.replace('%pastDuePrice%', pastDueData.pastDueAmount) : cqContent.html.OD_PAST_DUE_BALANCE_TITLE_1.replace('%pastDuePrice%', pastDueData.pastDueAmount);
    return (
      <Grid className="pad32">
        <Row>
          <Col xs={12}>
            <Title><span dangerouslySetInnerHTML={{ __html: pastDueHeader }} /></Title>
            <div className="pad18 onlySidePad ">
              <p >{(pastDueData.pastDuePaid === true) ? cqContent.label.OD_PAST_DUE_BALANCE_TEXT_ONE_2 : cqContent.label.OD_PAST_DUE_BALANCE_TEXT_ONE_1}</p>
            </div>
          </Col>
          <Col xs={12} className="footerFixed">
            {(pastDueData.pastDuePaid === true) ? '' :
              <A
                className="button margin6 onlySideMargin width40 secondary"
                href={pastDueData.noThanksLink}
                analyticstrack="pastdue-cancel-shop-flow"
              >{cqContent.label.OD_PAST_DUE_BALANCE_CANCEL_CTA}
              </A>}
            <A
              className="button margin6 onlySideMargin width40"
              href={pastDueData.nextLink}
              analyticstrack="pastdue-continue-shop-flow"
            >{(pastDueData.pastDuePaid === true) ? cqContent.label.OD_PAST_DUE_BALANCE_PROCEED_CTA_2 : cqContent.label.OD_PAST_DUE_BALANCE_PROCEED_CTA_1}
            </A>
          </Col>
        </Row>
      </Grid>
    );
  }
}


PastDueBalance.propTypes = {
  cqContent: PropTypes.object,
  pastDueData: PropTypes.object,
};
