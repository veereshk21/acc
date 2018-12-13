/* eslint-disable prefer-destructuring */
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Col, Row } from 'react-flexbox-grid';
import { hashHistory } from './../../store';
import Loader from '../../common/Loader/Loader';
import MSelect from '../../common/Select/index';
import { renderTextField } from '../../common/TextField/';


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
    this.enteredEmailId = null;

    // Prevents user from bookmarking a page after data entry
    if (Object.keys(this.props.selectedData).length === 0) {
      hashHistory.push('/');
    }
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  chooseExistingEmail(e) {
    document.getElementById('existingEmail').click();
    this.enteredEmailId = e.target.value;

    const data = {
      isEmailFormValid: true,
      enteredEmailId: e.target.value,
    };

    this.props.setSelectedDetails(data);
  }

  enterNewEmail(e) {
    this.enteredEmailId = e.target.value;
    document.getElementById('new_email').click();
    const data = {
      isEmailFormValid: true,
      enteredEmailId: e.target.value,
    };
    if (this.enteredEmailId && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.enteredEmailId)) {
      data.isEmailFormValid = false;
      return;
    }


    this.props.setSelectedDetails(data);
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
          <div >


            <div className="hum_emailWrap margin25 onlyTopMargin">
              <Row>

                <Col xs={12} lg={6} className="section group">
                  <div className="clearfix">
                    <input
                      id="existingEmail"
                      name="emailOption"
                      className="radioCustom"
                      tabIndex="0"
                      type="radio"
                      analyticstrack="select-email-option-radio"
                    />
                    <label
                      htmlFor="existingEmail"
                      className="positionRelative hum_savedEmailWrap width90 radioCustom_label"
                    />

                    <MSelect
                      name="saved_email"
                      id="saved_email"
                      className="fontSize_4 color_000"
                      label={cqJSON.label.OD_HUM_EXISTING_EMAIL_LBL}
                      style={{ height: '50px', fontSize: '12px' }}
                      borderStyle="inlineBlock"
                      onChange={this.chooseExistingEmail.bind(this)}
                      analyticstrack="select-saved-email"
                    >
                      <option value="" key="disabled" dangerouslySetInnerHTML={{ __html: cqJSON.label.OD_HUM_EXISTING_EMAIL_LBL }} selected disabled />
                      {
                        existingEmails && existingEmails.map((val) => <option key={val} value={val}> {val} </option>)
                      }
                    </MSelect>


                  </div>

                </Col>

                <Col xs={12} lg={6} className="section group">
                  <div className="clearfix">
                    <input
                      id="new_email"
                      name="emailOption"
                      className="radioCustom"
                      tabIndex="0"
                      type="radio"
                      analyticstrack="select-email-option-radio"
                    />
                    <label htmlFor="new_email" className="positionRelative radioCustom_label hum_newEmail width90">
                      <Field
                        component={renderTextField}
                        className="leftAlign fontSize_4 inlineBlock floatNone"
                        onChange={this.enterNewEmail.bind(this)}
                        name="new_email"
                        label="Enter a new email address"
                        type="email"
                        validate={emailValidate}
                      />
                    </label>

                  </div>
                </Col>


              </Row>
            </div>

          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
ChooseEmail.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};
/* ChooseEmail = reduxForm({
 form: 'chooseEmailForm',
 enableReinitialize: true,
 })(ChooseEmail);

 const selector = formValueSelector('chooseEmailForm'); */

ChooseEmail.propTypes = {
  humConfigData: PropTypes.object,
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

