/*
  eslint-disable react/no-unescaped-entities
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../common/HorizontalRule';
import Inline from './Inline';
// import HorizontalRule from '../../common/HorizontalRule';

class Landing extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getBogoPromo(promo, idx) {
    if (promo.placement === 'CONTENT-HEADER') {
      return (
        <div className="background_00 onlyTopMargin margin18">
          {this.props.mmplanEnabled &&
            <div className="fontSize_1 onlySidePad noTopMargin noBottomMargin positionRelative textAlignLeft">
              <p className="fontDisplay fontSize_2 pad10 color_FFF noSideMargin ">
                <span className="font-icon_apple onlyRightMargin margin3" />
                <span>MUSIC</span><br />
                <span className="pad10 noSidePad">{promo.badgeText}</span>
                {promo.badgeToolTipUrl &&
                  <a role="button" aria-label="View Promo Details" className="margin6 link_white" onClick={() => { this.props.history.push('/promoModal/globalPromo/' + idx); }} analyticstrack="view-global-promo-details">
                    {promo.contentUrlText || 'Learn more'}
                  </a>
                }
              </p>
            </div>
          }
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      showKeepCurrent, keepCurrentURL, currentPlanDetails, inlinePrompt, restrictedMessage, cq, showMM, exploreTVPURL, globalPromotions, mmplanEnabled,
    } = this.props;
    const globalPromo = (globalPromotions && globalPromotions.promoBadgeMessages) || [];
    return (

      <Grid className="pad32">
        <Row>
          <Col xs={12}>
            <h1 className="fontSize_2_5">{cq.label.OD_CPC_PLANDEC_TITLE}</h1>
            {restrictedMessage && restrictedMessage !== '' &&
              <div className="pad6 background_Orange margin6 noSideMargin">
                <div className="fontSize_1_3 inlineP" dangerouslySetInnerHTML={{ __html: restrictedMessage }} />
              </div>
            }

            <HorizontalRule />
          </Col>
        </Row>
        <Row middle="xs">
          {currentPlanDetails.planLetter &&
            <Col xs={3} style={{ maxWidth: '50%' }}>
              <div style={{ lineHeight: '1', fontSize: '20vw' }} className="fontSize_12 fontDisplayBold" dangerouslySetInnerHTML={{ __html: currentPlanDetails.planLetter }} />
            </Col>
          }
          {currentPlanDetails.unitOfMeasure ?
            <Col xs={9} style={{ flex: 1, maxWidth: '50%' }}>
              <div className="fontSize_6 fontDisplayBold" dangerouslySetInnerHTML={{ __html: currentPlanDetails.planSize !== '9999' ? (currentPlanDetails.planSize + currentPlanDetails.unitOfMeasure) : 'Unlimited' }} />
            </Col>
            :
            <Col xs={12}>
              <div style={{ lineHeight: '1' }} className="fontSize_6 fontDisplayBold margin18 noSideMargin" dangerouslySetInnerHTML={{ __html: currentPlanDetails.currentPlanName }} />
            </Col>

          }
        </Row>
        <HorizontalRule y={1} margin="12px 0 12px" />
        {currentPlanDetails.unitOfMeasure &&
          <Row>
            <Col xs={12} >
              <p className="fontSize_1_3 fontDisplayMedium" dangerouslySetInnerHTML={{ __html: currentPlanDetails.currentPlanName }} />
            </Col>

          </Row>
        }

        {inlinePrompt &&
          <div>
            <HorizontalRule y={1} margin="12px 0 0" color="#d8dada" />
            <Inline {...this.props} />
          </div>
        }

        {!inlinePrompt &&
          <Row className="footerFixed noBorder noMargin noPad">
            <Col xs={12}>
              {showKeepCurrent &&
                <a className="button secondary large margin6" href={keepCurrentURL} analyticstrack="keep-current-plan">
                  {cq.label.OD_CPC_PLANDEC_KEEP_CURRENT_PLAN}

                </a>}
              <a className="button primary large margin6 width40" href={showMM ? '#/decision' : exploreTVPURL} analyticstrack="explore-plan-options">
                {cq.label.OD_CPC_PLANDEC_EXPLORE}
              </a>
            </Col>
            {mmplanEnabled && globalPromo.length > 0 && globalPromo.map((promo, idx) => this.getBogoPromo(promo, idx))}
          </Row>}

      </Grid>);
  }
}

Landing.propTypes = {

  showKeepCurrent: PropTypes.bool,
  keepCurrentURL: PropTypes.string,
  currentPlanDetails: PropTypes.object,
  inlinePrompt: PropTypes.bool,
  restrictedMessage: PropTypes.string,
  cq: PropTypes.object,
  showMM: PropTypes.bool,
  exploreTVPURL: PropTypes.string,
  globalPromotions: PropTypes.object,
  history: PropTypes.object,
  mmplanEnabled: PropTypes.bool,
};

Landing.defaultProps = {};

export default Landing;
