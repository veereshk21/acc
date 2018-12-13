import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import IMG from '../../common/Img/Img';
import Button from '../../common/Button/Button';
import Loader from '../../common/Loader/Loader';
import HorizontalRule from '../../common/HorizontalRule';

export default class MDNDetails extends React.Component {
  constructor(props) {
    super(props);
    this.selectDevice = this.selectDevice.bind(this);

    this.state = {
      isFetching: false,
    };
  }

  selectDevice() {
    // Set this mdn as the selected one
    this.setState({
      isFetching: true,
    });
    this.props.submitAgreement(this.props.mdnJSON.redirectUrl, this.props.mdnDetails);
  }


  render() {
    const { mdnDetails, cqJSON } = this.props;
    const suffix = !mdnDetails.itemAlreadyInCart ? "'s" : '';
    return (
      <Row className="noSidePad">
        {this.state.isFetching && <Loader />}
        <Col xs={7}>
          <h4 className=" ">
            <span dangerouslySetInnerHTML={{ __html: `${mdnDetails.nickname}${suffix}` }} />
            <span>{mdnDetails.brand}</span>
          </h4>
          {mdnDetails.itemAlreadyInCart &&
            <p className="fontSize_1_3 margin6 onlyBottomMargin">{cqJSON.label.OD_NS_SAVED_IN_CART_LBL}</p>
          }
          {mdnDetails.totalNumberShare > 0 &&
            <p className="fontSize_1_3 margin6 onlyBottomMargin" >{mdnDetails.totalNumberShare} {cqJSON.label.OD_NS_NUMBER_SHARE_EXTENSION_LBL}</p>
          }
          {mdnDetails.displayMtn &&
            <p className="fontSize_1_3 margin6 onlyBottomMargin">{mdnDetails.displayMtn}</p>
          }
          <div>
            {(mdnDetails.isSelectEnabled) ?
              (
                <Button
                  type="button"
                  className="button secondary tertiary"
                  style={{ minWidth: '65px' }}
                  onClick={this.selectDevice}
                  analyticstrack="select-numbershare-device"
                >{cqJSON.label.OD_NS_SELECT_DEVICE}
                </Button>)
              :
              (
                <p>{(mdnDetails.totalNumberShare === 5) ? cqJSON.label.OD_NS_NUMBER_SHARE_EXTENSION_LBL_EXCEEDED : cqJSON.label.OD_NS_ENABLE_VOLTE}</p>)
            }
          </div>
        </Col>
        <Col xs={5} className="textAlignRight">
          <IMG src={`${mdnDetails.imageUrl}&wid=65&hei=135`} srcSet={`${mdnDetails.imageUrl}&wid=130&hei=270 2x`} alt={mdnDetails.deviceName} className="mdnDeviceImg" />
        </Col>
        <Col xs={12}>
          <HorizontalRule y={1} margin="32px 0" />
        </Col>
      </Row>
    );
  }
}

MDNDetails.propTypes = {
  cqJSON: PropTypes.object,
  mdnDetails: PropTypes.object,
  submitAgreement: PropTypes.func,
  mdnJSON: PropTypes.object,
};
