/**
 * Device Protection React Component
 * - Enables the selection/change of protection options , makes a service call to add the feature.
 */

/**
 * TODO:Will be split to component and containers
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import Button from '../Button/Button';
import RadioButton from '../RadioButton/RadioButton';

class DeviceProtection extends React.Component {
  constructor(props) {
    super(props);

    const { defaultSelected } = props;
    this.state = { buttonDisabled: defaultSelected === null, selectedOption: defaultSelected };
    this.protectionOptionChange = this.protectionOptionChange.bind(this);
    this.onSaveProtection = this.onSaveProtection.bind(this);
  }

  shouldComponentUpdate(newProps) {
    return newProps.deviceProtectionList.fetched;
  }

  onSaveProtection() {
    this.props.onSave(this.state.selectedOption);
  }

  protectionOptionChange(e) {
    this.setState({ buttonDisabled: false, selectedOption: e.target.value });
  }

  renderTAP(data) {
    if (data.tapEligible) {
      return (
        <div className="pad18 noSidePad border_grey onlyBottomBorder verticalAlignMiddle floatLeft clearfix width100">
          <RadioButton
            id={data.tapFeatureInfo.sfoSkuId}
            name="dppOption"
            value={data.tapFeatureInfo.sfoSkuId}
          >
            <span
              className="boldText displayBlock"
            >${data.tapFeatureInfo.price}{data.tapFeatureInfo.priceTerm} {data.tapFeatureInfo.displayName}
            </span>
            <span className="color_666" dangerouslySetInnerHTML={{ html: data.tapFeatureInfo.introText }} />
          </RadioButton>
        </div>);
    }
    return '';
  }

  render() {
    const { defaultSelected } = this.props;
    if (!this.props.deviceProtectionList) {
      return (<div />);
    }
    // const cq = this.props.deviceProtectionList.cq;
    // const self = this;

    return (
      <div>
        <div className="pad36 textAlignCenter noBottomPad">
          <h1 className="fontSize_6 ">{this.props.CQLabel.get('OD_CART_PROTECTIONPAGE_TITLE')}</h1>
          <p className=" pad12 noSidePad">{this.props.CQLabel.get('OD_CART_PROTECTION_CANCHANGE_INFO')}</p>
        </div>
        <div className="pad24 sidePadOnly">
          <form action="" onChange={this.protectionOptionChange}>
            {this.renderTAP(this.props.deviceProtectionList.data)}
            {
              this.props.deviceProtectionList.data.equipmentProtectionList.map((item, index) => (
                <div key={index} className="pad18 noSidePad border_grey onlyBottomBorder verticalAlignMiddle floatLeft clearfix width100">

                  <RadioButton
                    defaultChecked={item.sfoSkuId === defaultSelected}
                    id={item.sfoSkuId}
                    name="dppOption"
                    value={item.sfoSkuId}
                    ariaLabel={`Choose ${item.displayName}`}
                  >
                    {(item.preSelected) ?
                      <div className="fontSize_2 displayBlock">{this.props.CQLabel.get('OD_CART_CURRENT_PROTECTION')}</div> : ''}
                    <div className="boldText displayBlock">${item.price}{item.priceTerm} {item.displayName}</div>
                    <div className="color_666" dangerouslySetInnerHTML={{ __html: item.introText }} />
                  </RadioButton>
                </div>))
            }
          </form>
        </div>
        <div className="pad24 noBottomPad">
          <div className="margin36 onlyBottomMargin fontSize_2 textAlignCenter clearfix"><span>{this.props.CQLabel.get('OD_CART_PROTECTION_CANADD_INFO')}</span>
          </div>
          <Button type="button" className="button centerBlock" disabled={this.state.buttonDisabled} onClick={this.onSaveProtection}>{this.props.CQLabel.get('OD_CART_SAVE_CTA')}</Button>
          <div className="margin36 noSideMargin fontSize_2 textAlignCenter">
            <span>{this.props.CQLabel.get('OD_CART_MOREINFO_PROTECTION')} ,
            <Link
              role="link"
              to="deviceProtection"
              className="link"
            >{this.props.CQLabel.get('OD_CART_DPP_DETAIL_TITLE')}
            </Link>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
DeviceProtection.propTypes = {
  defaultSelected: PropTypes.object,
  CQLabel: PropTypes.object,
  deviceProtectionList: PropTypes.object,
  onSave: PropTypes.func,
};
/**
 * TODO:Take state from reducer instead of ES6 default props
 * */
const mapStateToProps = (state) => ({
  deviceProtectionList: state.get('deviceProtectionList'),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeviceProtection);
