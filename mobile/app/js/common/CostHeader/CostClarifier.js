import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import request from 'axios';
import * as Constants from './Constants';
import CostDetailsModal from './CostDetailsModal';
import Modal from '../modal/modal';
// import '../../../css/modules/costClarifierCheckbox.css';

class CostClarifier extends Component {
  static propTypes = {
    updateCostClarifier: PropTypes.object,
    checkStatus: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
    this.state = {
      showModal: false,
      billStatus: props.checkStatus,
    };
  }

  closeModal = () => this.setState({ showModal: false });

  openModal = () => this.setState({ showModal: true });

  updateCheck() {
    const { updateCostClarifier } = this.props;

    const data = {
      showSBC: !this.state.billStatus ? 'Y' : 'N',
    };
    request.post(updateCostClarifier.updateStateUrl, data);
    this.setState({
      billStatus: !this.state.billStatus,
    });
  }

  render() {
    const { updateCostClarifier } = this.props;
    const { showModal, billStatus } = this.state;
    return (
      <div>
        <Modal
          mounted={showModal}
          closeFn={this.closeModal}
          style={{ width: '90vw', 'min-height': '95%' }}
        >
          <CostDetailsModal updateCostClarifier={updateCostClarifier} closeModal={this.closeModal} />
        </Modal>
        {updateCostClarifier
          && (
            <Row className="margin0" id="costClarifier">
              <Col xs={3} sm={3} md={3} className="noLeftPad">
                <p className="pad10 onlyTopPad">
                  {updateCostClarifier.purchasePathMessage}
                </p>
                {updateCostClarifier.flow !== Constants.COST_CLARIFIER_AAL
                  && (
                    <p className="bold fs11">
                      {updateCostClarifier.mtn}
                    </p>)
                }
              </Col>
              <Col xs={3} sm={3} md={3} className="">
                <p className="pad10 onlyTopPad">
                  {billStatus ? Constants.COST_CLARIFIER_CURRENT_BILL : Constants.COST_CLARIFIER_EST_TODAY}
                </p>
                <p className="pad4 onlyTopPad bold priceSmall">
                $
                  {billStatus ? updateCostClarifier.currentBillPrice : updateCostClarifier.dueTodayPrice}
                </p>
              </Col>
              <Col xs={3} sm={3} md={3} className="">
                <p className="pad10 onlyTopPad">
                  {billStatus ? Constants.COST_CLARIFIER_NEW_BILL : Constants.COST_CLARIFIER_EST_MONTHLY}
                </p>
                <p className="pad4 onlyTopPad bold priceSmall">
                $
                  {billStatus ? updateCostClarifier.newBillPrice : updateCostClarifier.dueMonthlyPrice}
                </p>
                {billStatus
                  && (
                    <div
                      className="pad6 noSidePad textDecUnderline"
                      onClick={this.openModal}
                      onKeyPress={this.openModal}
                    >
                      {Constants.COST_CLARIFIER_SEE_DETAILS}
                    </div>)
                }
              </Col>
              <Col xs={3} sm={3} md={3} className="textAlignRight noRightPad noLeftPad">
                <p className="pad10 onlyTopPad">
                  {Constants.COST_CLARIFIER_SEE_BILL_CHANGE}
                </p>
                <div className="pad4 onlyTopPad">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={billStatus}
                      onChange={this.updateCheck}
                    />
                    <div className="checkbox round" >
                      <span className="on">{Constants.COST_CLARIFIER_ON}</span>
                      <span className="off">{Constants.COST_CLARIFIER_OFF}</span>
                    </div>
                  </label>
                </div>
              </Col>
            </Row>
          )
        }
      </div>
    );
  }
}

/* const mapStateToProps = (state) => {
  console.log("logging costClarifier");
  console.log(state.toJS());
  const data = state.toJS();
  const { updateCostClarifierState } = data;
  return {
    updateCostClarifierState
  };
}; */

// const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default CostClarifier;
