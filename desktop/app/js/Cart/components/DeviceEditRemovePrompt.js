import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
  Grid,
} from 'react-flexbox-grid';
import Anchor from './../../common/A/A';
import Modal from '../../common/Modal';

class DeviceEditRemovePrompt extends Component {
  constructor(props) {
    super(props);
    this.toggleRemovePromptHandler = this.toggleRemovePromptHandler.bind(this);
    this.state = { isPrompted: false, modRemoveModal: false };
  }

  componentWillReceiveProps() {
    this.setState({ isPrompted: false, modRemoveModal: false });
  }

  toggleRemovePromptHandler(e) {
    e.preventDefault();
    const { isPrompted, modRemoveModal } = this.state;
    if (this.props.modDevice || (this.props.isModConnected && this.props.isSingleModConnectedDevice)) {
      this.setState({ isPrompted: false, modRemoveModal: !modRemoveModal });
    } else {
      this.setState({ isPrompted: !isPrompted, modRemoveModal: false });
    }
  }
  renderModal() {
    const { cqContent, onRemove, isModConnected } = this.props;
    return (
      <Modal
        mounted={this.state.modRemoveModal}
        style={{ background: 'white', width: '400px', minHeight: '50%' }}
        closeFn={this.toggleRemovePromptHandler}
        showCloseX
        underlayColor="rgba(0,0,0,0.8)"
      >
        <Grid>
          <Row className="margin20 noSideMargin">
            <Col xs={12} className="minHeight200">
              <p className="fontSize_7 bold width90">{isModConnected ? cqContent.label.DT_OD_MOD_CONNECT_MODAL_TITLE : cqContent.label.DT_OD_MOD_MODAL_TITLE}</p>
            </Col>
            <Col xs={12} className="minHeight200 border_black onlyTopBorder">
              <p className="fontSize_4 margin10 noSideMargin width90">{isModConnected ? cqContent.label.DT_OD_MOD_CONNECT_MODAL_DESCRIPTION : cqContent.label.DT_OD_MOD_MODAL_DESCRIPTION}</p>
            </Col>
          </Row>
          <Row className="margin20 noSideMargin">
            <Col xs={6} className="textAlignLeft">
              <button
                className="button width100 primary margin10 onlyRightMargin"
                onClick={onRemove}
                analyticstrack="mod-remove-item-confirm-cta"
              >
                <span>{cqContent.label.DT_OD_MOD_MODAL_YES_CTA}</span>
              </button>
            </Col>
            <Col xs={6} className="textAlignRight">
              <button
                className="button width100 secondary margin10 onlyLeftMargin"
                onClick={this.toggleRemovePromptHandler}
                analyticstrack="mod-remove-item-cancel-cta"
              >
                <span>{cqContent.label.DT_OD_MOD_MODAL_NO_CTA}</span>
              </button>
            </Col>
          </Row>
        </Grid>
      </Modal>
    );
  }
  render() {
    const {
      showEdit, promptMsg, onRemove, cqContent, deviceInfo, showRemove, modDevice,
    } = this.props;
    return (
      <div>
        { this.renderModal() }
        {!this.state.isPrompted ?
          <div className="displayInlineBlock">
            {showEdit === true && !modDevice &&
              <div className="displayInlineBlock">
                <Anchor
                  tabIndex="0"
                  className="color_333 fontSize_4 textDecUnderline"
                  onClick={() => { this.props.asyncFetch(); window.location.href = deviceInfo.editDeviceUrl; }}
                  analyticstrack="edit-item-link"
                >
                  {cqContent.label.DT_OD_CART_EDIT_TEXT}
                </Anchor>
                {showRemove && <span className="margin6 onlySideMargin">|</span>}
              </div>
            }
            {showRemove && <Anchor
              tabIndex="0"
              className="color_333 fontSize_4 textDecUnderline"
              onClick={this.toggleRemovePromptHandler}
              href="#"
              analyticstrack="remove-item-link"
            >
              {cqContent.label.DT_OD_CART_REMOVE_TEXT}
            </Anchor>}
          </div>
          :
          <div>
            <Row>
              <Col xs={7}>
                <p
                  className="fontSize_5 bold"
                  dangerouslySetInnerHTML={{ __html: promptMsg }}
                />
              </Col>
            </Row>
            <div className="margin6 onlyTopMargin">
              <Row>
                <Col md={12}>
                  <Row className="pad18 onlyBottomPad">
                    <Col xs={4}>
                      <button
                        className="button width100 primary"
                        onClick={onRemove}
                        analyticstrack="remove-item-confirm-cta"
                      >
                        {cqContent.label.DT_OD_CART_REMOVE_DEVICE_CTA_TEXT}
                      </button>
                    </Col>
                    <Col xs={4}>
                      <button
                        className="button width100 secondary"
                        onClick={this.toggleRemovePromptHandler}
                        analyticstrack="remove-item-cancel-cta"
                      >
                        {cqContent.label.DT_OD_CART_CANCEL_CTA_TEXT}
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        }
      </div>
    );
  }
}

DeviceEditRemovePrompt.defaultProps = {
  showRemove: true,
};

DeviceEditRemovePrompt.propTypes = {
  showEdit: PropTypes.bool,
  promptMsg: PropTypes.string,
  deviceInfo: PropTypes.object,
  onRemove: PropTypes.func,
  showRemove: PropTypes.bool,
  cqContent: PropTypes.object,
  asyncFetch: PropTypes.func,
  modDevice: PropTypes.bool,
  isModConnected: PropTypes.bool,
  isSingleModConnectedDevice: PropTypes.bool,
};
export default DeviceEditRemovePrompt;
