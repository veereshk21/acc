import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import AsyncComponent from '../../../../common/AsyncComponent';

const MSelect = AsyncComponent(() => import('../../../../common/Select'));

class Protection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { item, className, style, handleDevicesCountChange, indexItem, selectedSkuId } = this.props;
    return (
      <Row>
        {item.additionalTapList && (
          <Col xs={12} sm={12} md={12} lg={12} xl={12} className={className} style={style}>
            {className === ''
              && (
                <p className="fontSize_5 bold margin5 noSideMargin">
                  Protect additional devices for $9/mo
                </p>
              )
            }
            <MSelect
              borderStyle
              name={item.sfoSkuId}
              id={item.sfoSkuId}
              className="pad5 noSidePad"
              disabled={item.sfoSkuId !== selectedSkuId}
              onChange={(e) => handleDevicesCountChange(e, indexItem)}
              analyticstrack="select-protection-device-count"
            >
              {item.additionalTapList.map((tap) => (
                <option value={tap.devices}>
                  {tap.devices + ' Devices, ' + tap.claims + ' Claims for - ' + (tap.price !== 'Included' ? '$' : '') + tap.price}
                </option>))
              }
            </MSelect>
          </Col>
        )}
      </Row>
    );
  }
}

Protection.propTypes = {
  // cqContent: PropTypes.object,
  item: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.string,
  selectedSkuId: PropTypes.string,
  indexItem: PropTypes.string,
  handleDevicesCountChange: PropTypes.func,
};
export default reduxForm({
  enableReinitialize: true,
})(connect((state) => ({ forms: state.get('form').toJS() }))(Protection));
