/**
 * Created by santhra  on 6/15/2017.
 */
/* eslint-disable prefer-destructuring */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  formValueSelector,
  getFormValues,
  reduxForm,
} from 'redux-form/immutable';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Col,
  Row,
} from 'react-flexbox-grid';
import { hashHistory } from './../../store';
import Loader from '../../common/Loader/Loader';
import Img from '../../common/Img/Img';
import MSelect from '../../common/Select/index';
import ChooseEmail from '../containers/ChooseEmail';

class ChooseCarComponent extends React.Component {
  constructor(props) {
    super(props);
    // const humConfigData = props.humConfigData;

    // Prevents user from bookmarking a page after data entry
    if (Object.keys(this.props.selectedData).length === 0) {
      hashHistory.push('/');
    }

    this.selectedYear = null;
    this.selectedMake = null;
    this.selectedModel = null;
    this.selectedColor = null;

    this.state = {
      selectedYear: null,
      selectedMake: null,
      selectedModel: null,
      selectedColor: null,
      isFormValid: false,
    };
  }

  componentDidMount() {
    const urlStr = window.location.href;
    const urlSplit = urlStr.split('&'); //eslint-disable-line
  }

  componentWillReceiveProps(nextProps) {
    const { isEmailFormValid, year, model, make, color } = nextProps.selectedData;
    let isFormValid = false;
    if (isEmailFormValid && year && model && make && color) {
      isFormValid = true;
    }
    this.setState({
      isFormValid,
    });
  }

  onSubmitExpressConfig(data) {
    this.props.submitExpressConfig(
      this.props.humConfigData.ButtonMap.PrimaryButton.actionURL,
      JSON.parse(data));
  }

  getCookie(name) {
    const pattern = RegExp(name + '=.[^;]*');
    const matched = document.cookie.match(pattern);
    if (matched) {
      const cookie = matched[0].split('=');
      return cookie[1];
    }
    return false;
  }

  changeYear(e) {
    const { humConfigData } = this.props;
    const url = humConfigData.actionURLs.makeUrl;
    const selected = e.target.value;
    this.selectedYear = selected;
    const selectedCarDetails = {
      year: selected,
      make: '',
      model: '',
    };

    this.props.setSelectedDetails(selectedCarDetails);

    this.props.getMakeListAPI({
      selected,
      url,
    });
  }

  changeMake(e) {
    const { humConfigData } = this.props;
    const url = humConfigData.actionURLs.modelUrl;
    const selected = e.target.value;
    this.selectedMake = selected;

    const selectedCarDetails = {
      make: selected,
      model: '',
    };

    this.props.setSelectedDetails(selectedCarDetails);

    this.props.getModelListAPI({
      year: this.selectedYear,
      make: selected,
      url,
    });
  }

  changeModel(e) {
    const selected = e.target.value;
    this.selectedModel = selected;
    let selectedCarDetails = {
      model: selected,
    };
    const { humConfigData } = this.props;
    const { isEmailFormValid } = this.props.selectedData;
    const url = humConfigData.actionURLs.vehicleCompUrl;
    this.props.hideNotification();
    if (this.selectedColor) {
      selectedCarDetails = {
        year: this.selectedYear,
        make: this.selectedMake,
        model: selected,
        color: this.selectedColor,
      };
      this.props.setSelectedDetails(selectedCarDetails);
      const form_query = {
        ...selectedCarDetails,
        deviceVariant: humConfigData.deviceDetails.deviceVariant,
        url,
      };

      this.props.validateCarDetails(form_query);
      let isFormValid = false;
      if (isEmailFormValid) {
        isFormValid = true;
      }
      this.setState({
        isFormValid,
      });
    } else {
      this.props.setSelectedDetails(selectedCarDetails);
    }
  }

  changeColor(e) {
    const selected = e.target.value;
    this.selectedColor = selected;

    const { humConfigData } = this.props;
    const { isEmailFormValid } = this.props.selectedData;
    const url = humConfigData.actionURLs.vehicleCompUrl;
    const selectedCarDetails = {
      year: this.selectedYear,
      make: this.selectedMake,
      model: this.selectedModel,
      color: selected,
    };
    this.props.setSelectedDetails(selectedCarDetails);

    const form_query = {
      ...selectedCarDetails,
      deviceVariant: humConfigData.deviceDetails.deviceVariant,
      url,
    };

    this.props.validateCarDetails(form_query);
    let isFormValid = false;
    if (isEmailFormValid) {
      isFormValid = true;
    }
    this.setState({
      isFormValid,
    });
  }

  proceedToEmail() {
    // e.preventDefault();
    const selectedCarDetails = {
      year: this.selectedYear,
      make: this.selectedMake,
      model: this.selectedModel,
      color: this.selectedColor,
    };
    this.props.setSelectedDetails(selectedCarDetails);
    hashHistory.push('/chooseEmail');
  }

  submitConfigDetails(e) {
    e.preventDefault();

    const { humConfigData } = this.props;
    const submitUrl = humConfigData.actionURLs.submitUrl;

    this.props.setSelectedDetails({ emailId: this.enteredEmailId });

    const selectedData = this.props.selectedData;
    // selectedData.enteredEmailId = selectedData.enteredEmailId;

    this.props.submitConfigDetails({
      selectedData,
      url: submitUrl,
    });
  }

  redirectToHum() {
    window.location = this.props.onEmailError.goToLink;
  }

  render() {
    const {
      humConfigData, cqJSON, makeData, modelData, colorData, isFetching,
    } = this.props;
    const { deviceDetails, dueToday, dueMonthly } = humConfigData;

    const yearsList = humConfigData.carYearList;
    // const self = this;
    let errorMsg = null; // eslint-disable-line
    /* let isFormValid = false;

     if (this.state.isFormValid) {
     isFormValid = true;
     }
     if (isCarDetailsValid && !isCarDetailsValid.success && isCarDetailsValid.errormsgs) {
     // errorMsg = isCarDetailsValid.errormsgs;
     isFormValid = false;
     }*/

    return (
      <div>
        {isFetching === true && <Loader />}
        <ReactCSSTransitionGroup
          transitionName="background"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div>
            {
              <div>

                <Row
                  className=" clearfix margin30 onlyTopMargin pad15 noTopPad"
                >

                  <Col
                    lg={8} md={6}
                    className=" pad30 onlyLeftPad margin18 onlyTopMargin "
                  >
                    <h2
                      className="fontSize_8   margin20 onlyBottomMargin"
                      dangerouslySetInnerHTML={{ __html: cqJSON.label.OD_HUM_SELECT_CAR_TITLE }}
                    />
                    <p
                      className="margin10 onlyTopMargin"
                      dangerouslySetInnerHTML={{ __html: cqJSON.label.OD_HUM_ALL_FIELDS_REQD }}
                    />
                    <div
                      className="clearfix background_gray_one pad15 margin5 onlyTopMargin"
                    >
                      <div className="clearfix">
                        <div
                          className="floatLeft positionRelative hum_fieldsWrap margin15 onlyRightMargin"
                        >

                          <MSelect
                            name="year_car"
                            id="year_car"
                            className="fontSize_4 color_000"
                            label={cqJSON.label.OD_HUM_YEAR_LBL}
                            style={{ height: '50px', fontSize: '12px' }}
                            borderStyle
                            onChange={this.changeYear.bind(this)}
                            analyticstrack="select-year"
                          >
                            <option
                              value="" key="disabled"
                              dangerouslySetInnerHTML={{ __html: cqJSON.label.OD_HUM_YEAR_LBL }}
                              selected disabled
                            />
                            {
                              yearsList && yearsList.map(
                                (year) => <option
                                  key={year}
                                  value={year}
                                > {year} </option>)
                            }
                          </MSelect>


                        </div>

                        <div
                          className="floatLeft  positionRelative hum_fieldsWrap margin15 onlyRightMargin"
                        >


                          <MSelect
                            name="make_name"
                            id="make_name"
                            className="fontSize_4 color_000"
                            label={cqJSON.label.OD_HUM_MAKE_LBL}
                            style={{ height: '50px', fontSize: '12px' }}
                            onChange={this.changeMake.bind(this)}
                            borderStyle
                            analyticstrack="select-make"
                          >
                            <option
                              value="" key="disabled"
                              dangerouslySetInnerHTML={{ __html: cqJSON.label.OD_HUM_MAKE_LBL }}
                              selected disabled
                            />
                            {
                              makeData && makeData.map(
                                (val) => <option
                                  key={val}
                                  value={val}
                                > {val} </option>)
                            }
                          </MSelect>


                        </div>


                        <div
                          className="floatLeft  positionRelative hum_fieldsWrap margin15 onlyRightMargin"
                        >


                          <MSelect
                            name="model_name"
                            id="model_name"
                            className="fontSize_4 color_000"
                            label={cqJSON.label.OD_HUM_MODEL_LBL}
                            style={{ height: '50px', fontSize: '12px' }}
                            onChange={this.changeModel.bind(this)}
                            borderStyle
                            analyticstrack="select-model"
                          >
                            <option
                              value="" key="disabled"
                              dangerouslySetInnerHTML={{ __html: cqJSON.label.OD_HUM_MODEL_LBL }}
                              selected disabled
                            />
                            {
                              modelData && modelData.map(
                                (val) => <option
                                  key={val}
                                  value={val}
                                > {val} </option>)
                            }
                          </MSelect>


                        </div>

                        <div
                          className="floatLeft  positionRelative hum_fieldsWrap margin15 onlyRightMargin"
                        >


                          <MSelect
                            name="color_name"
                            id="color_name"
                            onChange={this.changeColor.bind(this)}
                            className="fontSize_4 color_000"
                            label={cqJSON.label.OD_HUM_COLOR_LBL}
                            style={{ height: '50px', fontSize: '12px' }}
                            borderStyle
                            analyticstrack="select-color"
                          >
                            <option
                              value="" key="disabled"
                              dangerouslySetInnerHTML={{ __html: cqJSON.label.OD_HUM_COLOR_LBL }}
                              selected disabled
                            />
                            {
                              colorData && colorData.map(
                                (val) => <option
                                  key={val}
                                  value={val}
                                > {val} </option>)
                            }
                          </MSelect>


                        </div>
                      </div>

                      <div>
                        <ChooseEmail />
                      </div>
                      <div className="clear" />
                      {/* <label className="color_red" dangerouslySetInnerHTML={{ __html: errorMsg }} /> */}


                    </div>
                  </Col>

                  <Col lg={4} md={6} className=" pad6 onlyTopPad ">
                    <Row>
                      <Col md={6} lg={6}>
                        <h1
                          className="margin12 textAlignCenter h2"
                          dangerouslySetInnerHTML={{ __html: deviceDetails.deviceName }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} lg={6}>
                        <Img
                          className="media floatLeft maxWidth100"
                          src={`${deviceDetails.image}?$device-lg$`}
                          alt="hum"
                        />
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="onlyLeftPad pad24">
                          <p
                            className="fontSize_6 bold "
                            dangerouslySetInnerHTML={{ __html: cqJSON.label.OD_HUM_DUE_TODAY }}
                          />
                          <p className="fontSize_6">${dueToday}</p>
                        </div>
                        <div className="margin12 onlyTopMargin onlyLeftPad pad24">
                          <p
                            className="fontSize_6 bold"
                            dangerouslySetInnerHTML={{ __html: cqJSON.label.OD_HUM_DUE_MONTHLY }}
                          />
                          <p className="fontSize_6">${dueMonthly}</p>
                        </div>

                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {this.props.onEmailError &&
                          this.props.onEmailError.showHumWebsiteButton && // To show only when "humAccount":true
                          <button
                            type="button"
                            className="large button secondary margin18 onlyRightMargin"
                            onClick={this.redirectToHum.bind(this)}
                            analyticstrack="redirect-to-hum.com-cta"
                          >
                            {cqJSON.label.OD_HUM_PAGE_CTA_GOTO_WEBSITE}
                          </button>
                        }

                        <button
                          disabled={(this.state.isFormValid ? '' : 'disabled')}
                          type="submit"
                          className="large button primary margin18 onlyTopMargin"
                          onClick={this.submitConfigDetails.bind(this)}
                          dangerouslySetInnerHTML={{ __html: cqJSON.label.OD_HUM_PAGE_CTA }}
                          analyticstrack="add-to-cart-select-plan-cta"
                        />


                        <p
                          className="margin20 onlyTopMargin fontSize_1"
                          dangerouslySetInnerHTML={{ __html: cqJSON.label.OD_HUM_TOTAL_LEGAL }}
                        />
                      </Col>
                    </Row>
                  </Col>

                </Row>

              </div>
            }
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

ChooseCarComponent = reduxForm({ // eslint-disable-line no-class-assign
  form: 'expressConfigForm',
  enableReinitialize: true,
})(ChooseCarComponent);

const selector = formValueSelector('expressConfigForm'); //eslint-disable-line

ChooseCarComponent = connect((state) => ({ // eslint-disable-line no-class-assign
  values: getFormValues('expressConfigForm')(state),

}))(ChooseCarComponent);

ChooseCarComponent.propTypes = {
  selectedData: PropTypes.object,
  humConfigData: PropTypes.object,
  cqJSON: PropTypes.object,
  onEmailError: PropTypes.object,
  makeData: PropTypes.array,
  colorData: PropTypes.array,
  modelData: PropTypes.array,
  submitExpressConfig: PropTypes.func,
  validateCarDetails: PropTypes.func,
  getModelListAPI: PropTypes.func,
  getMakeListAPI: PropTypes.func,
  setSelectedDetails: PropTypes.func,
  isFetching: PropTypes.bool,
  hideNotification: PropTypes.func,
  submitConfigDetails: PropTypes.func,
};
export default ChooseCarComponent;

