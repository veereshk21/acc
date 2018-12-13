import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import Loader from '../../common/Loader/Loader';

class modContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // showModal: false,
    };
  }
  render() {
    const { isFetching, title, description, deviceImgURL, deviceBrand, deviceName, dueTodayPrice, dueMonthlyPrice, cqContent, isModEligible } = this.props;
    return (
      <section>
        {(isFetching === true) && <Loader />}
        {title && <Row className="margin10 noSideMargin">
          <Col xs={5}>
            <h2 className="pad10 noSidePad fontTitle" dangerouslySetInnerHTML={{ __html: title }} />
          </Col>
        </Row>}
        {description && <Row className="margin10 noSideMargin">
          <Col xs={6}>
            <p className="pad10 noSidePad fontSize_5 modSubDetails" dangerouslySetInnerHTML={{ __html: description }} />
          </Col>
        </Row>}
        {deviceImgURL && isModEligible && <Row className="margin10 noSideMargin">
          <Col xs={7}>
            <div className="pad20 noSidepad border_black onlyTopBorder">
              <img src={deviceImgURL} className="margin20 onlyLeftMargin" alt="MultiDeviceImg" width="250px" />
            </div>
          </Col>
        </Row>}
        {isModEligible && <Row>
          <Col xs={3} className="pad10 noSidePad">
            {deviceBrand && <p className="bold" dangerouslySetInnerHTML={{ __html: deviceBrand }} />}
            {deviceName && <p className="bold" dangerouslySetInnerHTML={{ __html: deviceName }} />}
            {dueTodayPrice && <p className="" >
              <span dangerouslySetInnerHTML={{ __html: dueTodayPrice }} />{cqContent.label.DT_OD_MOD_DUE_TODAY_TEXT}
            </p>}
            {dueMonthlyPrice && <p className="" dangerouslySetInnerHTML={{ __html: dueMonthlyPrice }} />}
          </Col>
        </Row>}
      </section>
    );
  }
}

export default modContent;

modContent.propTypes = {
  cqContent: PropTypes.object,
  isFetching: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  deviceImgURL: PropTypes.string,
  deviceBrand: PropTypes.string,
  deviceName: PropTypes.string,
  dueTodayPrice: PropTypes.string,
  dueMonthlyPrice: PropTypes.string,
  isModEligible: PropTypes.bool,
};
