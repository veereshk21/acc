import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { renderTextField } from './../../common/TextField/';
import Button from './../../common/Button/Button';
import { hashHistory } from './../../store';

class StoreRep extends React.Component {
  constructor(props) {
    super(props);
    this.repIdChange = this.repIdChange.bind(this);
    this.repIdFocus = this.repIdFocus.bind(this);
    this.repIdBlur = this.repIdBlur.bind(this);
    this.validateStoreRep = this.validateStoreRep.bind(this);
    this.state = { repId: '', textFieldFocus: false, isWindows: navigator.platform && navigator.platform.includes('Win') };
  }
  getChildContext() {
    const muitheme = getMuiTheme(baseTheme);
    muitheme.textField.borderColor = 'rgba(0, 0, 0, 0.298039)';
    return { muiTheme: muitheme };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.userInfo && newProps.userInfo.validSalesRepId === true) {
      hashHistory.push('/storeSuccess');
    }
  }

  repIdChange(event) {
    const repID = event.target.value;
    this.setState({ repId: repID });
  }

  repIdFocus() {
    if (!this.state.isWindows) {
      this.setState({ textFieldFocus: true });
    }
  }

  repIdBlur() {
    if (!this.state.isWindows) {
      this.setState({ textFieldFocus: false });
    }
  }

  validateStoreRep(event) {
    event.preventDefault();
    this.props.validateRepId(this.state.repId, this.props.storeRepData.idValidationURL);
  }

  render() {
    const { cqContent } = this.props;
    return (
      <div className="pad18 vh70 width300">
        <div>
          <h1 className="noSidePad fontSize_3" dangerouslySetInnerHTML={{ __html: cqContent.label.OD_STORE_REP_ID_ENTRY_TEXT }} />
        </div>
        <div>
          <div>
            <Field
              className="leftAlign width100 fontSize_4"
              name="repId"
              id="repId"
              component={renderTextField}
              type="text"
              label={''}
              autoFocus
              onFocus={this.repIdFocus}
              onBlur={this.repIdBlur}
              maxLength="18"
              onChange={this.repIdChange}
            />
          </div>
        </div>
        <div>
          <Button type="button" className="button width100 primary margin10 onlyTopMargin" analyticstrack="validate-store-rep-cta" onClick={this.validateStoreRep}>
            {cqContent.label.OD_STORE_REP_ID_CONTINUE_BUTTON_TEXT}
          </Button>
        </div>
      </div>
    );
  }
}
StoreRep.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

StoreRep.propTypes = {
  cqContent: PropTypes.object,
  validateRepId: PropTypes.func,
  storeRepData: PropTypes.object,
};

StoreRep = reduxForm({ // eslint-disable-line
  form: 'repIdForm',
})(StoreRep);

export default StoreRep;
