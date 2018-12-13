import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';

class InfoGrid extends Component {
  render() {
    const { cqKeys } = this.props;
    return (
      <div className="infoGrid color_black margin36 onlyBottomMargin">
        <div className="infoGrid_title pad20">
          <h2 className="fontSize_8">{cqKeys.label.DT_OD_CONFIMARTION_GET_HEAD_START}</h2>
          <p className="fontSize_3" dangerouslySetInnerHTML={{ __html: cqKeys.label.DT_OD_CONFIMARTION_SAVE_DATA }} />
        </div>
        <Row className="infoGrid_content">
          <Col lg={6} md={6} className="infoGrid_content_leftPane border_CC">
            <section className="infoGrid_content_leftPane_wrapper pad18">
              <span className="block bold margin20 onlyBottomMargin fontSize_11">1</span>
              <p className="margin20 onlyBottomMargin fontSize_3" dangerouslySetInnerHTML={{ __html: cqKeys.label.DT_OD_CONFIMARTION_BACKUP_DATA }} />
              <a className="block textDecUnderline margin30 onlyBottomMargin fontSize_3" href=" /support/transfer-contacts-and-media/" target="_blank" dangerouslySetInnerHTML={{ __html: cqKeys.label.DT_OD_CONFIMARTION_EASY_FILE_TRANSFER }} />
            </section>
          </Col>
          <Col lg={6} md={6} className="infoGrid_content_rightPane border_CC" style={{ borderLeft: 'none' }}>
            <section className="infoGrid_content_rightPane_wrapper pad18">
              <span className="block bold margin20 onlyBottomMargin fontSize_11">2</span>
              <p className="margin20 onlyBottomMargin fontSize_3" dangerouslySetInnerHTML={{ __html: cqKeys.label.DT_OD_CONFIMARTION_ACTIVATE_NEW_DEVICE }} />
              <a className="block textDecUnderline margin20 onlyBottomMargin fontSize_3" href="/solutions-and-services/activate-my-device/" target="_blank">{cqKeys.label.DT_OD_CONFIMARTION_EASY_TO_ACTIVATE}</a>
            </section>
          </Col>
        </Row>
      </div>
    );
  }
}

InfoGrid.propTypes = {
  cqKeys: PropTypes.object,
};

export default InfoGrid;
