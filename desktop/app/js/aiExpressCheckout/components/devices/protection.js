import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import AsyncComponent from '../../../common/AsyncComponent';

const A = AsyncComponent(() => import('../../../common/A/A'));
const Loader = AsyncComponent(() => import('../../../common/Loader/Loader'));
const ProtectionItemSelection = AsyncComponent(() => import('./protection/protectionItemSelection'));

class Protection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChangeModal: false,
      showRemoveModal: false,
      selectedChangePlanList: props.protectionChangeList && props.protectionChangeList.mtnDeviceInfo.equipmentProtectionList && props.protectionChangeList.mtnDeviceInfo.equipmentProtectionList.filter((list) => list.preSelected)[0],
    };
    this.protectionChangeClick = this.protectionChangeClick.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  updateState(obj) {
    this.setState(obj);
  }
  protectionRemoveClick() {
    const {
      sfoSkuId,
    } = this.props.preSelectedProtection;
    const { mtn, commerceItemId, flow, protectionRemoveURL, deviceSkuId, sorId } = this.props;
    this.setState({ showRemoveModal: true });
    const obj = {
      format: 'JSON',
      deviceSkuId,
      commerceItemId,
      sfoskuId: sfoSkuId,
      mtn,
      upgradeDeviceMTN: mtn,
      upgradeDeviceSORId: sorId,
      editFlag: 'true',
      aiExpCart: 'true',
      flow,
    };
    this.props.protectionRemove(obj, protectionRemoveURL);
  }
  protectionChangeClick() {
    const { sfoSkuId } = this.props.preSelectedProtection;
    const { mtn, commerceItemId, flow, protectionChangeURL, deviceSkuId, sorId } = this.props;
    this.setState({ showChangeModal: true, showRemoveModal: false });
    const obj = {
      format: 'JSON',
      deviceSkuId,
      commerceItemId,
      sfoskuId: sfoSkuId,
      mtn,
      upgradeDeviceMTN: mtn,
      upgradeDeviceSORId: sorId,
      editFlag: 'true',
      aiExpCart: 'true',
      flow,
    };
    this.props.protectionChange(obj, protectionChangeURL);
  }
  render() {
    const { preSelectedProtection, protectionChangeURL, protectionRemoveURL } = this.props;
    return (
      <div id="protectionSection" className="pad24 noSidePad">
        {this.props.isFetching === true && <Loader />}
        <ProtectionItemSelection
          {...this.props}
          protectionChangeClick={this.protectionChangeClick}
          showChangeModal={this.state.showChangeModal}
          showRemoveModal={this.state.showRemoveModal}
          updateState={this.updateState}
        />
        <div className="accordionItem border_black onlyTopBorder pad6 onlyTopPad">
          <Row>
            <Col xs={9}>
              <h3 className="fontSize_5 displayInlineBlock">Device protection</h3>
              { preSelectedProtection.showProtectionDescription ?
                <A
                  role="link"
                  className="link pad10 onlySidePad"
                  analyticstrack="protectionChange-link"
                  href={'#'}
                  onClick={this.protectionChangeClick.bind(this)}
                >
                  Shop protection plans
                </A> : '' }
            </Col>
            <Col xs={2}>
              <p className="fontSize_5 bold">
                <span>{`$${preSelectedProtection.price}${preSelectedProtection.priceTerm || ''}`}</span>
              </p>
            </Col>
            <Col xs={1} aria-hidden className="fontSize_6 lineHeight18 overflowHidden accordion_icon textAlignRight" />
          </Row>

          <hr style={{ borderTop: '2px solid #E4E4E4', marginTop: '20px' }} />


          <div className="">
            {preSelectedProtection.showProtectionDescription ?
              <p className="protectionIntroText pad20 noSidePad" dangerouslySetInnerHTML={{ __html: preSelectedProtection.introText }} /> :
              <p>
                <span>{preSelectedProtection.name}</span>
                <A
                  role="link"
                  className={`link pad10 onlySidePad ${!protectionChangeURL && 'disableField'}`}
                  analyticstrack="protectionChange-link"
                  href={'#'}
                  onClick={this.protectionChangeClick.bind(this)}
                >
                  Change
                </A>
                <A
                  role="link"
                  className={`link pad10 onlySidePad ${!protectionRemoveURL && 'disableField'}`}
                  analyticstrack="protectionRemove-link"
                  href={'#'}
                  onClick={this.protectionRemoveClick.bind(this)}
                >
                  Remove
                </A>
              </p>}
          </div>

        </div>
      </div>
    );
  }
}

Protection.propTypes = {
  // cqContent: PropTypes.object,
  preSelectedProtection: PropTypes.object,
  protectionChangeURL: PropTypes.string,
  protectionRemoveURL: PropTypes.string,
  protectionChange: PropTypes.func,
  sorId: PropTypes.string,
  deviceSkuId: PropTypes.string,
  mtn: PropTypes.string,
  isFetching: PropTypes.bool,
  commerceItemId: PropTypes.string,
  protectionRemove: PropTypes.func,
  flow: PropTypes.string,
  protectionChangeList: PropTypes.object,
};
export default reduxForm({
  enableReinitialize: true,
})(connect((state) => ({ forms: state.get('form').toJS() }))(Protection));
