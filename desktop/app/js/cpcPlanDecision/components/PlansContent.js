import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Modal from './../../common/Modal';
import Button from './../../common/Button/Button';
import Notification from './../../common/Notification/Notification';

class MultiPlanContent extends Component {
  constructor(props) {
    super(props);
    this.renderModals = this.renderModals.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = { showModalDetails: false };
  }

  componentWillMount() {
    document.addEventListener('keydown', this._handleEscKey.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleEscKey.bind(this));
  }

  closeModal(evt) {
    evt.preventDefault();
    this.setState({ showModalDetails: false });
  }

  _handleEscKey(event) {
    if (event.keyCode === 27) {
      this.closeModal(event);
    }
  }

  renderModals() {
    this.setState({ showModalDetails: true });
  }

  render() {
    let cnt = this.props.isShowMM ? 6 : 12;
    cnt = this.props.isShowTVP ? cnt : 12;
    return (
      <div>
        <div className="pad20 noSidePad margin30 onlyBottomMargin">
          <h1
            className="fontSize_10 pad30 onlyLeftPad"
            dangerouslySetInnerHTML={{
              __html: this.props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_RIGHT_PLAN_TITLE,
            }}
          />
        </div>
        {((this.props.isShowMFilex || this.props.isDataOnlyPlan || this.props.isShowTVP) && this.props.restrictedMessage) &&
          <div className="margin12 noSideMargin" style={{ color: '#000' }}>
            <Notification type="warning" message={this.props.restrictedMessage} noClose />
          </div>
        }
        {this.props.isShowCurrentPlan && <div className="pad30 positionRelative clearfix background_black" style={{ margin: '0 0 20px' }}>
          <h2 className="fontSize_11 color_FFF lineHeight30">
            <span dangerouslySetInnerHTML={{ __html: this.props.cq.label.DT_OD_CPC_INTERCEPT_CURRENT_PLAN_TITLE }} /><br />
            <span dangerouslySetInnerHTML={{ __html: this.props.cpcPromptInfo.currentPlanDetails.currentPlanName }} />
          </h2>
          <div className="margin100 onlyTopMargin block textAlignRight color_FFF">
            {this.props.isShowME && <Button
              className="secondary bold margin10 onlySideMargin"
              analyticstrack="modifyExistingPlan-CTA"
              onClick={() => { window.location = this.props.modifyExistingPlanUrl; }}
            >{this.props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_SHOW_EXISTING_PLAN}
            </Button>}
            {this.props.isShowKeepCurrent && <Button
              className="secondary bold"
              analyticstrack="gotoCurrentPlan-CTA"
              onClick={this.props.gotoCurrentPlan}
            >{this.props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_KEEP_CURRENT_PLAN}
            </Button>}
          </div>
        </div>}

        <Row middle="xs" className="margin20 onlyBottomMargin">
          {this.props.isShowMM && <Col xs={cnt} className="pad18 onlySidePad">
            <div className="border_e6 pad30 dataHLLPlanSelection positionRelative">
              <h3 className="minHeight200 fontSize_10 border_black borderSize_1 onlyBottomBorder lineHeight12">
                <span dangerouslySetInnerHTML={{ __html: this.props.cq.html.DT_OD_CPC_INTERCEPT_PROMPT_EVERYONE_GET_UNLIMITED_PLAN }} />
              </h3>
              <p className="fontSize_7 minHeight160 pad15 noSidePad">
                <span dangerouslySetInnerHTML={{ __html: this.props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_UNLIMITED_PLAN_TEXT }} />
              </p>
              <div className="pad12 noSidePad positionAbsolute" style={{ bottom: '20px', right: '25px' }}>
                <Button
                  className="fontSize_7 tertiary button"
                  analyticstrack="explore-unlimitedPlan-linkCTA"
                  onClick={this.renderModals}
                >
                  <span className="fontSize_7">{this.props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_EXPLORE_UNLIMITED_PLAN_BTN}</span>
                </Button>
              </div>
            </div>
          </Col>}

          {this.props.isShowTVP && <Col xs={cnt} className="pad18 onlySidePad">
            <div className="border_e6 pad30 dataHLLPlanSelection positionRelative">
              <h3 className="minHeight200 border_black borderSize_1 onlyBottomBorder lineHeight12">
                {!this.props.zipRestrictedAcct ?
                  <span className="fontSize_10" dangerouslySetInnerHTML={{ __html: this.props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_EVERYONE_NO_UNLIMITED_PLAN }} /> :
                  <span className="fontSize_10" dangerouslySetInnerHTML={{ __html: this.props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_EVERYONE_SHARE_DATA_PLAN }} />}
              </h3>
              <p className="fontSize_7 minHeight160 pad15 noSidePad">
                <span dangerouslySetInnerHTML={{ __html: this.props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_VZW_PLAN_TEXT }} />
              </p>
              <div className="pad12 noSidePad positionAbsolute" style={{ bottom: '20px', right: '25px' }}>
                <Button
                  className="fontSize_7 tertiary button"
                  onClick={this.props.onCpcPromptExploreTVP}
                  analyticstrack="explore-limitedPlan-linkCTA"
                  disabled={this.props.ctadisabled}
                >
                  {this.props.isShowMFilex ?
                    <span className="fontSize_7">{this.props.cq.label.DT_OD_CPC_INTERCEPT_FILEX_PLAN}</span> :
                    <span className="fontSize_7">{this.props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_EXPLORE_VZW_PLAN_BTN}</span>}
                </Button>
              </div>
            </div>
          </Col>}
        </Row>

        {this.state.showModalDetails && <Modal
          mounted={this.state.showModalDetails}
          closeFn={this.closeModal}
          style={{ background: 'white', width: '500px' }}
          underlayColor="rgba(0,0,0,0.9)"
          classNameX="buttonX"
          showCloseX
        >
          <section>
            <div className="height200 border_black borderSize_2 onlyBottomBorder margin15 onlyBottomMargin">
              <h2 className="fontSize_7 width70" dangerouslySetInnerHTML={{ __html: this.props.cq.html.DT_OD_CPC_INTERCEPT_PROMPT_VZW_PLAN_TITLE }} />
            </div>
            <div className="height200">
              <p className="fontSize_4 lineHeight18">
                {this.props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_CURRENT_PLAN_TEXT}
                <span dangerouslySetInnerHTML={{ __html: this.props.cpcPromptInfo.currentPlanDetails.currentPlanName }} />
                {this.props.discountApplicable ? this.props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_SWITCH_PLAN_TEXT : this.props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_SWITCH_PLAN_TEXT_NO_DISCOUNT}
              </p>
              {this.props.discountApplicable &&
                <p className="fontSize_4 pad15 onlyTopPad">
                  {this.props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_DISCOUNT_TEXT}
                </p>
              }
            </div>
            <Row>
              <Col xs={6}>
                <Button
                  className="primary bold button pad10 onlyRightPad width100 floatLeft"
                  analyticstrack="goto-unlimitedPlan-CTA"
                  onClick={() => { window.location = this.props.exploreMMPlanURL; }}
                >{this.props.cq.label.DT_OD_CPC_INTERCEPT_CONTINUE_BTN}
                </Button>
              </Col>
              {this.props.isShowKeepCurrent && <Col xs={6}>
                <Button
                  className="secondary bold button pad5 onlyLeftPad width100 floatRight"
                  analyticstrack="goto-currentPlan-CTA"
                  onClick={this.props.gotoCurrentPlan}
                >{this.props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_KEEP_CURRENT_PLAN}
                </Button>
              </Col>}
            </Row>
          </section>
        </Modal>}
      </div>);
  }
}

MultiPlanContent.propTypes = {
  cq: PropTypes.object,
  cpcPromptInfo: PropTypes.object,
  ctadisabled: PropTypes.bool,
  exploreMMPlanURL: PropTypes.string,
  modifyExistingPlanUrl: PropTypes.string,
  isShowTVP: PropTypes.bool,
  isShowME: PropTypes.bool,
  isShowMM: PropTypes.bool,
  isDataOnlyPlan: PropTypes.bool,
  isShowMFilex: PropTypes.bool,
  restrictedMessage: PropTypes.string,
  isShowKeepCurrent: PropTypes.bool,
  discountApplicable: PropTypes.bool,
  isShowCurrentPlan: PropTypes.bool,
  // dataPlans: PropTypes.array,
  currentPlanDetails: PropTypes.object,
  gotoCurrentPlan: PropTypes.func,
  onCpcPromptExploreTVP: PropTypes.func,
  zipRestrictedAcct: PropTypes.bool,
  // onPlanSelected: PropTypes.func,
  // selectedPlanSorId: PropTypes.string,
  // selectedPrice: PropTypes.string,
};

export default MultiPlanContent;
