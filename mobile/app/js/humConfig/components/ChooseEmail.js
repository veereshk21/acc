/* eslint-disable prefer-destructuring */
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { hashHistory } from './../../store';
import Button from '../../common/Button/Button';
import Loader from '../../common/Loader/Loader';
import Title from '../../common/Title/Title';
import RadioButton from '../../common/RadioButton/';
import MSelect from '../../common/Select/';
import { renderTextField } from '../../common/TextField/';
import HorizontalRule from '../../common/HorizontalRule/';

// eslint-disable-next-line
const validate = (values, props) => {
};

const emailValidate = (value) => {
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
  return undefined;
};

class ChooseEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
    };
    this.enteredEmailId = null;

    // Prevents user from bookmarking a page after data entry
    if (Object.keys(this.props.selectedData).length === 0) {
      hashHistory.push('/');
    }
  }


  chooseExistingEmail(e) {
    document.getElementById('existingEmail').click();
    this.enteredEmailId = e.target.value;
    this.setState({
      isFormValid: true,
    });
  }

  enterNewEmail(e) {
    this.enteredEmailId = e.target.value;
    document.getElementById('new_email').click();
    if (this.enteredEmailId && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.enteredEmailId)) {
      this.setState({
        isFormValid: false,
      });
      return;
    }
    this.setState({
      isFormValid: true,
    });
  }

  submitConfigDetails(e) {
    e.preventDefault();

    const { humConfigData } = this.props;
    const submitUrl = humConfigData.actionURLs.submitUrl;

    this.props.setSelectedDetails({ emailId: this.enteredEmailId });

    const selectedData = this.props.selectedData;
    selectedData.enteredEmailId = this.enteredEmailId;

    this.props.submitConfigDetails({
      selectedData,
      url: submitUrl,
    });
  }


  render() {
    const { cqJSON, existingEmails } = this.props;
    // const inStorePickUpUrl = humConfigData.actionURLs.inStorePickUpUrl;

    return (

      <div>
        <ReactCSSTransitionGroup
          transitionName="background"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.props.isFetching && <Loader />}
          <Grid className="pad32">
            <Row>
              <Col xs={12}>
                <Title>{cqJSON.label.OD_HUM_SIGN_TO}</Title>
                <HorizontalRule />
              </Col>
            </Row>

            <Row >
              <Col xs={12}>
                <div className="section group pad18 noSidePad border_grey onlyBottomBorder">
                  <RadioButton
                    id="existingEmail"
                    name="emailOption"
                    tabIndex="0"
                    analyticstrack="select-email-from-options"
                  >
                    <div>
                      <MSelect
                        label="Choose a saved email address"
                        name="saved_email"
                        id="saved_email"
                        onChange={this.chooseExistingEmail.bind(this)}
                        borderStyle
                        analyticstrack="choose-email"
                      >
                        <option value="" className="config_option1" />
                        {existingEmails.map((email, idx) => (<option key={idx} value={email}>{email}</option>))}
                      </MSelect>
                    </div>
                  </RadioButton>
                </div>
                <div className="section group pad18 noSidePad border_grey onlyBottomBorder">
                  <RadioButton
                    id="new_email"
                    name="emailOption"
                    tabIndex="0"
                    analyticstrack="enter-email"
                  >
                    <div className="floatLeft width100 positionRelative config_text" >
                      <Field
                        component={renderTextField}
                        className="leftAlign fontSize_4"
                        onChange={this.enterNewEmail.bind(this)}
                        name="new_email"
                        label="Enter a new email address"
                        type="email"
                        validate={emailValidate}
                      />
                    </div>
                  </RadioButton>
                </div>
              </Col>

            </Row>
            <Row className="footerFixed">
              <Col xs={12} >

                {this.props.onEmailError.showHumWebsiteButton && // To show only when "humAccount":true
                  <Button
                    type="button"
                    className="width40 button secondary margin6 sideMarginOnly"
                    onClick={() => window.location = this.props.onEmailError.goToLink}
                    analyticstrack="redirect-hum-site"
                  >
                    {cqJSON.label.OD_HUM_PAGE_CTA_GOTO_WEBSITE}
                  </Button>
                }

                <Button
                  disabled={(this.state.isFormValid ? '' : 'disabled')}
                  type="submit"
                  className="width40 button primary  margin6 sideMarginOnly"
                  onClick={this.submitConfigDetails.bind(this)}
                  analyticstrack="submit-hum-details"
                >
                  {cqJSON.label.OD_HUM_PAGE_CTA}
                </Button>
              </Col>
            </Row>
          </Grid>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

/* ChooseEmail = reduxForm({
 form: 'chooseEmailForm',
 enableReinitialize: true,
 })(ChooseEmail);

 const selector = formValueSelector('chooseEmailForm'); */

ChooseEmail.propTypes = {
  humConfigData: PropTypes.object,
  onEmailError: PropTypes.object,
  isFetching: PropTypes.bool,
  setSelectedDetails: PropTypes.func,
  submitConfigDetails: PropTypes.func,
  cqJSON: PropTypes.object,
  existingEmails: PropTypes.array,
  selectedData: PropTypes.object,
};

export default reduxForm({
  form: 'chooseEmailForm',
  validate,
})(ChooseEmail);

