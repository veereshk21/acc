import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from '../../common/Button/Button';
import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';
import { hashHistory } from './../../store';

export default class InEligible extends React.Component {
  constructor(props) {
    super(props);
    this.linkClass = (this.props.inEligibleDetails.linkText ? '' : 'is-hidden');
    this.onButtonClick = this.onButtonClick.bind(this);
    // this.state = {
    //   orderCanceled: false
    // }
  }

  /* --- Event Handlers --- */
  /**
     * Event handler for the button in the error page
     * The actions will be dependant on the inElibilityCode we receive from the JSON
     */

  onButtonClick() {
    this.props.onButtonClick(`${this.props.inEligibleDetails.cancelPlanChangeURL}`);
  }
  render() {
    const { allowCancel } = this.props;
    const { accountMember } = this.props.inEligibleDetails;
    return (
      <Grid className="pad32">

        {this.props.loader && <Loader />}
        <Row >
          <Col xs={12}>
            <Title className="fontSize_8" style={{ fontSize: '10.5vw', lineHeight: '1.1' }}>{allowCancel === false ? this.props.cqJSON.label.OD_MDN_PENDING_NA_TITLE : this.props.inEligibleDetails.title}</Title>
            <p className="margin18 onlyTopMargin fontSize_1_3">{allowCancel === false ? this.props.cqJSON.label.OD_MDN_PENDING_NA_DESC : this.props.inEligibleDetails.subTitle}</p>
          </Col>

        </Row>
        <Row>
          <Col xs={12} className="footerFixed">
            {allowCancel === true ?
              <Button className="button secondary width40 margin6 onlySideMargin" analyticstrack="ineligible-cancel" onClick={() => hashHistory.push('/')} >{this.props.cqJSON.label.OD_MDN_NO_BTN}</Button> :
              <Button className="button primary width40 margin12 onlySideMargin" analyticstrack="ineligible-got-it" onClick={() => hashHistory.push('/')} >{this.props.cqJSON.label.OD_MDN_GOT_IT}</Button>
            }
            {allowCancel === true && <Button className="button  width40 margin6 onlySideMargin" analyticstrack="ineligible-yes" disabled={accountMember} onClick={this.onButtonClick}>{this.props.cqJSON.label.OD_MDN_YES_BTN}</Button>}
          </Col>
        </Row>
      </Grid>
    );
  }
}

InEligible.propTypes = {
  inEligibleDetails: PropTypes.object,
  onButtonClick: PropTypes.func,
  cqJSON: PropTypes.object,
  loader: PropTypes.bool,
  allowCancel: PropTypes.bool,
};
