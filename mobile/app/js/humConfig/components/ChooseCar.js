/**
 * Created by santhra  on 6/15/2017.
 */
/* eslint-disable prefer-destructuring */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { reduxForm, formValueSelector, getFormValues } from 'redux-form/immutable';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import MSelect from '../../common/Select/';
import { hashHistory } from './../../store';
import Loader from '../../common/Loader/Loader';
import Img from '../../common/Img/Img';
import Title from '../../common/Title/Title';


const validate = (values) => {
  const {
    year_car, make_name, model_name, color_name,
  } = values.toJSON();

  if (!year_car) {
    console.log('ERROR ON YEAR');
  }
  if (!make_name) {
    console.log('ERROR ON MAKE');
  }
  if (!model_name) {
    console.log('ERROR ON MODEL');
  }
  if (!color_name) {
    console.log('ERROR ON COLOR');
  }
};

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


  onSubmitExpressConfig(data) {
    this.props.submitExpressConfig(this.props.humConfigData.ButtonMap.PrimaryButton.actionURL, JSON.parse(data));
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
    const selectedCarDetails = {
      model: selected,
    };
    this.props.hideNotification();
    this.props.setSelectedDetails(selectedCarDetails);
  }

  changeColor(e) {
    const selected = e.target.value;
    this.selectedColor = selected;

    const { humConfigData } = this.props;
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

    this.setState({
      isFormValid: true,
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

  render() {
    const {
      humConfigData, cqJSON, makeData, modelData, colorData, isCarDetailsValid, isFetching,
    } = this.props;
    const deviceDetails = humConfigData.deviceDetails;

    const yearsList = humConfigData.carYearList;
    // const self = this;
    let errorMsg = null; // eslint-disable-line
    let isFormValid = false;

    if (this.state.isFormValid) {
      isFormValid = true;
    }
    if (isCarDetailsValid && !isCarDetailsValid.success && isCarDetailsValid.errormsgs) {
      // errorMsg = isCarDetailsValid.errormsgs;
      isFormValid = false;
    }

    return (
      <div>
        {isFetching === true && <Loader />}
        <ReactCSSTransitionGroup
          transitionName="background"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <Grid className="pad32 noRightPad">
            {
              <Row>
                <Col xs={12}>
                  <Row>
                    <Col xs={6}>
                      <Title className="fontSize_4 margin12 onlyBottomMargin" dangerouslySetInnerHTML={{ __html: deviceDetails.deviceName }} />
                      <p
                        className="fontSize_1_3 fontDisplayMedium"
                        dangerouslySetInnerHTML={{ __html: cqJSON.label.OD_HUM_SELECT_CAR_TITLE }}
                      />
                      <Row>
                        <Col xs={12} className="margin6 noSideMargin">
                          <MSelect
                            borderStyle
                            aria-label={humConfigData.modelLabel}
                            label="Choose year"
                            defaultValue={this.props.selectedData.year}
                            onChange={this.changeYear.bind(this)}
                            name="year_car"
                            id="year_car"
                            analyticstrack="choose-year"
                          >
                            <option value="" className="config_option1" />
                            {yearsList.map((year, idx) => <option key={idx} value={year}>{year}</option>)}
                          </MSelect>
                        </Col>
                        <Col xs={12} className="margin6 noSideMargin">
                          <MSelect
                            borderStyle
                            aria-label={humConfigData.colorLabel}
                            label="Choose make"
                            defaultValue={this.props.selectedData.make}
                            onChange={this.changeMake.bind(this)}
                            name="make_name"
                            id="make_name"
                            disabled={!makeData}
                            analyticstrack="choose-make"
                          >
                            <option value="" className="config_option1" />
                            {makeData && makeData.map((make, idx) => <option key={idx} value={make}>{make}</option>)}
                          </MSelect>
                        </Col>
                        <Col xs={12} className="margin6 noSideMargin">
                          <MSelect
                            borderStyle
                            aria-label={humConfigData.storageLabel}
                            label="Choose model"
                            defaultValue={this.props.selectedData.model}
                            onChange={this.changeModel.bind(this)}
                            name="model_name"
                            id="model_name"
                            disabled={!modelData}
                            analyticstrack="choose-model"
                          >
                            <option value="" className="config_option1" />
                            {modelData && modelData.map((opt, idx) => <option key={idx} value={opt}>{opt}</option>)}
                          </MSelect>
                        </Col>
                        <Col xs={12} className="margin6 noSideMargin">
                          <MSelect
                            borderStyle
                            aria-label={humConfigData.storageLabel}
                            label="Choose color"
                            defaultValue={this.props.selectedData.color}
                            name="color_name"
                            id="color_name"
                            onChange={this.changeColor.bind(this)}
                            disabled={!colorData}
                            analyticstrack="choose-color"
                          >
                            <option value="" className="config_option1" />
                            {colorData && colorData.map((opt, idx) => <option key={idx} value={opt}>{opt}</option>)}
                          </MSelect>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={6} style={{ overflow: 'hidden' }} className="textAlignRight">
                      <Img
                        className="margin-48 onlyRightMargin"
                        src={`${deviceDetails.image}&wid=180&hei=340`}
                        alt="hum"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} className="textAlignCenter pad32 onlyRightPad">
                  <button
                    type="submit"
                    disabled={(isFormValid ? '' : 'disabled')}
                    className={'width40 button primary margin30 onlyTopMargin ' + (isFormValid ? '' : 'disabled')}
                    onClick={() => this.proceedToEmail()}
                    analyticstrack="hum-choose-car"
                  > {cqJSON.label.OD_HUM_PAGE_CTA}
                  </button>
                </Col>
              </Row>
            }
          </Grid>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

ChooseCarComponent = reduxForm({ // eslint-disable-line no-class-assign
  form: 'expressConfigForm',
  enableReinitialize: true,
  validate,
})(ChooseCarComponent);

const selector = formValueSelector('expressConfigForm'); //eslint-disable-line

ChooseCarComponent = connect((state) => ({ // eslint-disable-line no-class-assign
  values: getFormValues('expressConfigForm')(state),

}))(ChooseCarComponent);

ChooseCarComponent.propTypes = {
  selectedData: PropTypes.object,
  humConfigData: PropTypes.object,
  cqJSON: PropTypes.object,
  isCarDetailsValid: PropTypes.object,
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
};
export default ChooseCarComponent;

