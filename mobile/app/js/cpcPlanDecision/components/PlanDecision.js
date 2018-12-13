
/*
  eslint-disable react/no-unescaped-entities
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../common/HorizontalRule';
import Inline from './Inline';
import DiscountChange from './DiscountChange';
import { hashHistory } from '../../store';

class PlanDecision extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleExploreOnClick = (selectedOption, url) => {
    if (selectedOption === 'llp') {
      hashHistory.replace('/decision/discountChangeModal');
      this.props.showDiscountChangeOverlay(true);
    } else {
      window.location.href = url;
    }
  }
  render() {
    if (this.props.showDiscountChange) {
      return <DiscountChange {...this.props} />;
    }
    return (
      <Grid className="noSideMargin pad32">

        <Row>
          <Col xs={12}>
            <h1 className="fontSize_2_5">{this.props.cq.label.OD_CPC_PLANDEC_OPTIONS_TITLE}</h1>
            <HorizontalRule margin="32px 0 0" />
          </Col>
        </Row>
        <Inline {...this.props} handleClick={this.handleExploreOnClick} />

      </Grid>
    );
  }
}

PlanDecision.propTypes = {
  cq: PropTypes.object,
  discountApplicable: PropTypes.bool,
  showDiscountChangeOverlay: PropTypes.func,
  showDiscountChange: PropTypes.bool,
};


PlanDecision.defaultProps = {
  discountApplicable: false,
};

export default PlanDecision;
