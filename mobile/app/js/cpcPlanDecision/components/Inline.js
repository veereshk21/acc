/*
  eslint-disable react/no-unescaped-entities
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../common/HorizontalRule';
import RadioButton from '../../common/RadioButton/';

class Inline extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      selectedOption: null,
    };
  }

  handleRadioChange = (e) => {
    this.setState({
      url: e.target.value === 'llp' ? this.props.exploreMMPlanURL : this.props.exploreTVPURL,
      selectedOption: e.target.value,
    });
  }

  render() {
    const {
      showTVP, showMM, showMFilex, keepCurrentURL, showKeepCurrent, inlinePrompt, cq, handleClick,
    } = this.props;
    return (
      <div >
        {showMM &&
          <Row>
            <Col xs={12} className="pad12">
              <RadioButton
                name="selectPlan"
                id="selectLLPlan"
                value="llp"
                onChange={(e) => this.handleRadioChange(e)}
                analyticstrack="choose-mm-plan"
              >
                <p className="fontSize_1_3 fontDisplayMedium" >
                  {cq.label.OD_CPC_PLANDEC_SHOW_UNLIMITED_PLANS}
                </p>
                <p className="fontSize_1_3">{cq.label.OD_CPC_PLANDEC_SHOW_UNLIMITED_PLAN_SUBLINE}</p>
              </RadioButton>
              <HorizontalRule color="#d8dada" y={1} margin="12px 0 0" />
            </Col>
          </Row>}
        {showTVP &&
          <Row>
            <Col xs={12} className="pad12">
              <RadioButton
                name="selectPlan"
                id="showTVP"
                value="tvp"
                onChange={(e) => this.handleRadioChange(e)}
                analyticstrack="choose-sml"
              >
                {!showMFilex ?
                  <div>
                    <p className="fontSize_1_3 fontDisplayMedium" >
                      {cq.label.OD_CPC_PLANDEC_SHOW_NO_UNLIMITED}
                    </p>
                    <p className="fontSize_1_3">{cq.label.OD_CPC_PLANDEC_SHOW_NO_UNLIMITED_SUBLINE}</p>
                  </div>
                  :
                  <div>
                    <p className="fontSize_1_3 fontDisplayMedium" >
                      {cq.label.OD_CPC_PLANDEC_SHOW_FELIX_PLAN_SUBLINE}
                    </p>
                  </div>
                }
              </RadioButton>
              <HorizontalRule color="#d8dada" y={1} margin="12px 0" />
            </Col>
          </Row>
        }
        <Row>
          <Col xs={12} className="footerFixed noBorder">
            {showKeepCurrent && inlinePrompt &&
              <a role="button" className="button secondary large margin6" href={keepCurrentURL} analyticstrack="keep-current-plan">
                {cq.label.OD_CPC_PLANDEC_KEEP_CURRENT_PLAN}
              </a>}
            <a
              role="button"
              className="button primary large margin6 width40"
              disabled={this.state.url === null}
              onClick={() => handleClick(this.state.selectedOption, this.state.url)}
              analyticstrack="explore-plan-options"
            >
              {cq.label.OD_CPC_PLANDEC_NEXT}
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

Inline.propTypes = {
  showTVP: PropTypes.bool,
  exploreTVPURL: PropTypes.string,
  exploreMMPlanURL: PropTypes.string,
  showMM: PropTypes.bool,
  showMFilex: PropTypes.bool,
  showKeepCurrent: PropTypes.bool,
  keepCurrentURL: PropTypes.string,
  inlinePrompt: PropTypes.bool,
  cq: PropTypes.object,
  handleClick: PropTypes.func,
};

Inline.defaultProps = {};

export default Inline;
