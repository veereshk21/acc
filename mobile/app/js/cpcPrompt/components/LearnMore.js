import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';

const LearnMore = (props) => (
  <Grid>

    <Row>
      <Col>
        <div dangerouslySetInnerHTM={{ __html: props.cpcPromptInfo.learnMoreContent }} />
      </Col>
      <Col xs={12} className="footerFixed">
        <a href="/" className="width40 button secondary" analyticstrack="close-learnmore">Got It</a>
      </Col>
    </Row>
  </Grid>
);

LearnMore.propTypes = {
  cpcPromptInfo: PropTypes.object,
};

LearnMore.defaultProps = {
  cpcPromptInfo: {
    learnMoreContent: null,
  },
};

export default LearnMore;
