import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form/immutable';
import AsyncComponent from '../../../common/AsyncComponent';
import { EDIT_STATE } from '../../constants';
// import { normalizePhoneNumber } from '../../../common/validation';
// import MSelect from '../../../common/Select/index';
import EditButton from '../../../common/EditButton/index';

const StoreDetails = AsyncComponent(() => import('./storeDetails'));
const Modal = AsyncComponent(() => import('../../../common/Modal'));
const InStorePickUp = AsyncComponent(() => import('../../containers/ispu'));
const ISPUModalCC = AsyncComponent(() => import('../../containers/ispu/ISPUModalCC'));

class ISPUDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ispuModalVisible: false,
    };
  }
  updateISPU = (data) => {
    const { ispudetailsInfo } = this.props;

    const param = {
      email: data.get('email'),
      phoneNumber: data.get('phoneNumber'),
      activeSMSCapableMtnList: data.get('phoneNumber'),
      shippingAddressType: 'pickUpStore',
      orderId: this.props.orderId,
      storeId: ispudetailsInfo.storeId,
      standaloneAccessories: this.props.standaloneAccessories,
      longitude: ispudetailsInfo.longtitude.toString(),
      latitude: ispudetailsInfo.latitdude.toString(),
      shipOptionChangeOnly: true,
    };
    this.props.submitISPU(param);
  };

  showIspuModal = () => {
    this.setState({ ispuModalVisible: true });
    this.props.asyncFetch();
  }
  closeIspuModal = () => {
    this.setState({ ispuModalVisible: false });
  }
  ispuSuccessful = () => {
    this.setState({ ispuModalVisible: false });
  }

  render() {
    const { cqContent, contactInfo, useISPUCC } = this.props;
    return (
      <div>
        {!useISPUCC && this.state.ispuModalVisible &&
          <Modal
            mounted
            closeFn={this.closeIspuModal}
            showCloseX
            underlayColor="rgba(0,0,0,0.8)"
          >
            <InStorePickUp
              closeModal={this.ispuSuccessful}
            />
          </Modal>
        }
        {useISPUCC && this.state.ispuModalVisible &&
          <ISPUModalCC
            ispuSuccessful={this.ispuSuccessful}
            toggleModal={this.closeIspuModal}
            ispuModalVisible={this.state.ispuModalVisible}
          />
        }
        <Row>
          <Col
            xs={6}
            style={{ wordWrap: 'break-word' }}
          >
            <StoreDetails
              cqContent={cqContent}
              edit={this.props.editState[EDIT_STATE.SHIPPING]}
              updateEditState={this.props.updateEditState}
              ispudetailsInfo={this.props.ispudetailsInfo}
              showIspuModal={this.showIspuModal}
            />
          </Col>
          <Col xs={6}>
            <div style={{ wordWrap: 'break-word' }}>
              {contactInfo.phoneNumber &&
                <div>
                  <h3 className="fontSize_5 displayInlineBlock verticalBottom">Contact Information</h3>
                  <EditButton
                    analyticstrack="shipping-ispu-edit-CTA"
                    onClick={() => this.props.updateEditState(EDIT_STATE.SHIPPING, true)}
                  >
                    Edit
                  </EditButton>
                  <p className="margin12 noSideMargin">Phone number (for order updates): {contactInfo.phoneNumber}</p>
                </div>}
              {contactInfo.emailAddress && <p className="">Email: {contactInfo.emailAddress}</p>}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}


ISPUDetails.propTypes = {
  cqContent: PropTypes.object,
  updateEditState: PropTypes.func,
  ispudetailsInfo: PropTypes.object,
  editState: PropTypes.object,
  contactInfo: PropTypes.object,
  // activeSMSCapableMtnList: PropTypes.array,
  orderId: PropTypes.string,
  standaloneAccessories: PropTypes.bool,
  submitISPU: PropTypes.func,
  asyncFetch: PropTypes.func,
  useISPUCC: PropTypes.bool,
};

export default reduxForm({
  form: 'ispuContactInfo',
  enableReinitialize: true,
  destroyOnUnmount: false,
})(ISPUDetails);

