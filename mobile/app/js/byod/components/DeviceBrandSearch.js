/* eslint-disable no-class-assign,no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { Field, reduxForm } from 'redux-form/immutable';
import Title from './../../common/Title/Title';
import Button from '../../common/Button/Button';
import { hashHistory } from './../../store';
import { renderTextField } from '../../common/TextField/';
import ResultsList from './ResultsList';
import HorizontalRule from '../../common/HorizontalRule';

export const convertCase = (lbl) => {
  switch (lbl) {
    case 'Smart Phone':
      return 'Smartphones';
    case 'Tablet':
      return 'Tablets';
    case 'Basic Phone':
      return 'Basic phones';
    case 'Smartwatch':
      return 'Smartwatches';
    default:
      return lbl;
  }
};
class DeviceBrandSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      display: true,
      showDevicesPage: false,
      hideButton: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { resultsInput } = nextProps;
    const { showDevicesPage } = this.state;
    if (resultsInput) {
      if (showDevicesPage) {
        hashHistory.push('/deviceBrandList');
      }
      // results.map((res) => options.push(res.modelName));
      this.setState({
        options: resultsInput,
      });
    }
  }
  onFocus = () => {
    this.setState({ display: true });
  }
  onRadioChange = (event) => {
    this.props.setSelectedDevice(event.target.value);
  };


  onOptionSelected = (obj) => {
    this.props.change('search_string', obj.modelName);
    this.props.setUserInput(obj);
    this.setState({
      hideButton: false,
    });
    setTimeout(() => {
      this.hideList(obj.modelName);
    }, 200);
  }

  onNextAction = () => {
    hashHistory.push('/imei');
  }
  hideList = () => {
    this.setState({
      display: false,
    });
  }
  searchDevices = (evt) => {
    const val = evt.target.value;
    const { searchDevice, selectedDevice, searchDevicesUrl } = this.props;
    let query = '/responselist';
    const obj = {
      carrier: 'Verizon',
      deviceCategory: selectedDevice,
      make: '',
      model: val || '',
    };


    if (obj.model === '') {
      query = '/responsebrands';
      this.setState({
        showDevicesPage: true,
      });
    }
    searchDevice(obj, searchDevicesUrl, query);
  }

  render() {
    const {
      cqJSON, selectedDevice,
    } = this.props;

    const __selectedDevice = convertCase(selectedDevice);
    return (
      <Grid className="pad32">
        <Row>
          <Col xs={12}>
            <Title >{cqJSON.label.OD_BYOD_DEVICE_SEARCH_TITIE}</Title>
            <HorizontalRule />
          </Col>
          <Col xs={12} className="margin24 noSideMargin">
            <Field
              component={renderTextField}
              name="search_string"
              onFocus={this.onFocus}
              onKeyUp={this.searchDevices}
              onBlur={this.onOptionSelected}
              placeholder={cqJSON.label.OD_BYOD_TYPE_MODEL}
            />
          </Col>
          {(this.state.options && this.state.display) && <ResultsList options={this.state.options} onItemSelected={this.onOptionSelected} />}
          <Col xs={12}>
            <p className="textAlignCenter pad12 noBottomPad">{cqJSON.label.OD_BYOD_OR}</p>
            <a
              className="arrowCTA displayInlineBlock margin12 noSideMargin fontDisplayBold fontSize_3"
              analyticstrack="show-brands-listing"
              onClick={() => hashHistory.push('/deviceBrandList')}
            >{`${cqJSON.label.OD_BYOD_SELECT_FROM_LIST} ${__selectedDevice}`}
            </a>
          </Col>
          <Col xs={12} className={`footerFixed textAlignCenter ${this.state.hideButton && 'is-hidden'}`}>
            <Button className="button primary width40" onClick={() => hashHistory.push('/imei')} analyticstrack="goto-imei-page">{cqJSON.label.OD_BYOD_NEXT_CTA_TEXT}</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

DeviceBrandSearch.propTypes = {
  cqJSON: PropTypes.object,
  selectedDevice: PropTypes.string,
  setSelectedDevice: PropTypes.func,
  searchDevice: PropTypes.func,
  setUserInput: PropTypes.func,
  resultsInput: PropTypes.array,
  change: PropTypes.func.isRequired,
  searchDevicesUrl: PropTypes.string.isRequired,
};

DeviceBrandSearch = reduxForm({
  form: 'imeiVerification',
})(DeviceBrandSearch);

export default DeviceBrandSearch;
