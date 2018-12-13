import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RenderField from './../../byod/components/TextField';
import Button from './../../common/Button/Button';
import { hashHistory } from './../../store';
import Title from '../../common/Title/Title';

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
      <div>
        <div className="pad18">
          <Title className="noSidePad" dangerouslySetInnerHTML={{ __html: cqContent.label.OD_STORE_REP_ID_ENTRY_TEXT }} />
          <div className=" noSideMargin textAlignCenter">
            <div className="pad18 noSidePad">
              <Field
                className="leftAlign width100 fontSize_4"
                name="repId"
                id="repId"
                component={RenderField}
                type="text"
                label={cqContent.label.OD_STORE_REP_ID}
                autoFocus
                onFocus={this.repIdFocus}
                onBlur={this.repIdBlur}
                maxLength="18"
                onChange={this.repIdChange}
              />
            </div>
          </div>
        </div>
        <div className="clearfix pad48 onlyBottomPad" />
        <div className={`${!this.state.textFieldFocus && 'footerFixed'} pad12 textAlignCenter`}>
          <Button type="button" className="large button primary " onClick={this.validateStoreRep} analyticstrack="submit-store-rep-id">
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
